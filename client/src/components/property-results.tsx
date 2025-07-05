import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, BarChart3, Gavel, Home, Check, X } from "lucide-react";
import type { AnalysisResult, PropertyWithAnalysis } from "@shared/schema";

interface PropertyResultsProps {
  results: AnalysisResult;
}

export default function PropertyResults({ results }: PropertyResultsProps) {
  const [filteredProperties, setFilteredProperties] = useState(results.similarProperties);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const { property, analysis, similarProperties } = results;

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
        return <Trophy className="text-yellow-500 h-6 w-6" />;
      case 'silver':
        return <Trophy className="text-gray-500 h-6 w-6" />;
      case 'bronze':
        return <Trophy className="text-amber-600 h-6 w-6" />;
      default:
        return <Trophy className="text-gray-300 h-6 w-6" />;
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

  const toggleFilter = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    
    setActiveFilters(newFilters);
    
    if (newFilters.length === 0) {
      setFilteredProperties(similarProperties);
    } else {
      const filtered = similarProperties.filter(prop => {
        return newFilters.every(filter => {
          switch (filter) {
            case 'belowMarket':
              return prop.analysis.belowMarketAverage;
            case 'belowRegulation':
              return prop.analysis.belowRegulationLimit;
            case 'belowOwnership':
              return prop.analysis.belowOwnershipCost;
            default:
              return true;
          }
        });
      });
      setFilteredProperties(filtered);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setFilteredProperties(similarProperties);
  };

  return (
    <div className="space-y-6">
      {/* Property Details Card */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {property.address}
              </h3>
              <p className="text-gray-600 mt-1">
                {property.bedrooms} bed • {property.bathrooms} bath • 
                {property.sqm && ` ${property.sqm} m² • `}
                {property.propertyType}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(property.monthlyRent)}
              </div>
              <div className="text-gray-500">per month</div>
            </div>
          </div>

          {/* Overall Rating */}
          <div className={`flex items-center justify-between p-4 rounded-lg border ${
            analysis.rating === 'gold' 
              ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/20'
              : analysis.rating === 'silver'
              ? 'bg-gradient-to-r from-gray-500/10 to-gray-500/5 border-gray-500/20' 
              : analysis.rating === 'bronze'
              ? 'bg-gradient-to-r from-amber-600/10 to-amber-600/5 border-amber-600/20'
              : 'bg-gradient-to-r from-gray-300/10 to-gray-300/5 border-gray-300/20'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`rounded-full p-3 ${getRatingColor(analysis.rating)}`}>
                {getRatingIcon(analysis.rating)}
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900 capitalize">
                  {analysis.rating} Rating
                </div>
                <div className="text-gray-600">
                  Meets {analysis.meetsCriteriaCount} of 3 fairness criteria
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Fairness Score</div>
              <div className={`text-2xl font-bold ${
                analysis.rating === 'gold' ? 'text-yellow-500' :
                analysis.rating === 'silver' ? 'text-gray-500' :
                analysis.rating === 'bronze' ? 'text-amber-600' : 'text-gray-400'
              }`}>
                {analysis.score}/100
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Market Average Comparison */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 text-secondary rounded-lg p-2">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Market Average</h4>
                  <p className="text-sm text-gray-500">Similar properties nearby</p>
                </div>
              </div>
              <div className={`rounded-full p-1 ${
                analysis.belowMarketAverage ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-500'
              }`}>
                {analysis.belowMarketAverage ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average rent</span>
                <span className="font-semibold">{formatCurrency(analysis.marketAverage)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Your rent</span>
                <span className={`font-semibold ${analysis.belowMarketAverage ? 'text-secondary' : 'text-gray-900'}`}>
                  {formatCurrency(property.monthlyRent)}
                </span>
              </div>
              {analysis.marketSavings && (
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary font-semibold">Savings</span>
                    <span className="text-secondary font-bold">
                      {formatCurrency(analysis.marketSavings)}/month
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Regulation Limits */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 text-secondary rounded-lg p-2">
                  <Gavel className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Regulation Limits</h4>
                  <p className="text-sm text-gray-500">London rental caps</p>
                </div>
              </div>
              <div className={`rounded-full p-1 ${
                analysis.belowRegulationLimit ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-500'
              }`}>
                {analysis.belowRegulationLimit ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Area limit</span>
                <span className="font-semibold">{formatCurrency(analysis.regulationLimit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Your rent</span>
                <span className={`font-semibold ${analysis.belowRegulationLimit ? 'text-secondary' : 'text-gray-900'}`}>
                  {formatCurrency(property.monthlyRent)}
                </span>
              </div>
              {analysis.regulationSavings && (
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary font-semibold">Under limit by</span>
                    <span className="text-secondary font-bold">
                      {formatCurrency(analysis.regulationSavings)}/month
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ownership Costs */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 text-secondary rounded-lg p-2">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ownership Costs</h4>
                  <p className="text-sm text-gray-500">Monthly mortgage equivalent</p>
                </div>
              </div>
              <div className={`rounded-full p-1 ${
                analysis.belowOwnershipCost ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-500'
              }`}>
                {analysis.belowOwnershipCost ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Est. mortgage</span>
                <span className="font-semibold">{formatCurrency(analysis.mortgagePayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Your rent</span>
                <span className={`font-semibold ${analysis.belowOwnershipCost ? 'text-secondary' : 'text-gray-900'}`}>
                  {formatCurrency(property.monthlyRent)}
                </span>
              </div>
              {analysis.ownershipSavings && (
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary font-semibold">Savings vs buying</span>
                    <span className="text-secondary font-bold">
                      {formatCurrency(analysis.ownershipSavings)}/month
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Similar Properties */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
              Similar Properties in Area
            </h3>
            
            {/* Filter Options */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilters.includes('belowMarket') ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter('belowMarket')}
                className={activeFilters.includes('belowMarket') ? 'bg-secondary text-white' : ''}
              >
                <Check className="mr-1 h-3 w-3" />
                Below Market
              </Button>
              <Button
                variant={activeFilters.includes('belowRegulation') ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter('belowRegulation')}
                className={activeFilters.includes('belowRegulation') ? 'bg-secondary text-white' : ''}
              >
                <Check className="mr-1 h-3 w-3" />
                Below Regulation
              </Button>
              <Button
                variant={activeFilters.includes('belowOwnership') ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter('belowOwnership')}
                className={activeFilters.includes('belowOwnership') ? 'bg-secondary text-white' : ''}
              >
                <Check className="mr-1 h-3 w-3" />
                Below Ownership
              </Button>
              {activeFilters.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {filteredProperties.map((prop) => (
              <div key={prop.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{prop.address}</div>
                  <div className="text-sm text-gray-500">
                    {prop.bedrooms} bed • {prop.bathrooms} bath • 
                    {prop.sqm && ` ${prop.sqm} m² • `}
                    {prop.propertyType}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-1">
                    <div className={`rounded-full p-1 ${
                      prop.analysis.belowMarketAverage ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      {prop.analysis.belowMarketAverage ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    </div>
                    <div className={`rounded-full p-1 ${
                      prop.analysis.belowRegulationLimit ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      {prop.analysis.belowRegulationLimit ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    </div>
                    <div className={`rounded-full p-1 ${
                      prop.analysis.belowOwnershipCost ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      {prop.analysis.belowOwnershipCost ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    </div>
                  </div>
                  <Badge className={`px-2 py-1 text-xs font-medium capitalize ${getRatingColor(prop.analysis.rating)}`}>
                    {prop.analysis.rating}
                  </Badge>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      {formatCurrency(prop.monthlyRent)}
                    </div>
                    <div className="text-xs text-gray-500">per month</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Sources */}
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Data Sources
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Market Data</h4>
              <p className="text-gray-600">
                Commercial listings for similar properties within 0.5 miles
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Regulation Limits</h4>
              <p className="text-gray-600">
                London Borough rental guidelines and local housing allowance rates
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Ownership Costs</h4>
              <p className="text-gray-600">
                Property sale prices, mortgage rates, and estimated monthly payments
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
