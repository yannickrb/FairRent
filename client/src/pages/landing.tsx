import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Shield, TrendingUp, Calculator, ArrowRight, Users, Clock, DollarSign } from "lucide-react";

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-white rounded-lg p-2">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FairRent</h1>
                <p className="text-sm text-gray-500">Proof of Concept</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Concept Only - Mock Data
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Know if you are overpaying for Rent
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A rental price fairness checker that helps property renters know if they are overpaying by comparing rental prices against local market averages, area regulation limits, and ownership price.
          </p>
          
          <div className="max-w-md mx-auto">
            <Button 
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <a href="/app">
                Try FairRent Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Experience our rental price fairness checker with real examples
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Renters face uncertainty about whether they're paying a fair price for their property
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                  <DollarSign className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle className="text-lg">Overpaying Without Knowing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Many renters pay more than market rate simply because they don't have access to comprehensive market data
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-orange-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                  <Clock className="h-10 w-10 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Time-Consuming Research</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comparing prices across multiple platforms and calculating true costs takes hours of manual work
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                  <Users className="h-10 w-10 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Lack of Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No easy way to compare rental prices against ownership costs, regulation limits, and market averages
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">This Solution</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              FairRent instantly analyzes any rental property and gives you a fairness rating
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Comparison</h3>
                    <p className="text-gray-600">
                      Compare rental prices against local market averages to see if you're paying fair value
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Regulation Limits</h3>
                    <p className="text-gray-600">
                      Check if your rent complies with local area regulation limits and rent control policies
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 rounded-full p-2 mr-4">
                    <Calculator className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ownership Costs</h3>
                    <p className="text-gray-600">
                      See how rental costs compare to estimated mortgage payments for similar properties
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-4 py-2 inline-block mb-4">
                  <span className="font-bold">GOLD RATING</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">£2,200/month</h3>
                <p className="text-gray-600">2 bed flat in Shoreditch</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">vs. Market Average</span>
                  <span className="text-green-600 font-semibold">£300 below</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">vs. Regulation Limit</span>
                  <span className="text-green-600 font-semibold">£150 below</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">vs. Ownership Cost</span>
                  <span className="text-green-600 font-semibold">£400 below</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  This is an excellent deal - you're saving significantly compared to all benchmarks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-primary text-white rounded-lg p-2">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-white">FairRent</div>
                <div className="text-sm text-gray-400">Stop overpaying for rent</div>
              </div>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="/app" className="hover:text-white">Try Demo</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="mailto:hello@fairrent.com" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}