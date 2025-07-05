import { Home, Info, Mail } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-primary text-white rounded-lg p-2">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FairRent</h1>
              <p className="text-sm text-gray-500">Rental Price Fairness Checker</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-900 font-medium">About</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1">
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
