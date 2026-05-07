"use client"

import { useState } from "react"
import { Check, X, Star, ChevronDown } from "lucide-react"

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", rate: 130 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.93 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "TZS", symbol: "TSh", name: "Tanzanian Shilling", rate: 2530 },
  { code: "ZAR", symbol: "R", name: "South African Rand", rate: 18.6 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 3.67 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.5 },
]

const PACKAGES = [
  {
    id: "day-game-drive",
    tag: "Most Popular",
    featured: false,
    name: "1-Day Game Drive",
    location: "Tsavo East or West",
    duration: "1 Day",
    priceUSD: 195,
    perPerson: true,
    description: "A full day of game viewing in Tsavo's vast wilderness — sunrise to sunset.",
    includes: [
      "4×4 Safari vehicle",
      "Professional guide driver",
      "Free SGR pick & drop",
      "Free bottle of water",
    ],
    excludes: ["Park entry fees", "Driver's allowance", "Meals"],
    itinerary: [
      { day: "Day 1", items: ["Morning pick-up", "Full-day game drive", "Lunch break (own cost)", "Sunset drive", "SGR drop-off"] },
    ],
  },
  {
    id: "tsavo-3day",
    tag: "Best Value",
    featured: true,
    name: "3-Day Safari Game Drive",
    location: "Tsavo East & West",
    duration: "3 Days",
    priceUSD: 515,
    perPerson: true,
    description: "The flagship itinerary from our official flyer — two parks, three days of pure adventure.",
    includes: [
      "4×4 Safari vehicle",
      "Free SGR pick & drops",
      "Professional guide driver",
      "Free bottle of water",
      "Hotel accommodation",
      "All meals (breakfast, lunch, dinner)",
    ],
    excludes: [
      "Park entry fees",
      "Driver's allowance",
      "Driver's accommodation",
    ],
    itinerary: [
      { day: "Day 1", items: ["Arrival & pick-up", "Hotel check-in", "Afternoon game drive", "Dinner"] },
      { day: "Day 2", items: ["Breakfast", "Sunrise game drive", "Lunch", "Sunset game drive", "Dinner"] },
      { day: "Day 3", items: ["Breakfast", "Hotel check-out", "Final game drive", "SGR drop-off"] },
    ],
  },
  {
    id: "amboseli-2day",
    tag: null,
    featured: false,
    name: "2-Day Amboseli Safari",
    location: "Amboseli National Park",
    duration: "2 Days",
    priceUSD: 420,
    perPerson: true,
    description: "Watch elephants roam beneath Kilimanjaro — Africa's most iconic view.",
    includes: [
      "4×4 Safari vehicle",
      "Airport / SGR transfers",
      "Professional guide driver",
      "Hotel accommodation",
      "Breakfast & dinner",
      "Free water",
    ],
    excludes: ["Park entry fees", "Driver's allowance", "Lunch"],
    itinerary: [
      { day: "Day 1", items: ["Pick-up & transfer to Amboseli", "Afternoon game drive", "Dinner & overnight"] },
      { day: "Day 2", items: ["Breakfast", "Morning game drive", "Depart & drop-off"] },
    ],
  },
  {
    id: "lumo-2day",
    tag: null,
    featured: false,
    name: "2-Day Lumo Conservancy",
    location: "Lumo Community Wildlife Sanctuary",
    duration: "2 Days",
    priceUSD: 370,
    perPerson: true,
    description: "A hidden gem — private conservancy with lions, elephants, and cheetahs.",
    includes: [
      "4×4 Safari vehicle",
      "SGR transfers",
      "Professional guide driver",
      "Conservancy accommodation",
      "Full board meals",
      "Free water",
    ],
    excludes: ["Conservancy fees", "Driver's allowance", "Tips"],
    itinerary: [
      { day: "Day 1", items: ["Pick-up", "Check-in at conservancy", "Evening game drive", "Dinner"] },
      { day: "Day 2", items: ["Breakfast", "Morning game walk / drive", "Departure"] },
    ],
  },
  {
    id: "airport-transfer",
    tag: null,
    featured: false,
    name: "SGR & Airport Transfer",
    location: "Nairobi ↔ Mombasa ↔ Voi",
    duration: "One Way",
    priceUSD: 45,
    perPerson: true,
    description: "Comfortable, timely door-to-door transfers for individuals and groups.",
    includes: [
      "Clean, comfortable vehicle",
      "Professional driver",
      "Meet & greet service",
      "Luggage assistance",
    ],
    excludes: ["SGR train tickets", "Tolls / parking fees"],
    itinerary: [],
  },
  {
    id: "car-hire",
    tag: null,
    featured: false,
    name: "4×4 Car Hire",
    location: "Self-Drive or Chauffeured",
    duration: "Per Day",
    priceUSD: 120,
    perPerson: false,
    description: "Well-maintained Land Cruisers and safari 4×4s — with or without driver.",
    includes: [
      "Full insurance cover",
      "24/7 roadside support",
      "Free water & snacks",
      "GPS navigation",
    ],
    excludes: ["Fuel", "Park entry fees", "Driver allowance (chauffeured)"],
    itinerary: [],
  },
  {
    id: "photography-safari",
    tag: null,
    featured: false,
    name: "Photography Safari",
    location: "Tsavo East / Amboseli",
    duration: "2 Days",
    priceUSD: 460,
    perPerson: true,
    description: "Dedicated photography drives at golden hour — perfect for wildlife photographers.",
    includes: [
      "4×4 pop-roof safari vehicle",
      "Experienced guide",
      "Hotel accommodation",
      "Meals (breakfast & dinner)",
      "SGR transfers",
    ],
    excludes: ["Park entry fees", "Photography equipment", "Driver's allowance"],
    itinerary: [
      { day: "Day 1", items: ["Golden hour morning drive", "Midday rest & editing", "Sunset drive"] },
      { day: "Day 2", items: ["Early sunrise session", "Morning drive", "Departure transfer"] },
    ],
  },
  {
    id: "corporate-tour",
    tag: null,
    featured: false,
    name: "Corporate Group Tour",
    location: "Kenya Coast & National Parks",
    duration: "3–5 Days",
    priceUSD: 380,
    perPerson: true,
    description: "Team-building retreats combining safari, beach, and wellness. Min. 10 people.",
    includes: [
      "Multiple safari vehicles",
      "Team activities & game drives",
      "Full board accommodation",
      "All transfers",
      "Event coordination",
    ],
    excludes: ["Park entry fees", "Alcoholic beverages", "Personal expenses"],
    itinerary: [],
  },
]

function formatPrice(usd: number, currency: typeof CURRENCIES[0]) {
  const amount = usd * currency.rate
  if (currency.code === "KES" || currency.code === "TZS") {
    return `${currency.symbol} ${Math.round(amount).toLocaleString()}`
  }
  return `${currency.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export default function Rates() {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>("tsavo-3day")

  return (
    <section id="rates" className="py-20 bg-[#f9f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Transparent Pricing</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Our Rates & Packages
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            All prices shown per person unless stated otherwise. Select your preferred currency below.
          </p>
        </div>

        {/* Currency Selector */}
        <div className="flex justify-center mb-14">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 bg-white border-2 border-primary/20 hover:border-primary rounded-2xl px-6 py-3 shadow-md transition-all duration-200 font-semibold text-gray-800"
            >
              <span className="text-xl font-bold text-primary">{selectedCurrency.symbol}</span>
              <span>{selectedCurrency.code} — {selectedCurrency.name}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-30 min-w-[260px] overflow-hidden">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => { setSelectedCurrency(c); setDropdownOpen(false) }}
                    className={`flex items-center gap-3 w-full px-5 py-3 hover:bg-primary/5 transition-colors text-left ${
                      c.code === selectedCurrency.code ? "bg-primary/10 text-primary font-semibold" : "text-gray-700"
                    }`}
                  >
                    <span className="w-10 font-bold text-sm">{c.symbol}</span>
                    <span className="text-sm">{c.code} — {c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Note banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 mb-10 flex items-start gap-3 max-w-3xl mx-auto">
          <span className="text-amber-500 text-lg mt-0.5">💡</span>
          <p className="text-sm text-amber-800">
            Rates are indicative and based on standard packages. Final pricing depends on group size, season, and specific requirements.
            Contact us for a custom quote.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => {
            const isExpanded = expandedCard === pkg.id
            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-300 flex flex-col ${
                  pkg.featured ? "ring-2 ring-primary shadow-xl md:scale-105 z-10" : "hover:shadow-lg"
                }`}
              >
                {/* Card header */}
                <div className={`px-6 pt-6 pb-4 ${pkg.featured ? "bg-gradient-to-br from-primary to-[#a04820]" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      {pkg.tag && (
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full mb-2 ${
                          pkg.featured
                            ? "bg-white/20 text-white"
                            : "bg-primary/10 text-primary"
                        }`}>
                          <Star className="w-3 h-3" />
                          {pkg.tag}
                        </span>
                      )}
                      <h3 className={`font-serif font-bold text-lg leading-tight ${pkg.featured ? "text-white" : "text-gray-900"}`}>
                        {pkg.name}
                      </h3>
                      <p className={`text-xs mt-1 ${pkg.featured ? "text-white/70" : "text-gray-400"}`}>
                        📍 {pkg.location}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ml-2 flex-shrink-0 ${
                      pkg.featured ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}>
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Price */}
                  <div className={`mt-2 p-4 rounded-2xl ${pkg.featured ? "bg-white/15" : "bg-primary/5"}`}>
                    <div className={`text-3xl font-bold ${pkg.featured ? "text-white" : "text-primary"}`}>
                      {formatPrice(pkg.priceUSD, selectedCurrency)}
                    </div>
                    <div className={`text-xs mt-0.5 ${pkg.featured ? "text-white/70" : "text-gray-400"}`}>
                      {pkg.perPerson ? "per person" : "per vehicle/day"}
                    </div>
                    {selectedCurrency.code !== "USD" && (
                      <div className={`text-xs mt-1 ${pkg.featured ? "text-white/60" : "text-gray-300"}`}>
                        ≈ ${pkg.priceUSD.toLocaleString()} USD
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="px-6 py-4 border-b border-gray-50">
                  <p className="text-sm text-gray-500">{pkg.description}</p>
                </div>

                {/* Includes / Excludes */}
                <div className="px-6 py-4 flex-1">
                  <div className="mb-3">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Includes</p>
                    <ul className="space-y-1.5">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Excludes</p>
                    <ul className="space-y-1.5">
                      {pkg.excludes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Itinerary toggle */}
                {pkg.itinerary.length > 0 && (
                  <div className="px-6 pb-4">
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : pkg.id)}
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      {isExpanded ? "Hide itinerary" : "View itinerary"}
                    </button>
                    {isExpanded && (
                      <div className="mt-3 space-y-3">
                        {pkg.itinerary.map((day) => (
                          <div key={day.day} className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs font-bold text-primary mb-1.5">{day.day}</p>
                            <ul className="space-y-1">
                              {day.items.map((item) => (
                                <li key={item} className="text-xs text-gray-600 flex items-center gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* CTA */}
                <div className="px-6 pb-6">
                  <a
                    href="/#booking"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`block w-full text-center py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                      pkg.featured
                        ? "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                        : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    Book This Package
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Custom quote CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-[#a04820] rounded-3xl px-8 py-10 text-center text-white">
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">Need a Custom Quote?</h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto text-sm">
            Group bookings, special occasions, or bespoke itineraries — we'll build the perfect package for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/254723471093"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow hover:shadow-lg text-sm"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:mzedutoursandtravels01@gmail.com"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-300 text-sm"
            >
              Email for Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
