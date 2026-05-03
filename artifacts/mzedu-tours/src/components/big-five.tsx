"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const bigFive = [
  {
    name: "African Lion",
    latin: "Panthera leo",
    emoji: "🦁",
    image: "/tsavo-lion.jpg",
    where: "Tsavo East, Tsavo West, Amboseli",
    status: "Vulnerable",
    statusColor: "text-amber-400",
    population: "~20,000 in the wild",
    weight: "120 – 250 kg",
    lifespan: "10 – 14 years (wild)",
    facts: [
      "A lion's roar can be heard up to 8 km away.",
      "Lions are the only truly social big cats — they live in prides of up to 30.",
      "Lionesses do up to 90% of the hunting for the pride.",
      "A male lion's mane darkens with age and health.",
      "Lions sleep up to 20 hours a day to conserve energy.",
    ],
    description:
      "The undisputed King of the African bush, the lion is the most iconic safari sighting. In Tsavo, the famous 'Tsavo Maneless Lions' are a unique subspecies — males here rarely grow full manes, making them instantly recognisable. Spotting a pride at dawn or dusk is a moment that stays with you forever.",
    color: "from-amber-900 to-yellow-950",
    accent: "amber",
  },
  {
    name: "African Elephant",
    latin: "Loxodonta africana",
    emoji: "🐘",
    image: "/african-elephant-in-tsavo-national-park-kenya.jpg",
    where: "Amboseli, Tsavo East, Tsavo West, Lumo",
    status: "Endangered",
    statusColor: "text-red-400",
    population: "~415,000 in Africa",
    weight: "4,000 – 7,000 kg",
    lifespan: "60 – 70 years",
    facts: [
      "Elephants are the largest land animals on Earth.",
      "They communicate through infrasound — vibrations too low for humans to hear.",
      "An elephant drinks up to 190 litres of water per day.",
      "Elephant families are matriarchal — led by the oldest female.",
      "Tsavo's red elephants get their colour from bathing in the red laterite soil.",
    ],
    description:
      "Kenya is home to the most celebrated elephant populations in Africa. Amboseli's giants roam freely against the backdrop of Kilimanjaro, while Tsavo's famous red elephants have painted themselves with the park's crimson earth. These intelligent, emotional animals form lifelong bonds and mourn their dead.",
    color: "from-stone-800 to-stone-950",
    accent: "stone",
  },
  {
    name: "African Leopard",
    latin: "Panthera pardus",
    emoji: "🐆",
    image: "/leopard-on-tree-branch-african-safari.jpg",
    where: "Tsavo East, Tsavo West, Shimba Hills",
    status: "Vulnerable",
    statusColor: "text-amber-400",
    population: "~250,000 in Africa",
    weight: "30 – 90 kg",
    lifespan: "12 – 17 years (wild)",
    facts: [
      "Leopards are the most elusive of all the Big Five.",
      "They haul prey heavier than themselves up into trees.",
      "Each leopard has a unique rosette pattern — like a fingerprint.",
      "Leopards are superb swimmers and are comfortable near water.",
      "They are largely nocturnal — most active at dusk and dawn.",
    ],
    description:
      "The most secretive and solitary of the Big Five, the leopard is the ultimate test of a safari guide's skill. Masters of camouflage, they drape themselves across acacia branches and vanish into dry grass. A leopard sighting — even a glimpse — is considered one of the greatest safari gifts.",
    color: "from-yellow-900 to-amber-950",
    accent: "yellow",
  },
  {
    name: "African Buffalo",
    latin: "Syncerus caffer",
    emoji: "🐃",
    image: "/buffalo-herd-in-african-plains-kenya.jpg",
    where: "Tsavo East, Tsavo West, Amboseli",
    status: "Least Concern",
    statusColor: "text-green-400",
    population: "~400,000 in Africa",
    weight: "500 – 900 kg",
    lifespan: "18 – 25 years (wild)",
    facts: [
      "Buffalo have never been domesticated due to their unpredictable aggression.",
      "Old male buffalo called 'dagga boys' are considered among the most dangerous animals.",
      "A buffalo herd can number in the thousands — offering safety in numbers.",
      "Buffalo have an exceptional memory and have been known to ambush hunters.",
      "They are one of the Big Five's most aggressive when threatened.",
    ],
    description:
      "Often underestimated, the African buffalo is arguably the most dangerous member of the Big Five. Massive herds cross Tsavo's plains in spectacular fashion during the dry season. Known for their unpredictable temper and the ability to remember threats, they command deep respect from guides and rangers alike.",
    color: "from-zinc-800 to-zinc-950",
    accent: "zinc",
  },
  {
    name: "Black Rhinoceros",
    latin: "Diceros bicornis",
    emoji: "🦏",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Blackrhino.jpg/1280px-Blackrhino.jpg",
    where: "Nairobi National Park, Ol Pejeta, Lake Nakuru",
    status: "Critically Endangered",
    statusColor: "text-red-500",
    population: "~5,600 remaining globally",
    weight: "800 – 1,400 kg",
    lifespan: "35 – 50 years",
    facts: [
      "Black rhinos are critically endangered — fewer than 6,000 remain.",
      "Rhinos have poor eyesight but an extraordinary sense of smell.",
      "Their horns are made of keratin — the same protein as human fingernails.",
      "A rhino can run at speeds of up to 55 km/h despite their size.",
      "Kenya is one of the last strongholds for black rhino conservation.",
    ],
    description:
      "The rarest and most threatened of the Big Five, the black rhino is a symbol of Africa's conservation battle. Kenya's Rhino Sanctuary at Tsavo West and Ol Pejeta Conservancy are critical refuges for this prehistoric giant. Spotting one in the wild is a true privilege — and an experience that carries real emotional weight.",
    color: "from-slate-800 to-slate-950",
    accent: "slate",
  },
]

function BigFiveModal({
  animal,
  onClose,
  onPrev,
  onNext,
}: {
  animal: typeof bigFive[0]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br ${animal.color} shadow-2xl animate-in zoom-in-95 duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Prev / Next */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-14 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/2 h-72 md:h-auto relative flex-shrink-0">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/40 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
            {/* Status badge */}
            <div className="absolute top-4 left-4">
              <span className={`text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full ${animal.statusColor}`}>
                ● {animal.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-7 md:p-8 text-white">
            <div className="text-4xl mb-2">{animal.emoji}</div>
            <h3 className="font-serif text-3xl font-bold text-white mb-1">{animal.name}</h3>
            <p className="text-white/50 italic text-sm mb-5">{animal.latin}</p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Where in Kenya", value: animal.where },
                { label: "Population", value: animal.population },
                { label: "Weight", value: animal.weight },
                { label: "Lifespan", value: animal.lifespan },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-3">
                  <p className="text-white/50 text-xs uppercase tracking-wide mb-0.5">{s.label}</p>
                  <p className="text-white text-sm font-semibold">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-white/80 text-sm leading-relaxed mb-5">{animal.description}</p>

            {/* Facts */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Did You Know?</p>
              <ul className="space-y-2">
                {animal.facts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">✦</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a
              href="#booking"
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-lg"
            >
              Book a Safari to See Them
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BigFive() {
  const [selected, setSelected] = useState<number | null>(null)

  const open = (i: number) => setSelected(i)
  const close = () => setSelected(null)
  const prev = () => setSelected((s) => (s !== null ? (s - 1 + bigFive.length) % bigFive.length : 0))
  const next = () => setSelected((s) => (s !== null ? (s + 1) % bigFive.length : 0))

  return (
    <>
      <section id="big-five" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#f9f4ee] to-[#f2e8d8]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#8B4513]" />
              <span className="text-[#8B4513] text-xs font-bold uppercase tracking-[0.3em]">Kenya Wildlife</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#8B4513]" />
            </div>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-4">
              The Big Five
              <span className="block text-2xl md:text-3xl font-normal text-[#8B4513] mt-2 italic">
                Africa's Most Magnificent Wildlife
              </span>
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Click on any animal to discover fascinating facts, where to find them, and why they define the ultimate African safari.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {bigFive.map((animal, i) => (
              <button
                key={animal.name}
                onClick={() => open(i)}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-semibold border border-white/30">
                    Discover More
                  </div>
                </div>

                {/* Name at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <div className="text-2xl mb-1">{animal.emoji}</div>
                  <h3 className="font-serif text-white font-bold text-base leading-tight">{animal.name}</h3>
                  <p className={`text-xs font-semibold mt-1 ${animal.statusColor}`}>● {animal.status}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Hint */}
          <p className="text-center text-gray-400 text-sm mt-8 italic">
            Tap or click any animal card to explore its world
          </p>
        </div>
      </section>

      {/* Modal */}
      {selected !== null && (
        <BigFiveModal
          animal={bigFive[selected]}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  )
}
