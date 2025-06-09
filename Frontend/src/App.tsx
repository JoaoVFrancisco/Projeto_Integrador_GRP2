import React from 'react';
import { Building2, Users, Globe2, ArrowRight, LogIn, Factory, Leaf, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Factory className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">ArcelorMittal</span>
            </div>
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://images.unsplash.com/photo-1565715101841-4e50c7eced5a?auto=format&fit=crop&q=80"
            alt="Steel manufacturing"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transforming Tomorrow's<br />Steel Industry Today
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mb-8">
            Leading the evolution in sustainable steel manufacturing with innovative solutions and global expertise.
          </p>
          <button className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors text-lg">
            <span>Learn More</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe2 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Global Presence</h3>
              <p className="text-gray-600">Operating in 60+ countries with industrial presence in 17 countries</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-600">Committed to carbon-neutral steel production by 2050</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Industry Leader</h3>
              <p className="text-gray-600">World's leading steel and mining company</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">168,000</div>
              <div className="text-gray-400">Employees Worldwide</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">$76.6B</div>
              <div className="text-gray-400">Annual Revenue</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">78.5M</div>
              <div className="text-gray-400">Tonnes of Steel Production</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Factory className="h-6 w-6 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">ArcelorMittal</span>
            </div>
            <div className="text-gray-500">© 2024 ArcelorMittal. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;