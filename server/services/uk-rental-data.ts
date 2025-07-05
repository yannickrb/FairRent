// UK Government Property Rental Income Statistics (HMRC 2022-23)
// Source: https://www.gov.uk/government/statistics/property-rental-income-statistics

export interface RegionalRentalData {
  region: string;
  avgAnnualRent: number;
  avgMonthlyRent: number;
  landlordCount: number;
  totalIncomeB: number;
}

// Official UK Government regional rental data from HMRC Self Assessment returns
export const UK_REGIONAL_RENTAL_DATA: Record<string, RegionalRentalData> = {
  'London': {
    region: 'London',
    avgAnnualRent: 30092,
    avgMonthlyRent: 2507,
    landlordCount: 436000,
    totalIncomeB: 13.1
  },
  'South East': {
    region: 'South East',
    avgAnnualRent: 19671,
    avgMonthlyRent: 1639,
    landlordCount: 426000,
    totalIncomeB: 8.4
  },
  'South West': {
    region: 'South West',
    avgAnnualRent: 19617,
    avgMonthlyRent: 1635,
    landlordCount: 261000,
    totalIncomeB: 5.1
  },
  'East of England': {
    region: 'East of England',
    avgAnnualRent: 18588,
    avgMonthlyRent: 1549,
    landlordCount: 262000,
    totalIncomeB: 4.9
  },
  'West Midlands': {
    region: 'West Midlands',
    avgAnnualRent: 16629,
    avgMonthlyRent: 1386,
    landlordCount: 175000,
    totalIncomeB: 2.9
  },
  'East Midlands': {
    region: 'East Midlands',
    avgAnnualRent: 16194,
    avgMonthlyRent: 1349,
    landlordCount: 155000,
    totalIncomeB: 2.5
  },
  'North West': {
    region: 'North West',
    avgAnnualRent: 16911,
    avgMonthlyRent: 1409,
    landlordCount: 191000,
    totalIncomeB: 3.2
  },
  'Yorkshire and the Humber': {
    region: 'Yorkshire and the Humber',
    avgAnnualRent: 15500, // Estimated from national average
    avgMonthlyRent: 1292,
    landlordCount: 150000,
    totalIncomeB: 2.3
  },
  'North East': {
    region: 'North East',
    avgAnnualRent: 16071,
    avgMonthlyRent: 1339,
    landlordCount: 56000,
    totalIncomeB: 0.9
  },
  'Wales': {
    region: 'Wales',
    avgAnnualRent: 16222,
    avgMonthlyRent: 1352,
    landlordCount: 90000,
    totalIncomeB: 1.5
  },
  'Scotland': {
    region: 'Scotland',
    avgAnnualRent: 16765,
    avgMonthlyRent: 1397,
    landlordCount: 136000,
    totalIncomeB: 2.3
  },
  'Northern Ireland': {
    region: 'Northern Ireland',
    avgAnnualRent: 12931,
    avgMonthlyRent: 1078,
    landlordCount: 58000,
    totalIncomeB: 0.8
  }
};

// Postcode area to region mapping
export const POSTCODE_TO_REGION: Record<string, string> = {
  // London postcodes
  'E': 'London',
  'EC': 'London',
  'N': 'London',
  'NW': 'London',
  'SE': 'London',
  'SW': 'London',
  'W': 'London',
  'WC': 'London',
  'BR': 'London',
  'CR': 'London',
  'DA': 'London',
  'EN': 'London',
  'HA': 'London',
  'IG': 'London',
  'KT': 'London',
  'RM': 'London',
  'SM': 'London',
  'TW': 'London',
  'UB': 'London',
  'WD': 'London',

  // South East
  'AL': 'South East',
  'BN': 'South East',
  'GU': 'South East',
  'HP': 'South East',
  'LU': 'South East',
  'ME': 'South East',
  'MK': 'South East',
  'OX': 'South East',
  'PO': 'South East',
  'RG': 'South East',
  'RH': 'South East',
  'SL': 'South East',
  'SO': 'South East',
  'TN': 'South East',

  // South West
  'BA': 'South West',
  'BS': 'South West',
  'DT': 'South West',
  'EX': 'South West',
  'GL': 'South West',
  'PL': 'South West',
  'SN': 'South West',
  'SP': 'South West',
  'TA': 'South West',
  'TQ': 'South West',
  'TR': 'South West',

  // East of England
  'CB': 'East of England',
  'CM': 'East of England',
  'CO': 'East of England',
  'IP': 'East of England',
  'NR': 'East of England',
  'PE': 'East of England',
  'SG': 'East of England',
  'SS': 'East of England',

  // West Midlands
  'B': 'West Midlands',
  'CV': 'West Midlands',
  'DY': 'West Midlands',
  'HR': 'West Midlands',
  'ST': 'West Midlands',
  'SY': 'West Midlands',
  'TF': 'West Midlands',
  'WR': 'West Midlands',
  'WS': 'West Midlands',
  'WV': 'West Midlands',

  // East Midlands
  'DE': 'East Midlands',
  'LE': 'East Midlands',
  'LN': 'East Midlands',
  'NG': 'East Midlands',
  'NN': 'East Midlands',

  // North West
  'BB': 'North West',
  'BL': 'North West',
  'CA': 'North West',
  'CH': 'North West',
  'CW': 'North West',
  'FY': 'North West',
  'L': 'North West',
  'LA': 'North West',
  'M': 'North West',
  'OL': 'North West',
  'PR': 'North West',
  'SK': 'North West',
  'WA': 'North West',
  'WN': 'North West',

  // Yorkshire and the Humber
  'BD': 'Yorkshire and the Humber',
  'HG': 'Yorkshire and the Humber',
  'HD': 'Yorkshire and the Humber',
  'HU': 'Yorkshire and the Humber',
  'HX': 'Yorkshire and the Humber',
  'LS': 'Yorkshire and the Humber',
  'WF': 'Yorkshire and the Humber',
  'YO': 'Yorkshire and the Humber',

  // North East
  'DH': 'North East',
  'DL': 'North East',
  'NE': 'North East',
  'SR': 'North East',
  'TS': 'North East',

  // Wales
  'CF': 'Wales',
  'LD': 'Wales',
  'LL': 'Wales',
  'NP': 'Wales',
  'SA': 'Wales',

  // Scotland
  'AB': 'Scotland',
  'DD': 'Scotland',
  'DG': 'Scotland',
  'EH': 'Scotland',
  'FK': 'Scotland',
  'G': 'Scotland',
  'HS': 'Scotland',
  'IV': 'Scotland',
  'KA': 'Scotland',
  'KW': 'Scotland',
  'KY': 'Scotland',
  'ML': 'Scotland',
  'PA': 'Scotland',
  'PH': 'Scotland',
  'TD': 'Scotland',
  'ZE': 'Scotland',

  // Northern Ireland
  'BT': 'Northern Ireland'
};

export class UKRentalDataService {
  /**
   * Extract postcode area from full postcode
   * e.g. "SW1A 1AA" -> "SW", "M1 1AA" -> "M"
   */
  private extractPostcodeArea(postcode: string): string {
    const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
    const match = cleaned.match(/^([A-Z]{1,2})/);
    return match ? match[1] : '';
  }

  /**
   * Get region from postcode
   */
  getRegionFromPostcode(postcode: string): string {
    const postcodeArea = this.extractPostcodeArea(postcode);
    return POSTCODE_TO_REGION[postcodeArea] || 'Unknown';
  }

  /**
   * Get rental data for a specific region
   */
  getRentalDataByRegion(region: string): RegionalRentalData | null {
    return UK_REGIONAL_RENTAL_DATA[region] || null;
  }

  /**
   * Get rental data by postcode
   */
  getRentalDataByPostcode(postcode: string): RegionalRentalData | null {
    const region = this.getRegionFromPostcode(postcode);
    return this.getRentalDataByRegion(region);
  }

  /**
   * Get all available regions
   */
  getAllRegions(): string[] {
    return Object.keys(UK_REGIONAL_RENTAL_DATA);
  }

  /**
   * Get market rent estimate for a property based on postcode
   */
  getMarketRentEstimate(postcode: string, bedrooms: number = 1): number {
    const rentalData = this.getRentalDataByPostcode(postcode);
    if (!rentalData) return 0;

    // Base monthly rent from regional average
    let estimatedRent = rentalData.avgMonthlyRent;

    // Adjust for property size (bedrooms)
    const bedroomMultiplier = {
      0: 0.7, // Studio
      1: 1.0, // 1 bedroom (baseline)
      2: 1.4, // 2 bedrooms
      3: 1.8, // 3 bedrooms
      4: 2.2, // 4 bedrooms
      5: 2.6  // 5+ bedrooms
    };

    const multiplier = bedroomMultiplier[bedrooms as keyof typeof bedroomMultiplier] || 3.0;
    estimatedRent *= multiplier;

    return Math.round(estimatedRent);
  }

  /**
   * Validate if postcode is supported
   */
  isPostcodeSupported(postcode: string): boolean {
    return this.getRegionFromPostcode(postcode) !== 'Unknown';
  }
}

export const ukRentalDataService = new UKRentalDataService();