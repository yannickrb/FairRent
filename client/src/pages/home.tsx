import { useState } from "react";
import Header from "@/components/header";
import PropertySearch from "@/components/property-search";
import PropertyResults from "@/components/property-results";
import { Home } from "lucide-react";
import type { AnalysisResult } from "@shared/schema";

export default function HomePage() {
  const [results, setResults] = useState<AnalysisResult | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertySearch onResults={setResults} />
        
        {results && (
          <div className="mt-8">
            <PropertyResults results={results} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-primary text-white rounded-lg p-2">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-gray-900">FairRent</div>
                <div className="text-sm text-gray-500">Property Rental Price Checker</div>
              </div>
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Terms of Service</a>
              <a href="#" className="hover:text-gray-900">API</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
