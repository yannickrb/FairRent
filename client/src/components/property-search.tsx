import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Shield, TrendingUp, Calculator, MapPin, Globe } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AnalysisResult } from "@shared/schema";

interface PropertySearchProps {
  onResults: (results: AnalysisResult) => void;
  onSearchPerformed?: () => void;
}

const countries = {
  uk: {
    name: "United Kingdom",
    cities: [
      "London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Sheffield", 
      "Bristol", "Newcastle", "Nottingham", "Leicester", "Edinburgh", "Glasgow",
      "Cardiff", "Belfast", "Brighton", "Oxford", "Cambridge", "Bath"
    ]
  },
  za: {
    name: "South Africa", 
    cities: [
      "Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth",
      "Bloemfontein", "East London", "Pietermaritzburg", "Welkom", "Kimberley",
      "Rustenburg", "Polokwane", "Witbank", "Nelspruit", "Klerksdorp"
    ]
  },
  nl: {
    name: "Netherlands",
    cities: [
      "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg",
      "Groningen", "Almere", "Breda", "Nijmegen", "Enschede", "Haarlem",
      "Arnhem", "Zaanstad", "Amersfoort", "Apeldoorn", "Maastricht", "Dordrecht"
    ]
  }
};

export default function PropertySearch({ onResults, onSearchPerformed }: PropertySearchProps) {
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<keyof typeof countries>("uk");
  const [selectedCity, setSelectedCity] = useState("");

  const searchMutation = useMutation({
    mutationFn: async (searchQuery: string) => {
      const response = await apiRequest("POST", "/api/property/search", { query: searchQuery });
      return response.json() as Promise<AnalysisResult>;
    },
    onSuccess: (data) => {
      onResults(data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchPerformed?.();
      searchMutation.mutate(query.trim());
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Check if your rental price is fair
          </h2>
          <p className="text-lg text-gray-600">
            Enter a property address to get instant analysis across three key metrics
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter building name, street address, or postcode (e.g. 'Canary Wharf', 'SW1A 1AA')"
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={searchMutation.isPending}
            />
          </div>
          <Button
            type="submit"
            disabled={!query.trim() || searchMutation.isPending}
            className="w-full mt-4 bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
          >
            <Search className="mr-2 h-5 w-5" />
            {searchMutation.isPending ? "Analyzing Property..." : "Analyze Property"}
          </Button>
        </form>

        {searchMutation.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-center">
              {searchMutation.error instanceof Error 
                ? searchMutation.error.message 
                : "An error occurred while searching. Please try again."}
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
          <div className="flex items-center">
            <Shield className="h-4 w-4 text-secondary mr-2" />
            <span>Regulation compliance check</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-secondary mr-2" />
            <span>Market price comparison</span>
          </div>
          <div className="flex items-center">
            <Calculator className="h-4 w-4 text-secondary mr-2" />
            <span>Ownership cost analysis</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
