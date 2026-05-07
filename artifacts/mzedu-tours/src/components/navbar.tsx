"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "wouter"
import { Menu, X, ChevronDown, MapPin, Car, Camera, Plane, Users, Map, Navigation, Compass } from "lucide-react"
import { useLocation } from "wouter"
import DynamicLogo from "./dynamic-logo"

const servicesDropdown = [
  { icon: Compass, label: "Game Drives", href: "/#services", desc: "Wildlife game drives in Tsavo" },
  { icon: Plane, label: "SGR & Airport Transfers", href: "/#services", desc: "Convenient pickup & drop-off" },
  { icon: Car, label: "Car Hire", href: "/#services", desc: "Well-maintained vehicles" },
  { icon: Navigation, label: "Self-Drive", href: "/#services", desc: "Explore at your own pace" },
  { icon: Map, label: "Road Trips", href: "/#services", desc: "Scenic Kenya journeys" },
  { icon: Users, label: "Corporate Tours", href: "/#services", desc: "Team building retreats" },
  { icon: MapPin, label: "Private Drop-offs", href: "/#services", desc: "Door-to-door transport" },
  { icon: Camera, label: "Photography Safaris", href: "/#services", desc: "Capture the wild" },
]

const destinationsDropdown = [
  { label: "Amboseli", subtitle: "Land of Giants", href: "/#services", color: "bg-amber-500" },
  { label: "Lumo Conservancy", subtitle: "Wilderness Untouched", href: "/#services", color: "bg-teal-600" },
  { label: "Tsavo East", subtitle: "Speed & Grace", href: "/#services", color: "bg-red-600" },
  { label: "Tsavo West", subtitle: "Stripes & Savanna", href: "/#services", color: "bg-slate-600" },
]

const packagesDropdown = [
  { label: "Tsavo Game Drive", href: "/packages/tsavo-game-drive" },
  { label: "Tsavo National Park", href: "/packages/tsavo-national-park" },
  { label: "Amboseli Safari", href: "/packages/amboseli-safari-experience" },
  { label: "Mombasa Marine Park", href: "/packages/mombasa-marine-park" },
  { label: "Coastline Road Trip", href: "/packages/coastline-road-trip" },
  { label: "Fort Jesus", href: "/packages/fort-jesus" },
  { label: "Arabuko-Sokoke Forest", href: "/packages/arabuko-sokoke-forest" },
  { label: "Custom Trip Package", href: "/packages/custom-trip-package" },
]

function NavDropdown({
  label,
  children,
  hasScrolled,
}: {
  label: string
  children: React.ReactNode
  hasScrolled: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 transition-colors duration-300 font-medium text-sm hover:text-primary ${
          hasScrolled ? "text-white/90" : "text-foreground"
        }`}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 z-50 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden min-w-[220px]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [location, navigate] = useLocation()
  const pathname = location

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setHasScrolled(currentScrollY > 50)
      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > 100) {
        setIsVisible(false)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#booking") {
        setTimeout(() => {
          document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    if (window.location.hash === "#booking" && pathname === "/") {
      setTimeout(() => {
        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 500)
    }
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [pathname])

  const handleBookUS = () => {
    if (pathname === "/") {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      navigate("/?scroll=booking")
      window.location.hash = "booking"
    }
  }

  const handleSectionLink = (href: string) => {
    setIsOpen(false)
    if (href.startsWith("/#")) {
      const id = href.slice(2)
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      } else {
        navigate("/")
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400)
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${hasScrolled ? "bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg border-b border-white/10" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <DynamicLogo />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {/* Home */}
            <button
              onClick={() => handleSectionLink("/#home")}
              className={`transition-colors duration-300 font-medium text-sm hover:text-primary ${
                hasScrolled ? "text-white/90" : "text-foreground"
              }`}
            >
              Home
            </button>

            {/* Destinations dropdown */}
            <NavDropdown label="Destinations" hasScrolled={hasScrolled}>
              <div className="py-2">
                {destinationsDropdown.map((d) => (
                  <button
                    key={d.label}
                    onClick={() => handleSectionLink(d.href)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left group"
                  >
                    <span className={`w-2 h-2 rounded-full ${d.color} flex-shrink-0`} />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">
                        {d.label}
                      </p>
                      <p className="text-xs text-gray-400">{d.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </NavDropdown>

            {/* Services dropdown */}
            <NavDropdown label="Services" hasScrolled={hasScrolled}>
              <div className="py-2 grid grid-cols-2 gap-0 min-w-[420px]">
                {servicesDropdown.map((s) => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.label}
                      onClick={() => handleSectionLink(s.href)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors leading-tight">
                          {s.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </NavDropdown>

            {/* Packages dropdown */}
            <NavDropdown label="Packages" hasScrolled={hasScrolled}>
              <div className="py-2">
                {packagesDropdown.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-medium"
                  >
                    {p.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2 px-4 pb-2">
                  <button
                    onClick={() => handleSectionLink("/#packages")}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    View all packages →
                  </button>
                </div>
              </div>
            </NavDropdown>

            {/* Gallery */}
            <Link
              href="/gallery"
              className={`transition-colors duration-300 font-medium text-sm hover:text-primary ${
                hasScrolled ? "text-white/90" : "text-foreground"
              }`}
            >
              Gallery
            </Link>

            {/* Blog */}
            <Link
              href="/blog"
              className={`transition-colors duration-300 font-medium text-sm hover:text-primary ${
                hasScrolled ? "text-white/90" : "text-foreground"
              }`}
            >
              Blog
            </Link>

            {/* Contact */}
            <button
              onClick={() => handleSectionLink("/#contact")}
              className={`transition-colors duration-300 font-medium text-sm hover:text-primary ${
                hasScrolled ? "text-white/90" : "text-foreground"
              }`}
            >
              Contact
            </button>

            <button
              onClick={handleBookUS}
              className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm"
            >
              BOOK US
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                hasScrolled ? "text-white hover:bg-white/10" : "hover:bg-muted"
              }`}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#1a1a1a]/98 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
          <div className="px-3 pt-2 pb-4 space-y-1">
            <button
              onClick={() => handleSectionLink("/#home")}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-white/90 transition-colors text-sm font-medium"
            >
              Home
            </button>

            {/* Mobile Destinations accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "destinations" ? null : "destinations")}
                className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-white/10 text-white/90 transition-colors text-sm font-medium"
              >
                Destinations
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "destinations" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "destinations" && (
                <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                  {destinationsDropdown.map((d) => (
                    <button
                      key={d.label}
                      onClick={() => handleSectionLink(d.href)}
                      className="flex items-center gap-2 w-full text-left px-2 py-2 rounded-md hover:bg-white/10 text-white/70 transition-colors text-sm"
                    >
                      <span className={`w-2 h-2 rounded-full ${d.color}`} />
                      {d.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Services accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
                className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-white/10 text-white/90 transition-colors text-sm font-medium"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "services" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "services" && (
                <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                  {servicesDropdown.map((s) => {
                    const Icon = s.icon
                    return (
                      <button
                        key={s.label}
                        onClick={() => handleSectionLink(s.href)}
                        className="flex items-center gap-2 w-full text-left px-2 py-2 rounded-md hover:bg-white/10 text-white/70 transition-colors text-sm"
                      >
                        <Icon className="w-4 h-4 text-primary/80" />
                        {s.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mobile Packages accordion */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "packages" ? null : "packages")}
                className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-white/10 text-white/90 transition-colors text-sm font-medium"
              >
                Packages
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "packages" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "packages" && (
                <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                  {packagesDropdown.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-2 py-2 rounded-md hover:bg-white/10 text-white/70 transition-colors text-sm"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/gallery"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-white/10 text-white/90 transition-colors text-sm font-medium"
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-white/10 text-white/90 transition-colors text-sm font-medium"
            >
              Blog
            </Link>
            <button
              onClick={() => handleSectionLink("/#contact")}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-white/90 transition-colors text-sm font-medium"
            >
              Contact
            </button>

            <button
              onClick={() => { handleBookUS(); setIsOpen(false) }}
              className="w-full mt-3 bg-primary text-white px-4 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 text-sm"
            >
              BOOK US
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
