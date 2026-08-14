import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Wifi,
  Car,
  Coffee,
  Menu,
  X,
  ArrowRight,
  Star,
  Wind,
  Leaf,
  Calendar,
  ChevronRight
} from 'lucide-react';

const BOOKING_URL = "https://www.booking.com/hotel/pl/pokoje-do-wynajecia-pod-leszczyna.pl.html";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ed] font-sans text-[#0e3638] selection:bg-[#164f52] selection:text-[#f4f1ed]">
      {/* Navigation - Premium Floating Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`flex justify-between items-center rounded-full transition-all duration-500 ${
            isScrolled ? 'bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/50 px-6 py-3' : 'bg-transparent px-2 py-0'
          }`}>
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 rounded-full bg-[#0e3638] text-[#f4f1ed] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <Leaf className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <span className="text-xl font-serif tracking-tight font-medium">
                Pod Leszczyną
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
              <button onClick={() => scrollTo('o-nas')} className="hover:text-[#0e3638]/60 transition-colors">O obiekcie</button>
              <button onClick={() => scrollTo('pokoje')} className="hover:text-[#0e3638]/60 transition-colors">Pokoje</button>
              <button onClick={() => scrollTo('udogodnienia')} className="hover:text-[#0e3638]/60 transition-colors">Udogodnienia</button>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 bg-[#0e3638] text-[#f4f1ed] px-6 py-3 rounded-full hover:bg-[#164f52] transition-colors duration-500"
              >
                <span>Rezerwuj</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-md border border-[#0e3638]/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#f4f1ed] px-6 py-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-serif tracking-tight font-medium">Pod Leszczyną</span>
              <button
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0e3638]/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-4xl font-serif tracking-tight">
              <button onClick={() => scrollTo('o-nas')} className="text-left hover:text-[#164f52] transition-colors">O obiekcie.</button>
              <button onClick={() => scrollTo('pokoje')} className="text-left hover:text-[#164f52] transition-colors">Pokoje.</button>
              <button onClick={() => scrollTo('udogodnienia')} className="text-left hover:text-[#164f52] transition-colors">Udogodnienia.</button>
              <button onClick={() => scrollTo('kontakt')} className="text-left hover:text-[#164f52] transition-colors">Kontakt.</button>
            </div>
            <div className="mt-auto">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-[#0e3638] text-[#f4f1ed] px-8 py-5 rounded-full text-lg font-medium"
              >
                <span>Rezerwuj pobyt</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Editorial Style */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end"
          >
            <div className="lg:col-span-7">
              <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-serif leading-[0.9] tracking-tighter mb-8">
                Wygodne<br />
                <span className="text-[#c7a22e] italic font-light">noclegi.</span>
              </motion.h1>
            </div>
            <div className="lg:col-span-5 pb-4">
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#0e3638]/60 font-light leading-relaxed mb-8 max-w-md">
                Komfortowy obiekt noclegowy. Ciesz się spokojem, wygodą i bliskością natury podczas swojego pobytu.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-white border border-[#0e3638]/10 px-8 py-4 rounded-full font-medium hover:border-[#0e3638]/30 hover:shadow-lg transition-all duration-500"
                >
                  <Calendar className="w-5 h-5 text-[#c7a22e]" strokeWidth={1.5} />
                  Sprawdź terminy
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 md:mt-24 h-[50vh] md:h-[70vh] w-full rounded-[2.5rem] overflow-hidden relative"
          >
            <img
              src="https://images.unsplash.com/photo-1542314831-c6a4d1409362?auto=format&fit=crop&q=80"
              alt="Widok na apartamenty"
              className="w-full h-full object-cover scale-105 origin-top"
            />
            {/* Elegant overlay badge */}
            <div className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-2xl border border-white/40 p-6 rounded-3xl max-w-xs text-white hidden md:block">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="font-serif italic text-lg leading-snug">"Wspaniałe miejsce na wypoczynek. Czysto, przytulnie i bardzo miła obsługa."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid / About Section */}
      <section id="o-nas" className="py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]"
          >
            {/* Block 1: Intro (Span 2) */}
            <motion.div variants={fadeInUp} className="md:col-span-2 bg-white rounded-[2rem] p-10 md:p-14 border border-[#0e3638]/5 flex flex-col justify-between group hover:shadow-xl transition-shadow duration-500">
              <Leaf className="w-8 h-8 text-[#c7a22e] mb-8" strokeWidth={1} />
              <div>
                <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-6">O naszym obiekcie.</h2>
                <p className="text-lg text-[#0e3638]/60 font-light leading-relaxed max-w-xl">
                  Pod Leszczyną to sprawdzony obiekt oferujący wygodne noclegi. Dbamy o to, aby każdy gość czuł się u nas jak w domu. To idealne miejsce na weekendowy wyjazd lub dłuższy urlop w spokojnej okolicy.
                </p>
              </div>
            </motion.div>

            {/* Block 2: Image */}
            <motion.div variants={fadeInUp} className="bg-black rounded-[2rem] overflow-hidden relative min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80"
                alt="Detal wnętrza"
                className="w-full h-full object-cover opacity-80 hover:scale-110 transition-transform duration-700"
              />
            </motion.div>

            {/* Block 3: Rating */}
            <motion.div variants={fadeInUp} className="bg-[#0e3638] text-[#f4f1ed] rounded-[2rem] p-10 flex flex-col justify-center items-center text-center">
              <span className="text-6xl font-serif mb-4 text-[#c7a22e]">9.5</span>
              <span className="text-sm font-medium tracking-widest uppercase opacity-60 mb-2">Ocena Booking.com</span>
              <div className="flex gap-1 text-[#c7a22e]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </motion.div>

            {/* Block 4: Quick Feature (Span 2) */}
            <motion.div variants={fadeInUp} className="md:col-span-2 bg-[#ebdfc9] rounded-[2rem] p-10 md:p-14 overflow-hidden relative">
              <div className="relative z-10 flex flex-col justify-center h-full max-w-md">
                <h3 className="text-3xl font-serif tracking-tight mb-4">Wygoda i relaks</h3>
                <p className="text-[#0e3638]/60 leading-relaxed">
                  Przygotowaliśmy przestrzeń, która zapewnia doskonałe warunki do odpoczynku po dniu pełnym wrażeń.
                </p>
              </div>
              {/* Decorative element */}
              <div className="absolute right-[-10%] bottom-[-20%] text-[20rem] text-[#0e3638]/[0.03] font-serif leading-none select-none">
                &
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Rooms Showcase - Sticky Scroll Style */}
      <section id="pokoje" className="py-24 md:py-32 px-4 sm:px-6 bg-white border-y border-[#0e3638]/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left side: Sticky Content */}
            <div className="lg:w-1/3 lg:sticky lg:top-40 h-fit">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Wybierz swój<br/>pokój.</h2>
                <p className="text-lg text-[#0e3638]/60 font-light leading-relaxed mb-10">
                  Oferujemy nowocześnie urządzone, czyste i w pełni wyposażone pokoje oraz apartamenty.
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border-b border-black pb-1 font-medium hover:text-[#c7a22e] hover:border-[#c7a22e] transition-colors"
                >
                  Zobacz pełną ofertę na Booking.com
                  <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            {/* Right side: Scrolling Cards */}
            <div className="lg:w-2/3 flex flex-col gap-12">
              
              {/* Room Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                <div className="rounded-[2.5rem] overflow-hidden mb-8 h-[400px] md:h-[500px] relative">
                  <img
                    src="https://images.unsplash.com/photo-1598928506311-c55dd1b6e7d9?auto=format&fit=crop&q=80"
                    alt="Pokój Dwuosobowy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#0e3638]/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div>
                    <h3 className="text-3xl font-serif tracking-tight mb-3">Pokój Dwuosobowy</h3>
                    <p className="text-[#0e3638]/60 max-w-md leading-relaxed">
                      Przestronny pokój idealny dla par. Wyposażony w wygodne łóżko małżeńskie oraz prywatną łazienkę.
                    </p>
                  </div>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 w-14 h-14 rounded-full border border-[#0e3638]/10 flex items-center justify-center group-hover:bg-[#0e3638] group-hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                  </a>
                </div>
                <div className="flex gap-6 mt-6 pt-6 border-t border-[#0e3638]/5 text-sm font-medium text-[#0e3638]/60 uppercase tracking-widest">
                  <span>2 Osoby</span>
                  <span>Łazienka</span>
                  <span>Wi-Fi</span>
                </div>
              </motion.div>

              {/* Room Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group mt-8"
              >
                <div className="rounded-[2.5rem] overflow-hidden mb-8 h-[400px] md:h-[500px] relative">
                  <img
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80"
                    alt="Apartament Rodzinny"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#0e3638]/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div>
                    <h3 className="text-3xl font-serif tracking-tight mb-3">Apartament Rodzinny</h3>
                    <p className="text-[#0e3638]/60 max-w-md leading-relaxed">
                      Większa przestrzeń dla rodzin lub grupy znajomych. Posiada część wypoczynkową i aneks kuchenny.
                    </p>
                  </div>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 w-14 h-14 rounded-full border border-[#0e3638]/10 flex items-center justify-center group-hover:bg-[#0e3638] group-hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                  </a>
                </div>
                <div className="flex gap-6 mt-6 pt-6 border-t border-[#0e3638]/5 text-sm font-medium text-[#0e3638]/60 uppercase tracking-widest">
                  <span>Do 4 Osób</span>
                  <span>Aneks</span>
                  <span>Parking</span>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Amenities Minimal Grid */}
      <section id="udogodnienia" className="py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">Wszystko, czego potrzebujesz.</h2>
            <p className="text-[#0e3638]/60 text-lg max-w-xl mx-auto font-light">
              Dbamy o komfort naszych gości, oferując szereg praktycznych udogodnień.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {[
              { icon: Wifi, title: "Szybkie Wi-Fi", desc: "Niezawodne łącze w całym obiekcie." },
              { icon: Car, title: "Prywatny parking", desc: "Zamykany, bezpłatny teren dla gości." },
              { icon: Coffee, title: "Aneks kuchenny", desc: "Pełne wyposażenie i ekspres do kawy." },
              { icon: Wind, title: "Klimatyzacja", desc: "Indywidualnie sterowana temperatura." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group cursor-default"
              >
                <div className="w-16 h-16 rounded-full bg-white border border-[#0e3638]/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <item.icon className="w-6 h-6 text-[#0e3638]" strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-serif mb-3">{item.title}</h4>
                <p className="text-[#0e3638]/60 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="kontakt" className="px-4 sm:px-6 pb-4 sm:pb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto bg-[#0e3638] rounded-[3rem] px-8 py-20 md:py-32 text-center relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#164f52] rounded-full blur-[120px] opacity-20 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-serif tracking-tighter text-[#f4f1ed] mb-8">
              Zarezerwuj swój pobyt.
            </h2>
            <p className="text-[#f4f1ed]/60 text-lg md:text-xl font-light max-w-2xl mx-auto mb-16">
              Odkryj prawdziwy odpoczynek. Gwarantujemy najlepsze ceny i dostępność rezerwując bezpośrednio przez nasz zaufany kanał Booking.com.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#f4f1ed] text-[#0e3638] px-10 py-5 rounded-full text-lg font-medium hover:bg-white hover:scale-105 transition-all duration-300"
            >
              Rezerwuj teraz na Booking.com
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Minimalist Footer */}
      <footer className="py-16 px-4 sm:px-6 border-t border-[#0e3638]/5 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#0e3638]">
              <Leaf className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-xl font-serif tracking-tight font-medium">Pod Leszczyną</span>
            </div>
            <p className="text-sm text-[#0e3638]/40">
              © {new Date().getFullYear()} Pod Leszczyną.
            </p>
          </div>
          
          {/* Cross-promotion Group */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0e3638]/40 mb-1">Nasze Obiekty</span>
            <a href="https://milbertus.pl" target="_blank" rel="noreferrer" className="text-sm font-serif italic font-medium text-[#0e3638]/70 hover:text-[#c7a22e] transition-colors flex items-center gap-2">
              Apartament Milbertus <ArrowRight className="w-3 h-3" />
            </a>
            <a href="https://apartamentaksamitka.pl" target="_blank" rel="noreferrer" className="text-sm font-serif italic font-medium text-[#0e3638]/70 hover:text-[#c7a22e] transition-colors flex items-center gap-2">
              Apartament Aksamitka <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="flex flex-col gap-3 text-sm font-medium text-[#0e3638]/60">
            <a href="#" className="hover:text-[#0e3638] transition-colors">Polityka prywatności</a>
            <a href="#" className="hover:text-[#0e3638] transition-colors">Regulamin</a>
            <span className="flex items-center gap-2 mt-2">
              <Mail className="w-4 h-4" /> kontakt@podleszczyna.com.pl
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +48 123 456 789
            </span>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

