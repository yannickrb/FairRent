# FairRent - Property Rental Price Checker

## Overview

FairRent is a full-stack web application that helps users analyze rental property prices by comparing them against market averages, regulation limits, and ownership costs. The application provides a comprehensive analysis system that rates properties with bronze, silver, or gold rankings based on how they perform against key affordability criteria.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **UI Framework**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful endpoints with JSON responses
- **Error Handling**: Centralized middleware for error processing

### Data Storage Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Shared TypeScript schema definitions with Zod validation
- **Migration Strategy**: Drizzle Kit for schema migrations
- **Storage Pattern**: Repository pattern with in-memory fallback for development

## Key Components

### Database Schema
**Properties Table**:
- Core property information (address, bedrooms, bathrooms, rent, etc.)
- Location data (postcode, neighbourhood)
- Source tracking (Rightmove, Zoopla)
- Metadata (listing URL, creation timestamp)

**Property Analysis Table**:
- Market comparison metrics (market average, regulation limits)
- Financial calculations (mortgage payments, savings)
- Rating system (bronze/silver/gold with numerical scores)
- Criteria tracking (below market, regulation, ownership costs)

### Service Layer
**Property Scraper Service**:
- Mock implementation for property data extraction
- Simulates real estate website scraping (Rightmove, Zoopla)
- Location-based property generation with realistic data patterns

**Property Analyzer Service**:
- Market analysis algorithms
- Regulation compliance checking
- Mortgage calculation estimates
- Multi-criteria rating system

### UI Components
**Search Interface**: 
- Address/postcode input with real-time validation
- Loading states and error handling
- Responsive design for mobile and desktop

**Results Display**:
- Property comparison cards with rating badges
- Financial breakdown with savings calculations
- Similar properties comparison table
- Interactive filtering and sorting

## Data Flow

1. **Property Search**: User enters address/postcode → Frontend validates input → API call to `/api/property/search`
2. **Data Retrieval**: Server checks existing properties → Falls back to scraper service if not found
3. **Analysis Pipeline**: Raw property data → Market analysis → Criteria evaluation → Rating calculation
4. **Storage**: Property and analysis data saved to database with relationships
5. **Response**: Comprehensive analysis result with similar properties returned to frontend
6. **Display**: React components render analysis with interactive elements and comparison data

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **zod**: Runtime type validation and schema definition

### UI Dependencies
- **@radix-ui/***: Headless UI primitives for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Modern icon library
- **class-variance-authority**: Type-safe CSS class variants

### Development Dependencies
- **vite**: Fast build tool with HMR support
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles Node.js server to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Local development with Vite dev server proxy
- **Production**: Express serves static files and API routes
- **Database**: Environment variable `DATABASE_URL` for connection string

### Replit Integration
- Custom Vite plugins for Replit-specific features
- Runtime error modal overlay for development
- Cartographer plugin for code navigation
- Development banner script for external access

## Recent Changes
- July 5, 2025: **REMOVED** - Completely removed UK Government regional data system
  - User requested complete removal of UK Government data source
  - Cleaned up all code references and unused imports
  - Removed uk-rental-data.ts service file
  - Simplified data source manager to only handle PropertyData API and Mock Data
  - System now runs cleanly with individual property-based analysis only
- July 5, 2025: **REVERTED** - Disabled UK Government regional data system
  - User feedback: Regional data "too vague" for individual property analysis
  - Restored individual property-based system using mock data
  - Kept UK Government data option available but disabled
  - Maintained original address/postcode search functionality
- July 5, 2025: Implemented UK Government rental data system (later reverted)
  - Added HMRC Property Rental Income Statistics integration
  - Created postcode-to-region mapping for all UK areas
  - Updated search to focus on postcodes rather than addresses
- June 29, 2025: **CHECKPOINT** - Core FairRent implementation complete and approved
  - Property search with address/postcode input working
  - Three-tier fairness rating system (Bronze/Silver/Gold) implemented
  - Market price, regulation, and ownership cost analysis functional
  - Property listings sorted by fairness rating displaying correctly
  - Location-based filtering and professional UI completed
  - User feedback: "I love the overall implementation, it fits my vision and more"

## Changelog
- June 29, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.

## Project Status
- ✅ Core functionality implemented and approved by user
- ✅ Property search with address/postcode input
- ✅ Three-tier fairness rating system (Bronze/Silver/Gold)
- ✅ Market price, regulation, and ownership cost analysis
- ✅ Property listings sorted by fairness rating
- ✅ Location-based filtering and neighborhood display
- ✅ Professional UI with detailed property cards and savings calculations

User feedback: "I love the overall implementation, it fits my vision and more" - June 29, 2025