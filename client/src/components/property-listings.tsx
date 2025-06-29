import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, MapPin, Bed, Bath, Square, Check, X, ExternalLink } from "lucide-react";
import type { PropertyWithAnalysis } from "@shared/schema";

interface PropertyListingsProps {
  neighbourhood?: string;
  limit?: number;
}

export default function PropertyListings({ neighbourhood, limit = 20 }: PropertyListingsProps) {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['/api/properties', neighbourhood, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (neighbourhood) params.append('neighbourhood', neighbourhood);
      params.append('limit', limit.toString());
      
      const response = await fetch(`/api/properties?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      return response.json() as Promise<PropertyWithAnalysis[]>;
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'gold':
        return <Trophy className="text-yellow-500 h-5 w-5" />;
      case 'silver':
        return <Trophy className="text-gray-500 h-5 w-5" />;
      case 'bronze':
        return <Trophy className="text-amber-600 h-5 w-5" />;
      default:
        return <Trophy className="text-gray-300 h-5 w-5" />;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'gold':
        return 'bg-yellow-500 text-white';
      case 'silver':
        return 'bg-gray-500 text-white';
      case 'bronze':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <p className="text-red-600 text-center">
            Failed to load property listings. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">
            No properties found{neighbourhood ? ` in ${neighbourhood}` : ''}.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Fair Rental Properties
            {neighbourhood && (
              <span className="text-base font-normal text-gray-500 ml-2">
                in {neighbourhood}
              </span>
            )}
          </h3>
          <div className="text-sm text-gray-500">
            Sorted by fairness rating
          </div>
        </div>

        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg">
                      {property.address}
                    </h4>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.neighbourhood || 'London'}
                      {property.postcode && ` • ${property.postcode}`}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`px-2 py-1 text-xs font-medium capitalize ${getRatingColor(property.analysis.rating)}`}>
                      {getRatingIcon(property.analysis.rating)}
                      <span className="ml-1">{property.analysis.rating}</span>
                    </Badge>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-lg">
                        {formatCurrency(property.monthlyRent)}
                      </div>
                      <div className="text-xs text-gray-500">per month</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.bedrooms} bed
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms} bath
                    </div>
                    {property.sqm && (
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        {property.sqm} m²
                      </div>
                    )}
                    <div className="text-gray-500">
                      {property.propertyType}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Criteria indicators */}
                    <div className="flex space-x-1">
                      <div
                        className={`rounded-full p-1 ${
                          property.analysis.belowMarketAverage ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                        }`}
                        title={property.analysis.belowMarketAverage ? 'Below market average' : 'Above market average'}
                      >
                        {property.analysis.belowMarketAverage ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      </div>
                      <div
                        className={`rounded-full p-1 ${
                          property.analysis.belowRegulationLimit ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                        }`}
                        title={property.analysis.belowRegulationLimit ? 'Below regulation limit' : 'Above regulation limit'}
                      >
                        {property.analysis.belowRegulationLimit ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      </div>
                      <div
                        className={`rounded-full p-1 ${
                          property.analysis.belowOwnershipCost ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                        }`}
                        title={property.analysis.belowOwnershipCost ? 'Below ownership cost' : 'Above ownership cost'}
                      >
                        {property.analysis.belowOwnershipCost ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-700">
                        Score: {property.analysis.score}/100
                      </div>
                      {property.listingUrl && (
                        <a
                          href={property.listingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 flex items-center mt-1"
                        >
                          View listing
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Savings information */}
                {(property.analysis.marketSavings || property.analysis.regulationSavings || property.analysis.ownershipSavings) && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex flex-wrap gap-4 text-sm">
                      {property.analysis.marketSavings && (
                        <div className="text-green-600">
                          <span className="font-medium">Market savings:</span> {formatCurrency(property.analysis.marketSavings)}/month
                        </div>
                      )}
                      {property.analysis.regulationSavings && (
                        <div className="text-green-600">
                          <span className="font-medium">Under regulation by:</span> {formatCurrency(property.analysis.regulationSavings)}/month
                        </div>
                      )}
                      {property.analysis.ownershipSavings && (
                        <div className="text-green-600">
                          <span className="font-medium">Vs. buying:</span> {formatCurrency(property.analysis.ownershipSavings)}/month
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {properties.length === limit && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing top {limit} properties. More listings available.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}