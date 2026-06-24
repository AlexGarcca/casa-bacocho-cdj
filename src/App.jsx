import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Utensils, BedDouble, Droplets, Music, Compass, Martini, X, ChevronRight, Waves, Plane, ShieldCheck, SunMedium, Moon, Sun, CloudRain, Cloud, Zap, Menu, Globe
} from 'lucide-react'; 
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Lenis from 'lenis';

// --- DICCIONARIO DE TRADUCCIONES PARA IDIOMAS ---
const translations = {
  es: {
    loading: "CDJ",
    bookingBtn: "Booking",
    reserveBtn: "Reservar",
    reserveNow: "Reservar Ahora",
    navHome: "La Casa",
    navResidencia: "Residencia",
    navDestino: "Destino",
    navDestinoMovil: "El Destino",
    navUbicacion: "Contacto",
    weatherCity: "P. Escondido",
    heroSub: "Bacocho • Puerto Escondido • Oaxaca",
    conceptTag: "01 / El Concepto",
    conceptTitle: <>Tu hogar <br className="hidden md:block" />en la costa.</>,
    conceptDesc: "Ubicada en la tranquilidad de la zona residencial de Bacocho, Casa Don José es un espacio pensado para relajarse en serio. El lugar perfecto para disfrutar de Puerto Escondido con total comodidad, privacidad y esa calidez única de la costa oaxaqueña.",
    amenities: [
      { label: "Suite Master", sub: "Un espacio amplio de descanso con baño privado, vestidor y una atmósfera de total tranquilidad." },
      { label: "2 Hab. Dobles", sub: "Habitaciones cómodas y frescas, perfectamente equipadas para el confort de tu familia o invitados." },
      { label: "2.5 Baños", sub: "Dos baños completos con acabados modernos y un medio baño en la estancia para mayor comodidad." },
      { label: "Cocina Completa", sub: "Totalmente equipada con todo lo necesario para preparar tus comidas favoritas y disfrutar en convivencia." }
    ],
    portfolioTag: "02 / Portfolio Visual",
    portfolioTitle: "La Residencia",
    cats: { todos: "todos", habitaciones: "habitaciones", exteriores: "exteriores", comunes: "comunes" },
    explore: "Explorar",
    showMore: "Ver más fotos",
    showLess: "Mostrar Menos",
    destinoTag: "03 / El Destino",
    destinoTitle: <>Un paraíso <br /><span className="font-light text-white/40 italic">virgen para el</span> <br /><span className="underline decoration-sunset/30 underline-offset-20">alma libre.</span></>,
    destinoCards: [
      { title: "Conectividad Global", text: "A solo 5 minutos del Aeropuerto Internacional, tu llegada a la residencia es inmediata. Puerto Escondido está más cerca de lo que imaginas." },
      { title: "Bacocho Zone", text: "Ubicada en la joya de la corona: Bacocho. Una zona residencial pacífica, vigilada y exclusiva, alejada del bullicio pero cerca de todo." },
      { title: "Ecosistema Salvaje", text: "Vive la magia de la liberación de tortugas marinas en Playa Bacocho y la bioluminiscencia en Manialtepec. Naturaleza en estado puro." }
    ],
    vibesTag: "04 / Experiencias",
    vibesTitle: "Puerto Vibes",
    vibesCards: [
      { title: "Cultura & Beats", text: "Desde la mixología refinada en Bacocho hasta el ambiente vibrante de Zicatela y los atardeceres techno en La Punta. Puerto nunca duerme." },
      { title: "Gastronomía", text: "Disfruta de la pesca del día en cenas de autor frente al mar o el aroma del café de altura oaxaqueño en el mercado tradicional." },
      { title: "Aventura", text: "Surf de clase mundial en Zicatela, avistamiento de ballenas y paseos privados en yate hacia el horizonte infinito del Pacífico desde la Bahía Principal." }
    ],
    discover: "Descubrir",
    contactTag: "05 / Contacto",
    contactTitle: <>Ubicación <br className="hidden md:block" /> Privilegiada</>,
    address: "Montealban 18, Fracc. Bacocho",
    locationDesc: "Situada a pasos del santuario de tortugas marinas y de la serenidad absoluta de Playa Coral. El equilibrio perfecto entre aislamiento y cercanía.",
    mapBtn: "Trazar Ruta en Maps",
    waMessage: "¡Hola! Me interesa obtener más información para rentar Casa Don José en Bacocho.",
    footerTag: "CDJ • 2026 • Private Residence"
  },
  en: {
    loading: "CDJ",
    bookingBtn: "Booking",
    reserveBtn: "Book Now",
    reserveNow: "Book Now",
    navHome: "The House",
    navResidencia: "Residence",
    navDestino: "Destination",
    navDestinoMovil: "The Destination",
    navUbicacion: "Contact",
    weatherCity: "P. Escondido",
    heroSub: "Bacocho • Puerto Escondido • Oaxaca",
    conceptTag: "01 / The Concept",
    conceptTitle: <>Your home <br className="hidden md:block" />by the coast.</>,
    conceptDesc: "Nestled in the tranquility of Bacocho's residential area, Casa Don José is a space designed for true relaxation. The perfect spot to experience Puerto Escondido with complete comfort, absolute privacy, and that unique warmth of the Oaxacan coast.",
    amenities: [
      { label: "Master Suite", sub: "A spacious resting area featuring a private bathroom, walk-in closet, and an atmosphere of total peace." },
      { label: "2 Double Rooms", sub: "Comfortable and breezy rooms, perfectly appointed for the comfort of your family or guests." },
      { label: "2.5 Bathrooms", sub: "Two full bathrooms with modern finishes and a convenient half bath located in the living area." },
      { label: "Full Kitchen", sub: "Fully equipped with everything needed to prepare your favorite meals and gather together." }
    ],
    portfolioTag: "02 / Visual Portfolio",
    portfolioTitle: "The Residence",
    cats: { todos: "all", habitaciones: "bedrooms", exteriores: "exteriores", comunes: "common areas" },
    explore: "Explore",
    showMore: "View more photos",
    showLess: "Show Less",
    destinoTag: "03 / The Destination",
    destinoTitle: <>A pristine <br /><span className="font-light text-white/40 italic">paradise for the</span> <br /><span className="underline decoration-sunset/30 underline-offset-20">free soul.</span></>,
    destinoCards: [
      { title: "Global Connectivity", text: "Just 5 minutes from the International Airport, your arrival at the residence is immediate. Puerto Escondido is closer than you think." },
      { title: "Bacocho Zone", text: "Located in the crown jewel: Bacocho. A peaceful, gated, and exclusive residential area, away from the noise yet close to everything." },
      { title: "Wild Ecosystem", text: "Experience the magic of sea turtle releasing at Bacocho Beach and bioluminescence at Manialtepec. Nature in its purest state." }
    ],
    vibesTag: "04 / Experiences",
    vibesTitle: "Puerto Vibes",
    vibesCards: [
      { title: "Culture & Beats", text: "From refined mixology in Bacocho to the vibrant atmosphere of Zicatela and techno sunsets at La Punta. Puerto never sleeps." },
      { title: "Gastronomy", text: "Enjoy the catch of the day at signature oceanfront dinners or the rich aroma of Oaxacan high-altitude coffee at the traditional market." },
      { title: "Adventure", text: "World-class surfing at Zicatela, whale watching, and private yacht charters into the endless Pacific horizon departing from the Main Bay." }
    ],
    discover: "Discover",
    contactTag: "05 / Contact",
    contactTitle: <>Prime <br className="hidden md:block" /> Location</>,
    address: "Montealban 18, Fracc. Bacocho",
    locationDesc: "Located steps away from the sea turtle sanctuary and the absolute serenity of Coral Beach. The perfect equilibrium between isolation and proximity.",
    mapBtn: "Get Directions on Maps",
    waMessage: "Hi! I am interested in getting more information about renting Casa Don José in Bacocho.",
    footerTag: "CDJ • 2026 • Private Residence"
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- NUEVO ESTADO PARA CONTROLAR EL IDIOMA (ESPAÑOL POR DEFECTO) ---
  const [language, setLanguage] = useState('es');
  const t = translations[language];
  
  const [weather, setWeather] = useState({ temp: 29, condition: 'clear', description: 'Soleado', isNight: false });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    window.lenis = lenis;

    // Ejecutar fetch del clima de forma dinámica según el idioma seleccionado
    const fetchWeather = async () => {
      try {
        const API_KEY = "b5edcdd2b4074f4dc4fe306c5bb17817"; 
        const lat = 15.8625; const lon = -97.0768;
        // Agregamos ${language} al final de la URL de OpenWeatherMap
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${language}`);
        const data = await response.json();
        if (data.main) {
          setWeather({
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            isNight: data.weather[0].icon.includes('n'),
            condition: data.weather[0].main.toLowerCase()
          });
        }
      } catch (e) { console.log("Weather API Offline"); }
    };
    fetchWeather();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(timer); };
  }, [language]); // Agregamos language como dependencia para recargar la descripción del clima si cambia de idioma

  const scrollToTop = () => { if (window.lenis) window.lenis.scrollTo(0); };
  
  const handleBooking = () => {
    const message = encodeURIComponent(t.waMessage);
    window.open(`https://wa.me/529511815020?text=${message}`, '_blank');
  };

  const getWeatherIcon = () => {
    if (weather.isNight) return <Moon size={14} className="text-blue-300" />;
    switch (weather.condition) {
      case 'clouds': return <Cloud size={14} className="text-gray-400" />;
      case 'rain': return <CloudRain size={14} className="text-blue-500" />;
      case 'thunderstorm': return <Zap size={14} className="text-yellow-400" />;
      default: return <Sun size={14} className="text-orange-400" />;
    }
  };

  const galleryImages = [
    { id: 1, category: 'exteriores', title: language === 'es' ? 'Fachada Principal' : 'Main Facade', url: '/images/fachada.jpeg' },
    { id: 2, category: 'exteriores', title: language === 'es' ? 'Identidad Casa Don José' : 'Casa Don José Identity', url: '/images/letrero.jpeg' },
    { id: 3, category: 'exteriores', title: language === 'es' ? 'Área de Piscina' : 'Pool Area', url: '/images/alberca1.jpeg' },
    { id: 4, category: 'exteriores', title: language === 'es' ? 'Alberca y Terraza' : 'Pool & Terrace', url: '/images/alberca2.jpeg' },
    { id: 5, category: 'exteriores', title: language === 'es' ? 'Terraza' : 'Terrace', url: '/images/terrasa.jpeg' },
    { id: 6, category: 'exteriores', title: language === 'es' ? 'Vista de la Terraza' : 'Terrace View', url: '/images/terraza2.jpeg' },
    { id: 7, category: 'exteriores', title: language === 'es' ? 'Espacio Exterior Terraza' : 'Outdoor Terrace Space', url: '/images/terraza3.jpeg' },
    { id: 8, category: 'habitaciones', title: language === 'es' ? 'Área de descanso en la Master Suite' : 'Rest Area in the Master Suite', url: '/images/cuartogd.jpeg' },
    { id: 9, category: 'habitaciones', title: language === 'es' ? 'Habitación Gaviotas' : 'Gaviotas Bedroom', url: '/images/cuartopeq2.jpeg' },
    { id: 10, category: 'habitaciones', title: language === 'es' ? 'Habitación Confort' : 'Confort Bedroom', url: '/images/cuartopeq.jpeg' },
    { id: 11, category: 'habitaciones', title: language === 'es' ? 'Baño de visitas' : 'Guest Bathroom', url: '/images/baño1.jpeg' },
    { id: 12, category: 'habitaciones', title: language === 'es' ? 'Baño de la Master Suite' : 'Master Suite Bathroom', url: '/images/baño2.jpeg' },
    { id: 13, category: 'habitaciones', title: language === 'es' ? 'Closet Master Suite' : 'Master Suite Closet', url: '/images/closet.jpeg' },
    { id: 14, category: 'habitaciones', title: language === 'es' ? 'Closet habitación Confort' : 'Confort Bedroom Closet', url: '/images/closetpeq.jpeg' },
    { id: 15, category: 'comunes', title: language === 'es' ? 'Cocina Totalmente Equipada' : 'Fully Equipped Kitchen', url: '/images/cocina1.jpeg' },
    { id: 16, category: 'comunes', title: language === 'es' ? 'Cocina y desayunador' : 'Kitchen & Breakfast Bar', url: '/images/cocina2.jpeg' },
    { id: 17, category: 'comunes', title: language === 'es' ? 'Comedor' : 'Dining Room', url: '/images/comedor.jpeg' },
    { id: 18, category: 'comunes', title: language === 'es' ? 'Estancia / Sala Principal' : 'Main Living Room', url: '/images/sala1.jpeg' },
    { id: 19, category: 'comunes', title: language === 'es' ? 'Detalles de la Estancia' : 'Living Room Details', url: '/images/sala2cuadro.jpeg' },
    { id: 20, category: 'comunes', title: language === 'es' ? 'Sala de Convivencia' : 'Lounge Area', url: '/images/sala3cuadro.jpeg' },
    { id: 21, category: 'comunes', title: language === 'es' ? 'Sala con Vista a la Piscina' : 'Living Room with Pool View', url: '/images/salavistapiscina.jpeg' },
    { id: 22, category: 'exteriores', title: language === 'es' ? 'Estacionamiento privado para dos vehiculos' : 'Private Parking for Two Vehicles', url: '/images/est1.jpg' }
  ];
  
  const filteredImages = filter === 'todos' ? galleryImages : galleryImages.filter(img => img.category === filter);

  const revealVar = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] font-sans text-palm selection:bg-palm selection:text-white overflow-x-hidden">
      
      {/* --- PRELOADER --- */}
      <AnimatePresence>
        {loading && (
          <motion.div key="preloader" initial={{ opacity: 1 }} exit={{ y: "-100%" }} transition={{ duration: 1.2 }} className="fixed inset-0 z-500 bg-[#FBFBF9] flex flex-col items-center justify-center">
            <h2 className="font-serif text-6xl md:text-8xl italic font-light uppercase text-palm tracking-tighter">{t.loading}</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- WHATSAPP --- */}
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} onClick={handleBooking} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl cursor-pointer flex items-center gap-2 group border border-white/20">
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap px-0 group-hover:px-2 text-[10px] uppercase tracking-widest">{t.reserveBtn}</span>
        <FaWhatsapp size={24} />
      </motion.button>

      {/* --- NAV RESPONSIVO --- */}
      <nav className={`fixed top-0 left-0 right-0 z-100 transition-all duration-700 px-6 md:px-8 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-palm/5 py-4' : 'bg-transparent py-8'}`}>
        <div className={`container mx-auto flex justify-between items-center uppercase italic font-light tracking-tighter ${isScrolled ? 'text-palm' : 'text-white'}`}>
          <div className="flex items-center gap-6">
            <button onClick={scrollToTop} className="font-serif text-2xl md:text-3xl cursor-pointer hover:opacity-60 transition-opacity">CDJ</button>
            <div className={`hidden lg:flex items-center gap-3 border-l pl-6 opacity-60 text-[9px] font-bold uppercase tracking-widest not-italic ${isScrolled ? 'border-palm/10' : 'border-white/20'}`}>
              {getWeatherIcon()}
              <span>{t.weatherCity} {weather.temp}°C • {weather.description}</span>
            </div>
          </div>
          
          {/* Links Escritorio */}
          <div className="hidden md:flex gap-6 md:gap-12 text-[10px] uppercase tracking-[0.4em] font-bold opacity-60 not-italic">
            <a href="#casa" className="hover:opacity-100 transition-opacity">{t.navHome}</a>
            <a href="#residencia" className="hover:opacity-100 transition-opacity">{t.navResidencia}</a>
            <a href="#destino" className="hover:opacity-100 transition-opacity">{t.navDestino}</a>
          </div>
          
          <div className="hidden md:flex items-center gap-6 not-italic">
            {/* --- INTERRUPTOR DE IDIOMA MINIMALISTA (ESCRITORIO) --- */}
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-60 border-r pr-6 border-palm/10">
              <Globe size={12} className="opacity-70" />
              <button onClick={() => setLanguage('es')} className={`hover:opacity-100 transition-opacity ${language === 'es' ? 'text-sunset underline underline-offset-4' : ''}`}>ES</button>
              <span className="opacity-30">|</span>
              <button onClick={() => setLanguage('en')} className={`hover:opacity-100 transition-opacity ${language === 'en' ? 'text-sunset underline underline-offset-4' : ''}`}>EN</button>
            </div>

            <button onClick={handleBooking} className={`border px-8 py-3 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold transition-all cursor-pointer ${isScrolled ? 'border-palm/20 hover:bg-palm hover:text-white' : 'border-white/40 hover:bg-white hover:text-palm'}`}>{t.bookingBtn}</button>
          </div>
          
          {/* Botón menú móvil */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="block md:hidden cursor-pointer p-2">
            <Menu size={24} className={isScrolled ? 'text-palm' : 'text-white'} />
          </button>
        </div>
      </nav>

      {/* --- MENÚ DESPLEGABLE MÓVIL --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: "-100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "-100%" }} transition={{ duration: 0.5, ease: "easeInOut" }} className="fixed inset-0 z-400 bg-white/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden text-palm">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-4"><X size={28} /></button>
            
            {/* --- INTERRUPTOR DE IDIOMA DENTRO DEL MENÚ MÓVIL --- */}
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest mb-4 border border-palm/10 px-6 py-3 rounded-full bg-palm/5">
              <Globe size={14} className="text-sunset" />
              <button onClick={() => setLanguage('es')} className={language === 'es' ? 'text-sunset underline underline-offset-4 font-black' : 'opacity-50'}>Español</button>
              <span className="opacity-30">|</span>
              <button onClick={() => setLanguage('en')} className={language === 'en' ? 'text-sunset underline underline-offset-4 font-black' : 'opacity-50'}>English</button>
            </div>

            <a href="#casa" onClick={() => setIsMenuOpen(false)} className="font-serif text-3xl italic tracking-wide">{t.navHome}</a>
            <a href="#residencia" onClick={() => setIsMenuOpen(false)} className="font-serif text-3xl italic tracking-wide">{t.navResidencia}</a>
            <a href="#destino" onClick={() => setIsMenuOpen(false)} className="font-serif text-3xl italic tracking-wide">{t.navDestinoMovil}</a>
            <button onClick={() => { setIsMenuOpen(false); handleBooking(); }} className="mt-4 border border-palm px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest">{t.reserveNow}</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO CON VIDEO BACKGROUND --- */}
      <section className="relative h-[90vh] md:h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-20 brightness-70">
            <source src="/videos/atardecer.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="container mx-auto px-6 text-center z-10 text-white relative">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <h1 className="text-[14vw] sm:text-[16vw] md:text-[11rem] font-serif leading-[1.2] md:leading-[1.4] uppercase tracking-tighter italic font-light mb-8">
              Casa <br /> Don <span className="md:ml-[2vw]">José</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mt-12 md:mt-24">
              <span className="h-px w-24 bg-white/30 hidden md:block"></span>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-bold opacity-80 italic">{t.heroSub}</p>
              <span className="h-px w-24 bg-white/30 hidden md:block"></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LA CASA & AMENIDADES --- */}
      <section id="casa" className="py-24 md:py-40 bg-white border-y border-palm/5">
        <div className="container mx-auto px-6 md:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 items-start text-palm">
            <motion.div variants={revealVar} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block font-bold">{t.conceptTag}</span>
              <h3 className="font-serif text-4xl md:text-5xl italic leading-tight uppercase font-black">{t.conceptTitle}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light font-sans italic">
                {t.conceptDesc}
              </p>
            </motion.div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-12 md:gap-y-20 gap-x-12 relative z-10">
              {t.amenities.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="flex gap-6 items-start group">
                  <div className="opacity-30 group-hover:opacity-100 transition-opacity text-sunset shrink-0">
                    {i === 0 ? <BedDouble size={24} strokeWidth={1}/> : i === 1 ? <Waves size={24} strokeWidth={1}/> : i === 2 ? <Droplets size={24} strokeWidth={1}/> : <Utensils size={24} strokeWidth={1}/>}
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-widest font-black mb-2">{item.label}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed font-sans">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. LA RESIDENCIA --- */}
      <section id="residencia" className="py-24 md:py-32 bg-[#F7F5F0]">
        <div className="container mx-auto px-6 md:px-8 text-palm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-palm/10 pb-12 gap-8">
            <motion.div variants={revealVar} initial="hidden" whileInView="visible" viewport={{ once: true }}>
               <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block mb-4 font-bold">{t.portfolioTag}</span>
               <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter uppercase font-black">{t.portfolioTitle}</h2>
            </motion.div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 md:gap-10 text-[9px] uppercase tracking-widest font-black opacity-40 relative z-20">
              {['todos', 'habitaciones', 'exteriores', 'comunes'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => { 
                    setFilter(cat); 
                    setShowAllImages(false);
                  }} 
                  className={`hover:opacity-100 cursor-pointer transition-all ${filter === cat ? 'opacity-100 border-b-2 border-palm pb-1' : ''}`}
                >
                  {t.cats[cat]}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-8 relative z-10">
            <AnimatePresence mode="popLayout">
              {filteredImages.slice(0, showAllImages ? filteredImages.length : 6).map((img, i) => (
                <motion.div 
                  layout 
                  key={img.id} 
                  onClick={() => setSelectedImage(img)} 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }} 
                  transition={{ duration: 0.5 }} 
                  className={`relative overflow-hidden cursor-zoom-in group bg-palm shadow-xl h-[40vh] sm:h-[45vh] md:h-[75vh] ${
                    i === 0 ? 'md:col-span-8' : 'md:col-span-4'
                  }`}
                >
                  <img src={img.url} className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" alt={img.title} />
                  <div className="absolute inset-0 bg-palm/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[10px] uppercase tracking-[0.5em] font-black border border-white/30 px-8 py-3 backdrop-blur-md">{t.explore}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length > 6 && (
            <div className="flex justify-center mt-16 relative z-20">
              <button
                onClick={() => setShowAllImages(!showAllImages)}
                className="inline-flex items-center gap-3 border border-palm/20 px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-black hover:bg-palm hover:text-white transition-all cursor-pointer w-full sm:w-auto justify-center"
              >
                {showAllImages ? t.showLess : t.showMore}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. EL DESTINO --- */}
      <section id="destino" className="py-24 md:py-48 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-5xl mb-24 md:mb-32">
            <motion.span variants={revealVar} initial="hidden" whileInView="visible" className="text-[10px] uppercase tracking-[0.6em] text-sunset block mb-10 font-bold">{t.destinoTag}</motion.span>
            <motion.h2 variants={revealVar} initial="hidden" whileInView="visible" className="font-serif text-4xl sm:text-5xl md:text-[8.5rem] italic leading-[1.1] md:leading-[0.85] uppercase font-black">{t.destinoTitle}</motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 font-sans">
            {t.destinoCards.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }} className="space-y-8 group">
                <div className="text-sunset opacity-50 group-hover:opacity-100 transition-opacity">
                  {i === 0 ? <Plane size={32} strokeWidth={0.5} /> : i === 1 ? <ShieldCheck size={32} strokeWidth={0.5} /> : <SunMedium size={32} strokeWidth={0.5} />}
                </div>
                <h4 className="text-sm uppercase tracking-[0.3em] font-black italic text-sunset">{item.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed font-light italic">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <h3 className="absolute -bottom-10 -right-20 text-[25vw] font-black text-white/2 select-none uppercase leading-none italic hidden md:block">Oaxaca</h3>
      </section>

      {/* 5. PUERTO VIBES --- */}
      <section className="py-24 md:py-40 bg-white text-palm">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block mb-4 font-bold">{t.vibesTag}</span>
          <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter uppercase font-black mb-24 md:mb-32">{t.vibesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
            {t.vibesCards.map((item, i) => (
              <div key={i} className="group border-t border-palm/10 pt-16 flex flex-col items-center">
                <div className="mb-10 text-sunset opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700">
                  {i === 0 ? <Music size={24}/> : i === 1 ? <Martini size={24}/> : <Compass size={24}/>}
                </div>
                <h3 className="font-serif text-3xl italic mb-6 uppercase font-black">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light max-w-xs mb-8 font-sans italic">{item.text}</p>
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-black group-hover:text-sunset transition-colors">{t.discover} <ChevronRight size={14} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. UBICACIÓN PRIVILEGIADA --- */}
      <section id="ubicacion" className="py-20 md:py-48 bg-[#FBFBF9] border-t border-palm/5 overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-32 items-center text-palm relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
            className="w-full text-left"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block mb-6 font-sans font-bold">{t.contactTag}</span>
            <h2 className="text-5xl md:text-8xl font-serif mb-8 italic tracking-tighter uppercase font-black leading-tight">{t.contactTitle}</h2>
            
            <div className="space-y-8 text-sm font-light text-gray-500 font-sans">
              <div className="border-l-2 border-sunset pl-6">
                <p className="text-palm tracking-[0.2em] uppercase text-xs font-black mb-2">{t.address}</p>
                <p className="max-w-md font-light italic text-gray-400 leading-relaxed">
                  {t.locationDesc}
                </p>
              </div>
              
              <div className="pt-4">
                <a 
                  href="https://www.google.com/maps/place/Casa+Don+Jos%C3%A9/@15.8679158,-97.0861539,17z/data=!3m1!4b1!4m6!3m5!1s0x85b8f7005b6c317d:0xb4ce7fc27133988f!8m2!3d15.8679107!4d-97.083579!16s%2Fg%2F11w3gnjjvt?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"  
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-3 border border-palm/20 px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-black hover:bg-palm hover:text-white transition-all w-full md:w-auto justify-center"
                >
                  <MapPin size={14} /> {t.mapBtn}
                </a>
              </div>
            </div>
          </motion.div>

          <div className="w-full h-87.5 md:h-[75vh] grayscale hover:grayscale-0 transition-all duration-1000 shadow-xl rounded-sm overflow-hidden border border-palm/5">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.7846709266782!2d-97.083579!3d15.8679107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85b8f7005b6c317d%3A0xb4ce7fc27133988f!2sCasa%20Don%20Jos%C3%A9!5e0!3m2!1ses!2smx!4v1773687957164!5m2!1ses!2smx" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen="" 
               loading="lazy" 
             />
          </div>
        </div>
      </section>

      {/* --- LIGHTBOX MOVILES --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-200 bg-white/98 flex items-center justify-center p-4 md:p-12 cursor-zoom-out text-palm uppercase font-black tracking-tighter italic">
            <button className="absolute top-4 right-4 p-4 opacity-60 hover:opacity-100 transition-opacity"><X size={28} /></button>
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="text-center w-full max-w-5xl">
                <img src={selectedImage.url} className="w-full max-h-[75vh] object-contain shadow-2xl mb-6 md:mb-12 border border-palm/5" alt={selectedImage.title} />
                <p className="font-serif text-xl md:text-4xl italic px-2">{selectedImage.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="py-24 md:py-32 bg-white border-t border-palm/5 text-palm text-center relative z-10">
        <div className="container mx-auto px-8">
          <div className="flex justify-center gap-12 md:gap-16 mb-16 md:mb-20 opacity-40 hover:opacity-100 transition-all duration-500">
            <a href="https://www.instagram.com/casadonjose_ptoescondido/" target="_blank" rel="noreferrer"><FaInstagram size={32} /></a>
            <button onClick={handleBooking} className="cursor-pointer"><FaWhatsapp size={32} /></button>
          </div>
          <p className="text-[9px] uppercase tracking-[0.8em] opacity-30 font-black italic">{t.footerTag}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;