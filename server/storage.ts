import { properties, propertyAnalysis, type Property, type InsertProperty, type PropertyAnalysis, type InsertPropertyAnalysis, type PropertyWithAnalysis } from "@shared/schema";

export interface IStorage {
  // Property operations
  createProperty(property: InsertProperty): Promise<Property>;
  getProperty(id: number): Promise<Property | undefined>;
  getPropertiesByArea(neighbourhood: string, bedrooms: number, propertyType: string): Promise<Property[]>;
  searchProperties(query: string): Promise<Property[]>;
  
  // Analysis operations
  createPropertyAnalysis(analysis: InsertPropertyAnalysis): Promise<PropertyAnalysis>;
  getPropertyAnalysis(propertyId: number): Promise<PropertyAnalysis | undefined>;
  
  // Combined operations
  getPropertyWithAnalysis(id: number): Promise<PropertyWithAnalysis | undefined>;
  getPropertiesWithAnalysisByArea(neighbourhood: string, bedrooms: number, propertyType: string): Promise<PropertyWithAnalysis[]>;
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property>;
  private propertyAnalysis: Map<number, PropertyAnalysis>;
  private currentPropertyId: number;
  private currentAnalysisId: number;

  constructor() {
    this.properties = new Map();
    this.propertyAnalysis = new Map();
    this.currentPropertyId = 1;
    this.currentAnalysisId = 1;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { 
      ...insertProperty, 
      id,
      createdAt: new Date()
    };
    this.properties.set(id, property);
    return property;
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertiesByArea(neighbourhood: string, bedrooms: number, propertyType: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => 
        property.neighbourhood === neighbourhood &&
        property.bedrooms === bedrooms &&
        property.propertyType === propertyType
    );
  }

  async searchProperties(query: string): Promise<Property[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.properties.values()).filter(
      (property) =>
        property.address.toLowerCase().includes(searchTerm) ||
        property.postcode?.toLowerCase().includes(searchTerm) ||
        property.neighbourhood?.toLowerCase().includes(searchTerm)
    );
  }

  async createPropertyAnalysis(insertAnalysis: InsertPropertyAnalysis): Promise<PropertyAnalysis> {
    const id = this.currentAnalysisId++;
    const analysis: PropertyAnalysis = { 
      ...insertAnalysis, 
      id,
      createdAt: new Date()
    };
    this.propertyAnalysis.set(analysis.propertyId, analysis);
    return analysis;
  }

  async getPropertyAnalysis(propertyId: number): Promise<PropertyAnalysis | undefined> {
    return this.propertyAnalysis.get(propertyId);
  }

  async getPropertyWithAnalysis(id: number): Promise<PropertyWithAnalysis | undefined> {
    const property = await this.getProperty(id);
    if (!property) return undefined;
    
    const analysis = await this.getPropertyAnalysis(id);
    if (!analysis) return undefined;

    return { ...property, analysis };
  }

  async getPropertiesWithAnalysisByArea(neighbourhood: string, bedrooms: number, propertyType: string): Promise<PropertyWithAnalysis[]> {
    const properties = await this.getPropertiesByArea(neighbourhood, bedrooms, propertyType);
    const propertiesWithAnalysis: PropertyWithAnalysis[] = [];

    for (const property of properties) {
      const analysis = await this.getPropertyAnalysis(property.id);
      if (analysis) {
        propertiesWithAnalysis.push({ ...property, analysis });
      }
    }

    return propertiesWithAnalysis;
  }
}

export const storage = new MemStorage();
