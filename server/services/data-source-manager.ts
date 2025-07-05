import { scraper as mockScraper } from "./scraper";
import { ukRentalDataService } from "./uk-rental-data";
import { type Property, type InsertProperty } from "@shared/schema";

interface DataSourceConfig {
  enabled: boolean;
  apiKey?: string;
  baseUrl?: string;
  rateLimit?: number;
}

interface DataSources {
  propertyData: DataSourceConfig;
  ukOpenData: DataSourceConfig;
  mock: DataSourceConfig;
}

interface PropertyDataResult {
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqm?: number;
  propertyType: string;
  monthlyRent: number;
  postcode?: string;
  neighbourhood?: string;
  listingUrl: string;
  source: string;
}

export class DataSourceManager {
  private config: DataSources;

  constructor() {
    this.config = {
      propertyData: {
        enabled: false,
        apiKey: process.env.PROPERTY_DATA_API_KEY,
        baseUrl: "https://api.propertydata.co.uk/rental-listings",
        rateLimit: 100 // requests per hour
      },
      ukOpenData: {
        enabled: true,
        baseUrl: "https://www.gov.uk/government/statistics/property-rental-income-statistics",
        rateLimit: 0 // Static data, no rate limits
      },
      mock: {
        enabled: true // Always available as fallback
      }
    };
  }

  async searchProperty(query: string): Promise<PropertyDataResult | null> {
    // Try PropertyData API first (if enabled and has API key)
    if (this.config.propertyData.enabled && this.config.propertyData.apiKey) {
      try {
        const result = await this.searchPropertyData(query);
        if (result) return result;
      } catch (error) {
        console.log('PropertyData API unavailable, trying next source...');
      }
    }

    // Try UK Open Data sources
    if (this.config.ukOpenData.enabled) {
      try {
        const result = await this.searchUKOpenDataRentals(query);
        if (result) return result;
      } catch (error) {
        console.log('Open data sources unavailable, using mock data...');
      }
    }

    // Fall back to mock data (always works)
    return await mockScraper.searchProperty(query);
  }

  async getMarketData(neighbourhood: string, bedrooms: number, propertyType: string): Promise<number[]> {
    // Try real data sources first
    if (this.config.propertyData.enabled && this.config.propertyData.apiKey) {
      try {
        const result = await this.getPropertyDataMarketRates(neighbourhood, bedrooms, propertyType);
        if (result.length > 0) return result;
      } catch (error) {
        console.log('PropertyData market data unavailable, using mock data...');
      }
    }

    // Try UK Government rental data
    if (this.config.ukOpenData.enabled) {
      try {
        const rentalData = ukRentalDataService.getRentalDataByRegion(neighbourhood);
        if (rentalData) {
          // Generate market data based on UK government averages with bedroom adjustment
          const baseRent = ukRentalDataService.getMarketRentEstimate('', bedrooms);
          const variation = baseRent * 0.15; // 15% variation
          return [
            Math.round(baseRent - variation),
            Math.round(baseRent - variation * 0.5),
            Math.round(baseRent),
            Math.round(baseRent + variation * 0.5),
            Math.round(baseRent + variation)
          ];
        }
      } catch (error) {
        console.log('UK Government data unavailable...');
      }
    }

    // Fall back to mock market data
    return await mockScraper.getMarketData(neighbourhood, bedrooms, propertyType);
  }

  private async searchPropertyData(query: string): Promise<PropertyDataResult | null> {
    // Implementation for PropertyData API integration
    // This would make actual API calls to PropertyData when API key is available
    const response = await fetch(`${this.config.propertyData.baseUrl}/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${this.config.propertyData.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`PropertyData API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.properties && data.properties.length > 0) {
      const property = data.properties[0];
      return {
        address: property.address,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        sqm: property.floorArea,
        propertyType: property.type,
        monthlyRent: property.rentPcm,
        postcode: property.postcode,
        neighbourhood: property.area,
        listingUrl: property.url,
        source: "propertydata"
      };
    }

    return null;
  }

  private async searchUKOpenDataRentals(query: string): Promise<PropertyDataResult | null> {
    // Extract postcode from query
    const postcodeMatch = query.match(/([A-Z]{1,2}\d{1,2}[\s]?\d[A-Z]{2})/i);
    const postcode = postcodeMatch ? postcodeMatch[1].toUpperCase() : '';
    
    if (!postcode || !ukRentalDataService.isPostcodeSupported(postcode)) {
      return null;
    }
    
    const region = ukRentalDataService.getRegionFromPostcode(postcode);
    const rentalData = ukRentalDataService.getRentalDataByPostcode(postcode);
    
    if (!rentalData) return null;
    
    // Generate property based on UK rental data
    const avgRent = rentalData.avgMonthlyRent;
    
    return {
      address: `Property in ${region}, ${postcode}`,
      bedrooms: 2, // Default
      bathrooms: 1,
      sqm: 70,
      propertyType: 'Flat',
      monthlyRent: Math.round(avgRent),
      postcode: postcode,
      neighbourhood: region,
      listingUrl: 'https://www.gov.uk/government/statistics/property-rental-income-statistics',
      source: 'UK Government Data'
    };
  }

  private async getPropertyDataMarketRates(neighbourhood: string, bedrooms: number, propertyType: string): Promise<number[]> {
    if (!this.config.propertyData.apiKey) return [];

    try {
      const response = await fetch(`${this.config.propertyData.baseUrl}/market-rates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.propertyData.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          area: neighbourhood,
          bedrooms,
          propertyType
        })
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data.prices || [];
    } catch (error) {
      return [];
    }
  }

  getActiveDataSources(): string[] {
    const sources = [];
    if (this.config.propertyData.enabled && this.config.propertyData.apiKey) {
      sources.push('PropertyData API');
    }
    if (this.config.ukOpenData.enabled) {
      sources.push('UK Government Data');
    }
    sources.push('Mock Data (Demo)');
    return sources;
  }

  getDataSourceStatus(): { source: string; status: string; description: string }[] {
    return [
      {
        source: 'PropertyData API',
        status: this.config.propertyData.enabled && this.config.propertyData.apiKey ? 'Available' : 'Requires API Key',
        description: 'Real-time data from Rightmove, Zoopla, OnTheMarket'
      },
      {
        source: 'UK Government Data',
        status: this.config.ukOpenData.enabled ? 'Active' : 'Disabled',
        description: 'HMRC Property Rental Income Statistics (official regional averages)'
      },
      {
        source: 'Mock Data',
        status: 'Active',
        description: 'Realistic demo data for development and testing'
      }
    ];
  }
}

export const dataSourceManager = new DataSourceManager();