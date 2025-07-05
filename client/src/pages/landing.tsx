import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Shield, TrendingUp, Calculator, ArrowRight, Users, Clock, DollarSign } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
                Try Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              The Problem: Rental Price Uncertainty
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-2 mr-4">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hidden Overpayment</h3>
                  <p className="text-gray-600">
                    Many renters unknowingly pay 15-30% above fair market rates because pricing information is scattered and hard to interpret
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 rounded-full p-2 mr-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Time-Consuming Research</h3>
                  <p className="text-gray-600">
                    Comparing prices across multiple websites and understanding regulation limits takes hours of manual work
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 rounded-full p-2 mr-4">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Weak Negotiation Position</h3>
                  <p className="text-gray-600">
                    Without concrete data, renters struggle to negotiate fair prices or make informed decisions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="bg-red-100 rounded-full px-4 py-2 inline-block mb-4">
                <span className="text-red-600 font-bold">OVERPRICED</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">£2,800/month</h3>
              <p className="text-gray-600">2 bed flat in Central London</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">vs. Market Average</span>
                <span className="text-red-600 font-semibold">£400 above</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">vs. Regulation Limit</span>
                <span className="text-red-600 font-semibold">£200 above</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">vs. Ownership Cost</span>
                <span className="text-red-600 font-semibold">£300 above</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <p className="text-red-700 font-semibold">
                You could be overpaying by £900/month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Solution: Instant Price Fairness Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get comprehensive rental price analysis in seconds. Know exactly how your rent compares to market rates, regulation limits, and ownership costs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Comparison</h3>
                  <p className="text-gray-600">
                    Instantly compare your rent against current market averages for similar properties in your area
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

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-700 font-semibold">
                This is a fair deal - you're saving £850/month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How FairRent Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Home className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <CardTitle>1. Enter Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Simply enter the property address or postcode to get started
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <CardTitle>2. Get Instant Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our system analyzes market data, regulations, and ownership costs in seconds
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <CardTitle>3. Make Informed Decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get a clear rating (Bronze, Silver, Gold) and actionable insights
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Check Your Rent?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of renters who've discovered the truth about their rental prices
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <a href="/app">
                Try Demo Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}