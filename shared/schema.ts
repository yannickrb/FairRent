import { pgTable, text, serial, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  sqm: real("sqm"),
  propertyType: text("property_type").notNull(),
  monthlyRent: real("monthly_rent").notNull(),
  postcode: text("postcode"),
  neighbourhood: text("neighbourhood"),
  listingUrl: text("listing_url"),
  source: text("source").notNull(), // 'rightmove' or 'zoopla'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const propertyAnalysis = pgTable("property_analysis", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id).notNull(),
  marketAverage: real("market_average").notNull(),
  regulationLimit: real("regulation_limit").notNull(),
  mortgagePayment: real("mortgage_payment").notNull(),
  rating: text("rating").notNull(), // 'bronze', 'silver', 'gold'
  score: integer("score").notNull(),
  meetsCriteriaCount: integer("meets_criteria_count").notNull(),
  belowMarketAverage: boolean("below_market_average").notNull(),
  belowRegulationLimit: boolean("below_regulation_limit").notNull(),
  belowOwnershipCost: boolean("below_ownership_cost").notNull(),
  marketSavings: real("market_savings"),
  regulationSavings: real("regulation_savings"),
  ownershipSavings: real("ownership_savings"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});



export const userFeedback = pgTable("user_feedback", {
  id: serial("id").primaryKey(),
  response: text("response").notNull(), // 'yes', 'maybe', 'not-really'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export const insertPropertyAnalysisSchema = createInsertSchema(propertyAnalysis).omit({
  id: true,
  createdAt: true,
});

export const searchPropertySchema = z.object({
  query: z.string().min(1, "Please enter a property address or postcode"),
});

export const insertUserFeedbackSchema = createInsertSchema(userFeedback).omit({
  id: true,
  timestamp: true,
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type PropertyAnalysis = typeof propertyAnalysis.$inferSelect;
export type InsertPropertyAnalysis = z.infer<typeof insertPropertyAnalysisSchema>;
export type SearchProperty = z.infer<typeof searchPropertySchema>;
export type UserFeedback = typeof userFeedback.$inferSelect;
export type InsertUserFeedback = z.infer<typeof insertUserFeedbackSchema>;

export interface PropertyWithAnalysis extends Property {
  analysis: PropertyAnalysis;
}

export interface AnalysisResult {
  property: Property;
  analysis: PropertyAnalysis;
  similarProperties: PropertyWithAnalysis[];
}
