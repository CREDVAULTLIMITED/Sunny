import React from 'react';

export default function InstitutionalHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-700 via-gray-700 to-zinc-700">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="text-center">
            {/* Subtitle */}
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">
              🏛️ Institutional Payment Solutions
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Powering Financial
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Institutions
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive payment infrastructure designed specifically for banks, SACCOs, MFIs, 
              and fintech companies. Ensure regulatory compliance while delivering exceptional 
              digital financial services to your customers.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="inline-flex items-center px-8 py-3 bg-slate-700 hover:bg-slate-800 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 border border-slate-600">
                Request Demo
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg font-semibold rounded-lg transition-all duration-200">
                Contact Sales
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </div>

            {/* Trust indicators / Partner logos */}
            <div className="mb-12">
              <p className="text-sm text-gray-400 mb-6">Trusted by leading financial institutions across Africa</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {/* Placeholder for bank logos */}
                <div className="h-12 w-24 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-medium">CBK</span>
                </div>
                <div className="h-12 w-24 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-medium">SASRA</span>
                </div>
                <div className="h-12 w-24 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-medium">KBA</span>
                </div>
                <div className="h-12 w-24 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-medium">PCI DSS</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-lg font-medium text-gray-200 mb-1">Institutions</div>
                <div className="text-sm text-gray-300">Served globally</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.99%</div>
                <div className="text-lg font-medium text-gray-200 mb-1">Uptime</div>
                <div className="text-sm text-gray-300">SLA guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-lg font-medium text-gray-200 mb-1">Countries</div>
                <div className="text-sm text-gray-300">Across Africa</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2.5B</div>
                <div className="text-lg font-medium text-gray-200 mb-1">Processed</div>
                <div className="text-sm text-gray-300">Annual volume</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
