import { scraper as mockScraper } from "./scraper";
import { type Property, type InsertProperty } from "@shared/schema";

interface DataSourceConfig {
  enabled: boolean;
  apiKey?: string;
  baseUrl?: string;
  rateLimit?: number;
}

interface DataSources {
  propertyData: DataSourceConfig;
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
        source: 'Mock Data',
        status: 'Active',
        description: 'Realistic demo data for development and testing'
      }
    ];
  }
}

export const dataSourceManager = new DataSourceManager();