import { ArrowRight, Search, BarChart, Award, DollarSign, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <span className="text-xl font-bold text-gray-900">FairRent</span>
                </div>
              </Link>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                ← Back to Search
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How FairRent Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered system analyzes London rental properties against three key fairness criteria 
            to help you make informed decisions and avoid overpriced rentals.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple 3-Step Process
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="relative overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">1. Search Property</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Enter any London property address, building name, or postcode. 
                  Our system automatically extracts all property details.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-500">
                  Example: "Canary Wharf Tower" or "E14 5AB"
                </div>
              </CardContent>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Step 1</Badge>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="relative overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">2. AI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Our algorithms analyze the property against market rates, 
                  regulation limits, and ownership costs using live data.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-500">
                  Compares 50+ similar properties in seconds
                </div>
              </CardContent>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-green-100 text-green-700">Step 2</Badge>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="relative overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">3. Get Rating</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Receive a Bronze, Silver, or Gold fairness rating with detailed 
                  breakdown and savings opportunities.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-500">
                  See exactly why and save up to £500/month
                </div>
              </CardContent>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Step 3</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Fairness Criteria */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Three Fairness Criteria
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Market Comparison */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-lg">Market Comparison</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We compare your property's rent against similar properties within 0.5 miles, 
                  matching bedrooms, bathrooms, and property type.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Data Sources:</span>
                    <span className="font-medium">Rightmove, Zoopla</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Update Frequency:</span>
                    <span className="font-medium">Daily</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sample Size:</span>
                    <span className="font-medium">50+ properties</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regulation Limits */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-lg">Regulation Limits</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We check if the rent exceeds local housing allowance rates and 
                  London Borough guidelines for fair rental pricing.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Coverage:</span>
                    <span className="font-medium">All London Boroughs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Guidelines:</span>
                    <span className="font-medium">LHA Rates</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Update:</span>
                    <span className="font-medium">Government Schedule</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ownership Costs */}
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                  <CardTitle className="text-lg">Ownership Costs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We calculate what it would cost to own the property, including 
                  mortgage payments, to show potential savings from buying.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Deposit:</span>
                    <span className="font-medium">25% assumption</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Interest Rate:</span>
                    <span className="font-medium">Current market rates</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Property Values:</span>
                    <span className="font-medium">Land Registry data</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Rating System */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Rating System Explained
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bronze */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl text-yellow-800">Bronze Rating</CardTitle>
                <Badge className="bg-yellow-200 text-yellow-800 mt-2">Meets 1 criteria</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-center">
                  Property meets one fairness criteria. Consider negotiating or looking for alternatives.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>May be overpriced compared to market</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Limited savings opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Room for improvement</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Silver */}
            <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-gray-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-gray-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Silver Rating</CardTitle>
                <Badge className="bg-gray-200 text-gray-800 mt-2">Meets 2 criteria</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-center">
                  Good value property that meets two fairness criteria. Reasonable choice for most renters.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>Fair market pricing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>Some savings potential</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>Balanced choice</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gold */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-800">Gold Rating</CardTitle>
                <Badge className="bg-green-200 text-green-800 mt-2">Meets all 3 criteria</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-center">
                  Excellent value property that meets all fairness criteria. Highly recommended choice.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Below market average</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Maximum savings potential</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Exceptional value</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Sources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Data Sources
          </h2>
          
          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Property Data</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Rightmove listings (updated daily)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Zoopla property database</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">OnTheMarket rental listings</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Land Registry sale prices</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Government & Financial</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Local Housing Allowance rates</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">London Borough guidelines</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Current mortgage rates</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Bank of England base rates</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How accurate is the analysis?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our analysis uses live data from major property portals and government sources, 
                  comparing against 50+ similar properties. Accuracy depends on data availability 
                  and market conditions, typically within 5-10% of actual market rates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What areas does FairRent cover?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Currently, FairRent covers all London boroughs and postcodes. We're planning 
                  to expand to other major UK cities including Manchester, Birmingham, and Edinburgh 
                  in the coming months.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is the service free to use?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, FairRent is completely free for individual users. We're committed to helping 
                  renters make informed decisions and avoid overpriced properties. No hidden fees 
                  or premium subscriptions required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How often is data updated?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Property listings are updated daily from Rightmove, Zoopla, and other sources. 
                  Government rates and regulations are updated when officially announced. 
                  Mortgage rates are refreshed weekly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Fair Rent?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Start searching London properties now and discover which rentals offer the best value for money.
              </p>
              <Link href="/">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
                  Start Property Search
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-5 w-5" />
            <span className="font-semibold">FairRent</span>
          </div>
          <p className="text-gray-400 text-sm">
            Helping London renters find fair property prices since 2025
          </p>
        </div>
      </footer>
    </div>
  );
}