import { type Property, type InsertPropertyAnalysis } from "@shared/schema";

interface RegulationData {
  areaCode: string;
  maxRent: number;
  description: string;
}

export class PropertyAnalyzer {
  private regulationLimits: Record<string, RegulationData> = {
    'E14': { areaCode: 'E14', maxRent: 3800, description: 'Canary Wharf area limit' },
    'EC2A': { areaCode: 'EC2A', maxRent: 3200, description: 'Shoreditch area limit' },
    'SW11': { areaCode: 'SW11', maxRent: 4500, description: 'Clapham area limit' },
    'SW4': { areaCode: 'SW4', maxRent: 4200, description: 'Clapham area limit' },
    'E1': { areaCode: 'E1', maxRent: 2800, description: 'Whitechapel area limit' },
    'E2': { areaCode: 'E2', maxRent: 2900, description: 'Bethnal Green area limit' },
  };

  async analyzeProperty(property: Property, marketPrices: number[]): Promise<InsertPropertyAnalysis> {
    // Calculate market average
    const marketAverage = this.calculateMarketAverage(marketPrices);
    
    // Get regulation limit for the area
    const regulationLimit = this.getRegulationLimit(property.postcode || '');
    
    // Estimate mortgage payment (simplified calculation)
    const mortgagePayment = this.estimateMortgagePayment(property);
    
    // Determine which criteria are met
    const belowMarketAverage = property.monthlyRent < marketAverage;
    const belowRegulationLimit = property.monthlyRent < regulationLimit;
    const belowOwnershipCost = property.monthlyRent < mortgagePayment;
    
    // Count criteria met
    const meetsCriteriaCount = [belowMarketAverage, belowRegulationLimit, belowOwnershipCost]
      .filter(Boolean).length;
    
    // Calculate rating
    const rating = this.calculateRating(meetsCriteriaCount);
    
    // Calculate score (0-100)
    const score = this.calculateScore(property.monthlyRent, marketAverage, regulationLimit, mortgagePayment);
    
    // Calculate savings
    const marketSavings = belowMarketAverage ? marketAverage - property.monthlyRent : null;
    const regulationSavings = belowRegulationLimit ? regulationLimit - property.monthlyRent : null;
    const ownershipSavings = belowOwnershipCost ? mortgagePayment - property.monthlyRent : null;

    return {
      propertyId: property.id,
      marketAverage,
      regulationLimit,
      mortgagePayment,
      rating,
      score,
      meetsCriteriaCount,
      belowMarketAverage,
      belowRegulationLimit,
      belowOwnershipCost,
      marketSavings,
      regulationSavings,
      ownershipSavings,
    };
  }

  private calculateMarketAverage(prices: number[]): number {
    if (prices.length === 0) return 0;
    const sum = prices.reduce((acc, price) => acc + price, 0);
    return Math.round(sum / prices.length);
  }

  private getRegulationLimit(postcode: string): number {
    // Extract area code from postcode (e.g., "E14 5LQ" -> "E14")
    const areaCode = postcode.split(' ')[0];
    const regulation = this.regulationLimits[areaCode];
    
    if (regulation) {
      return regulation.maxRent;
    }
    
    // Default fallback for London
    return 3500;
  }

  private estimateMortgagePayment(property: Property): number {
    // Simplified mortgage calculation
    // Assume property value is 300x monthly rent (rough London multiplier)
    const estimatedValue = property.monthlyRent * 300;
    
    // Assume 80% LTV, 4.5% interest rate, 25-year term
    const loanAmount = estimatedValue * 0.8;
    const monthlyRate = 0.045 / 12;
    const numPayments = 25 * 12;
    
    // Standard mortgage payment formula
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return Math.round(monthlyPayment);
  }

  private calculateRating(criteriaCount: number): string {
    switch (criteriaCount) {
      case 3:
        return 'gold';
      case 2:
        return 'silver';
      case 1:
        return 'bronze';
      default:
        return 'none';
    }
  }

  private calculateScore(rent: number, marketAvg: number, regulationLimit: number, mortgagePayment: number): number {
    let score = 0;
    
    // Market comparison (40 points max)
    if (rent < marketAvg) {
      const savingsRatio = (marketAvg - rent) / marketAvg;
      score += Math.min(40, savingsRatio * 80);
    }
    
    // Regulation comparison (30 points max)
    if (rent < regulationLimit) {
      const savingsRatio = (regulationLimit - rent) / regulationLimit;
      score += Math.min(30, savingsRatio * 60);
    }
    
    // Ownership comparison (30 points max)
    if (rent < mortgagePayment) {
      const savingsRatio = (mortgagePayment - rent) / mortgagePayment;
      score += Math.min(30, savingsRatio * 60);
    }
    
    return Math.round(Math.min(100, score));
  }

  getRegulationDescription(postcode: string): string {
    const areaCode = postcode.split(' ')[0];
    const regulation = this.regulationLimits[areaCode];
    return regulation ? regulation.description : 'London area limit';
  }
}

export const analyzer = new PropertyAnalyzer();
