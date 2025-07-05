import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { scraper } from "./services/scraper";
import { analyzer } from "./services/analysis";
import { dataSourceManager } from "./services/data-source-manager";
import { searchPropertySchema, type AnalysisResult, type PropertyWithAnalysis } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Search and analyze property
  app.post("/api/property/search", async (req, res) => {
    try {
      const { query } = searchPropertySchema.parse(req.body);
      
      // First, try to find existing properties
      const existingProperties = await storage.searchProperties(query);
      if (existingProperties.length > 0) {
        const property = existingProperties[0];
        const analysis = await storage.getPropertyAnalysis(property.id);
        
        if (analysis) {
          // Get similar properties for comparison
          const similarProperties = await storage.getPropertiesWithAnalysisByArea(
            property.neighbourhood || '',
            property.bedrooms,
            property.propertyType
          );
          
          const result: AnalysisResult = {
            property,
            analysis,
            similarProperties: similarProperties.filter(p => p.id !== property.id)
          };
          
          return res.json(result);
        }
      }
      
      // Get property data from available sources
      const scrapedProperty = await dataSourceManager.searchProperty(query);
      if (!scrapedProperty) {
        return res.status(404).json({ 
          message: "Property not found. Please check the address or postcode and try again." 
        });
      }
      
      // Save the property
      const property = await storage.createProperty({
        address: scrapedProperty.address,
        bedrooms: scrapedProperty.bedrooms,
        bathrooms: scrapedProperty.bathrooms,
        sqm: scrapedProperty.sqm,
        propertyType: scrapedProperty.propertyType,
        monthlyRent: scrapedProperty.monthlyRent,
        postcode: scrapedProperty.postcode,
        neighbourhood: scrapedProperty.neighbourhood,
        listingUrl: scrapedProperty.listingUrl,
        source: scrapedProperty.source,
      });
      
      // Get market data for analysis
      const marketPrices = await dataSourceManager.getMarketData(
        property.neighbourhood || '',
        property.bedrooms,
        property.propertyType
      );
      
      // Analyze the property
      const analysisData = await analyzer.analyzeProperty(property, marketPrices);
      const analysis = await storage.createPropertyAnalysis(analysisData);
      
      // Generate some similar properties for comparison
      const similarProperties = await generateSimilarProperties(property);
      
      const result: AnalysisResult = {
        property,
        analysis,
        similarProperties
      };
      
      res.json(result);
      
    } catch (error) {
      console.error('Property search error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid search query. Please enter a valid address or postcode." 
        });
      }
      res.status(500).json({ 
        message: "An error occurred while searching for the property. Please try again." 
      });
    }
  });

  // Get property details by ID
  app.get("/api/property/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const propertyWithAnalysis = await storage.getPropertyWithAnalysis(id);
      
      if (!propertyWithAnalysis) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(propertyWithAnalysis);
    } catch (error) {
      console.error('Get property error:', error);
      res.status(500).json({ message: "Error retrieving property details" });
    }
  });

  // Filter similar properties
  app.get("/api/property/:id/similar", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { belowMarket, belowRegulation, belowOwnership } = req.query;
      
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      let similarProperties = await storage.getPropertiesWithAnalysisByArea(
        property.neighbourhood || '',
        property.bedrooms,
        property.propertyType
      );
      
      // Apply filters
      if (belowMarket === 'true') {
        similarProperties = similarProperties.filter(p => p.analysis.belowMarketAverage);
      }
      if (belowRegulation === 'true') {
        similarProperties = similarProperties.filter(p => p.analysis.belowRegulationLimit);
      }
      if (belowOwnership === 'true') {
        similarProperties = similarProperties.filter(p => p.analysis.belowOwnershipCost);
      }
      
      // Exclude the original property
      similarProperties = similarProperties.filter(p => p.id !== id);
      
      res.json(similarProperties);
    } catch (error) {
      console.error('Get similar properties error:', error);
      res.status(500).json({ message: "Error retrieving similar properties" });
    }
  });

  // Get all properties sorted by fairness rating
  app.get("/api/properties", async (req, res) => {
    try {
      const { neighbourhood, limit = "20" } = req.query;
      
      let properties = await storage.getAllPropertiesWithAnalysis();
      
      // Filter by neighbourhood if specified
      if (neighbourhood && typeof neighbourhood === 'string') {
        properties = properties.filter((p: PropertyWithAnalysis) => 
          p.neighbourhood?.toLowerCase().includes(neighbourhood.toLowerCase()) ||
          p.address.toLowerCase().includes(neighbourhood.toLowerCase())
        );
      }
      
      // Sort by fairness: gold first, then silver, then bronze, then by score
      const ratingOrder = { 'gold': 4, 'silver': 3, 'bronze': 2, 'none': 1 };
      properties.sort((a: PropertyWithAnalysis, b: PropertyWithAnalysis) => {
        const ratingDiff = (ratingOrder[b.analysis.rating as keyof typeof ratingOrder] || 0) - 
                          (ratingOrder[a.analysis.rating as keyof typeof ratingOrder] || 0);
        if (ratingDiff !== 0) return ratingDiff;
        return b.analysis.score - a.analysis.score;
      });
      
      // Limit results
      const limitNum = parseInt(limit as string);
      properties = properties.slice(0, limitNum);
      
      res.json(properties);
    } catch (error) {
      console.error('Get properties error:', error);
      res.status(500).json({ message: "Error retrieving properties" });
    }
  });

  // Get data source status
  app.get("/api/data-sources", (req, res) => {
    try {
      const status = dataSourceManager.getDataSourceStatus();
      const activeSources = dataSourceManager.getActiveDataSources();
      
      res.json({
        status,
        activeSources,
        currentlyUsing: activeSources[0] // First available source
      });
    } catch (error) {
      console.error('Get data sources error:', error);
      res.status(500).json({ message: "Error retrieving data source information" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to generate similar properties for demo
async function generateSimilarProperties(baseProperty: any): Promise<any[]> {
  const variations = [
    {
      addressSuffix: "15 Westferry Circus, E14",
      rentVariation: -100,
      sqmVariation: -7,
      bathroomVariation: 0
    },
    {
      addressSuffix: "Landmark Pinnacle, E14", 
      rentVariation: 650,
      sqmVariation: 7,
      bathroomVariation: -1
    },
    {
      addressSuffix: "One Park Drive, E14",
      rentVariation: -250,
      sqmVariation: 4,
      bathroomVariation: 0
    }
  ];

  const similarProperties = [];

  for (const variation of variations) {
    const property = await storage.createProperty({
      address: variation.addressSuffix,
      bedrooms: baseProperty.bedrooms,
      bathrooms: baseProperty.bathrooms + variation.bathroomVariation,
      sqm: (baseProperty.sqm || 80) + variation.sqmVariation,
      propertyType: baseProperty.propertyType,
      monthlyRent: baseProperty.monthlyRent + variation.rentVariation,
      postcode: baseProperty.postcode,
      neighbourhood: baseProperty.neighbourhood,
      listingUrl: `https://rightmove.co.uk/mock-${Date.now()}`,
      source: "rightmove"
    });

    const marketPrices = await scraper.getMarketData(
      property.neighbourhood || '',
      property.bedrooms,
      property.propertyType
    );

    const analysisData = await analyzer.analyzeProperty(property, marketPrices);
    const analysis = await storage.createPropertyAnalysis(analysisData);

    similarProperties.push({ ...property, analysis });
  }

  return similarProperties;
}
