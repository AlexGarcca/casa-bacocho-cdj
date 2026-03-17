import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Utensils, Car, BedDouble, Droplets, Camera, Palmtree, Anchor, Music, Compass, Martini, X, Star, ChevronRight, Waves, Quote, Plane, ShieldCheck, SunMedium, CloudSun, Moon, Sun, CloudRain, Cloud, Zap 
} from 'lucide-react'; 
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Lenis from 'lenis';

function App() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [weather, setWeather] = useState({ temp: 29, condition: 'clear', description: 'Soleado', isNight: false });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    window.lenis = lenis;

    const fetchWeather = async () => {
      try {
        const API_KEY = "b5edcdd2b4074f4dc4fe306c5bb17817"; 
        const lat = 15.8625; const lon = -97.0768;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
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
  }, []);

  const scrollToTop = () => { if (window.lenis) window.lenis.scrollTo(0); };
  const handleBooking = () => {
    const message = encodeURIComponent("¡Hola! Me interesa obtener más información para rentar Casa Don José en Bacocho.");
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
    { id: 1, category: 'habitaciones', title: 'Suite Master (Baño & Closet)', url: '/images/habprinc.jpg' },
    { id: 2, category: 'comunes', title: 'Piscina de Autor', url: '/images/piscina1.jpg' },
    { id: 3, category: 'comunes', title: 'Cocina Integral Pro', url: '/images/Cocina.jpg' },
    { id: 4, category: 'habitaciones', title: 'Habitación Doble I', url: '/images/habdoble.jpg' },
    { id: 5, category: 'comunes', title: 'Lounge Exterior', url: '/images/piscina2.jpg' },
    { id: 6, category: 'comunes', title: 'Terraza Atardecer', url: '/images/Terraza.jpg' },
    { id: 7, category: 'exteriores', title: 'Fachada y Acceso Privado', url: '/images/est1.jpg' },
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
            <h2 className="font-serif text-6xl md:text-8xl italic font-light uppercase text-palm tracking-tighter">CDJ</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- WHATSAPP --- */}
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} onClick={handleBooking} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl cursor-pointer flex items-center gap-2 group border border-white/20">
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap px-0 group-hover:px-2 text-[10px] uppercase tracking-widest">Reservar</span>
        <FaWhatsapp size={24} />
      </motion.button>

      {/* --- NAV ADAPTATIVO --- */}
      <nav className={`fixed top-0 left-0 right-0 z-100 transition-all duration-700 px-6 md:px-8 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-palm/5 py-4' : 'bg-transparent py-8'}`}>
        <div className={`container mx-auto flex justify-between items-center uppercase italic font-light tracking-tighter ${isScrolled ? 'text-palm' : 'text-white'}`}>
          <div className="flex items-center gap-6">
            <button onClick={scrollToTop} className="font-serif text-2xl md:text-3xl cursor-pointer hover:opacity-60 transition-opacity">CDJ</button>
            <div className={`hidden lg:flex items-center gap-3 border-l pl-6 opacity-60 text-[9px] font-bold uppercase tracking-widest not-italic ${isScrolled ? 'border-palm/10' : 'border-white/20'}`}>
              {getWeatherIcon()}
              <span>P. Escondido {weather.temp}°C • {weather.description}</span>
            </div>
          </div>
          <div className="flex gap-6 md:gap-12 text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold opacity-60 not-italic">
            <a href="#casa" className="hover:opacity-100 transition-opacity">La Casa</a>
            <a href="#residencia" className="hidden sm:inline hover:opacity-100 transition-opacity">Residencia</a>
            <a href="#destino" className="hover:opacity-100 transition-opacity">Destino</a>
          </div>
          <button onClick={handleBooking} className={`hidden sm:block border px-8 py-3 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold transition-all cursor-pointer not-italic ${isScrolled ? 'border-palm/20 hover:bg-palm hover:text-white' : 'border-white/40 hover:bg-white hover:text-palm'}`}>Booking</button>
        </div>
      </nav>

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
            <h1 className="text-[16vw] md:text-[11rem] font-serif leading-[1.2] md:leading-[1.4] uppercase tracking-tighter italic font-light mb-8">
              Casa <br /> Don <span className="md:ml-[2vw]">José</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mt-12 md:mt-24">
              <span className="h-px w-24 bg-white/30 hidden md:block"></span>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-bold opacity-80 italic">Bacocho • Puerto Escondido • Oaxaca</p>
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
              <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block font-bold">01 / El Concepto</span>
              <h3 className="font-serif text-4xl md:text-5xl italic leading-tight uppercase font-black">Un refugio <br className="hidden md:block" />de autor.</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light font-sans italic">
                Ubicada en el enclave residencial más exclusivo de Puerto Escondido, CDJ es un santuario donde la arquitectura contemporánea abraza la calidez de la costa oaxaqueña. Cada rincón ha sido diseñado para ofrecer una experiencia de calma absoluta.
              </p>
            </motion.div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-12 md:gap-y-20 gap-x-12 relative z-10">
              {[
                { label: "Suite Master", sub: "Refugio personal con baño privado, amplio vestidor y una atmósfera de serenidad total.", icon: <BedDouble size={24} strokeWidth={1}/> },
                { label: "2 Hab. Dobles", sub: "Espacios de descanso contemporáneo diseñados para el confort absoluto de tus invitados.", icon: <Waves size={24} strokeWidth={1}/> },
                { label: "2.5 Baños de Lujo", sub: "Dos baños completos con acabados premium y un medio baño social para mayor comodidad.", icon: <Droplets size={24} strokeWidth={1}/> },
                { label: "Cocina Pro", sub: "Equipada con barra de autor, ideal para cenas íntimas o experiencias culinarias privadas.", icon: <Utensils size={24} strokeWidth={1}/> }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="flex gap-6 items-start group">
                  <div className="opacity-30 group-hover:opacity-100 transition-opacity text-sunset shrink-0">{item.icon}</div>
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

      {/* 3. LA RESIDENCIA (BENTO GRID RESPONSIVO) --- */}
      <section id="residencia" className="py-24 md:py-32 bg-[#F7F5F0]">
        <div className="container mx-auto px-6 md:px-8 text-palm">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 border-b border-palm/10 pb-12">
            <motion.div variants={revealVar} initial="hidden" whileInView="visible" viewport={{ once: true }}>
               <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block mb-4 font-bold">02 / Portfolio Visual</span>
               <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter uppercase font-black">La Residencia</h2>
            </motion.div>
            <div className="flex flex-wrap gap-6 md:gap-10 text-[9px] uppercase tracking-widest font-black opacity-40 mt-8 md:mt-0 relative z-20">
              {['todos', 'habitaciones', 'exteriores', 'comunes'].map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`hover:opacity-100 cursor-pointer transition-all ${filter === cat ? 'opacity-100 border-b-2 border-palm pb-1' : ''}`}>{cat}</button>
              ))}
            </div>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 relative z-10">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, i) => (
                <motion.div layout key={img.id} onClick={() => setSelectedImage(img)} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }} className={`relative overflow-hidden cursor-zoom-in group bg-palm shadow-xl ${i === 0 ? 'md:col-span-8 h-[50vh] md:h-[75vh]' : 'md:col-span-4 h-[50vh] md:h-[75vh]'}`}>
                  <img src={img.url} className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" alt={img.title} />
                  <div className="absolute inset-0 bg-palm/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[10px] uppercase tracking-[0.5em] font-black border border-white/30 px-8 py-3 backdrop-blur-md">Explorar</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. EL DESTINO --- */}
      <section id="destino" className="py-24 md:py-48 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-5xl mb-24 md:mb-32">
            <motion.span variants={revealVar} initial="hidden" whileInView="visible" className="text-[10px] uppercase tracking-[0.6em] text-sunset block mb-10 font-bold">03 / El Destino</motion.span>
            <motion.h2 variants={revealVar} initial="hidden" whileInView="visible" className="font-serif text-5xl md:text-[8.5rem] italic leading-[1.1] md:leading-[0.85] uppercase font-black">Un paraíso <br /><span className="font-light text-white/40 italic">virgen para el</span> <br /><span className="underline decoration-sunset/30 underline-offset-20">alma libre.</span></motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 font-sans">
            {[
              { title: "Conectividad Global", icon: <Plane size={32} strokeWidth={0.5} />, text: "A solo 5 minutos del Aeropuerto Internacional, tu llegada a la residencia es inmediata. Puerto Escondido está más cerca de lo que imaginas." },
              { title: "Bacocho Zone", icon: <ShieldCheck size={32} strokeWidth={0.5} />, text: "Ubicada en la joya de la corona: Bacocho. Una zona residencial pacífica, vigilada y exclusiva, alejada del bullicio pero cerca de todo." },
              { title: "Ecosistema Salvaje", icon: <SunMedium size={32} strokeWidth={0.5} />, text: "Vive la magia de la liberación de tortugas marinas y la bioluminiscencia en Manialtepec. Naturaleza en estado puro." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }} className="space-y-8 group">
                <div className="text-sunset opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</div>
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
          <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block mb-4 font-bold">04 / Experiencias</span>
          <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter uppercase font-black mb-24 md:mb-32">Puerto Vibes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
            {[
              { title: "Cultura & Beats", text: "Desde la mixología refinada en Bacocho hasta el ambiente vibrante de Zicatela y los atardeceres techno en La Punta. Puerto nunca duerme.", icon: <Music size={24}/> },
              { title: "Gastronomía", text: "Disfruta de la pesca del día en cenas de autor frente al mar o el aroma del café de altura oaxaqueño en el mercado tradicional.", icon: <Martini size={24}/> },
              { title: "Aventura", text: "Surf de clase mundial en Carrizalillo, avistamiento de ballenas y paseos privados en yate hacia el horizonte infinito del Pacífico.", icon: <Compass size={24}/> }
            ].map((item, i) => (
              <div key={i} className="group border-t border-palm/10 pt-16 flex flex-col items-center">
                <div className="mb-10 text-sunset opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700">{item.icon}</div>
                <h3 className="font-serif text-3xl italic mb-6 uppercase font-black">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light max-w-xs mb-8 font-sans italic">{item.text}</p>
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-black group-hover:text-sunset transition-colors">Descubrir <ChevronRight size={14} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. UBICACIÓN PRIVILEGIADA (MOBILE OPTIMIZED) --- */}
<section id="ubicacion" className="py-20 md:py-48 bg-[#FBFBF9] border-t border-palm/5 overflow-hidden">
  <div className="container mx-auto px-6 md:px-8 flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-32 items-center text-palm relative z-10">
    
    {/* Texto de ubicación */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }} 
      viewport={{ once: true }}
      className="w-full text-left"
    >
      <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block mb-6 font-sans font-bold">05 / Contacto</span>
      <h2 className="text-5xl md:text-8xl font-serif mb-8 italic tracking-tighter uppercase font-black leading-tight">
        Ubicación <br className="hidden md:block" /> Privilegiada
      </h2>
      
      <div className="space-y-8 text-sm font-light text-gray-500 font-sans">
        <div className="border-l-2 border-sunset pl-6">
          <p className="text-palm tracking-[0.2em] uppercase text-xs font-black mb-2">Montealban 18, Fracc. Bacocho</p>
          <p className="max-w-md font-light italic text-gray-400 leading-relaxed">
            Situada a pasos del santuario de tortugas marinas y de la serenidad absoluta de Playa Coral. El equilibrio perfecto entre aislamiento y cercanía.
          </p>
        </div>
        
        <div className="pt-4">
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=Montealban+18+Bacocho+Puerto+Escondido" 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-3 border border-palm/20 px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-black hover:bg-palm hover:text-white transition-all w-full md:w-auto justify-center"
          >
            <MapPin size={14} /> Trazar Ruta en Maps
          </a>
        </div>
      </div>
    </motion.div>

    {/* El Mapa - Altura ajustada para móvil */}
    <div className="w-full h-87.5 md:h-[75vh] grayscale hover:grayscale-0 transition-all duration-1000 shadow-xl rounded-sm overflow-hidden border border-palm/5">
       <iframe 
         src="https://maps.google.com/maps?q=[ADDRESS]&output=embed4" 
         width="100%" 
         height="100%" 
         style={{ border: 0 }} 
         allowFullScreen="" 
         loading="lazy" 
       />
    </div>
  </div>
</section>

      {/* --- LIGHTBOX (Z-200) --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-200 bg-white/98 flex items-center justify-center p-6 md:p-12 cursor-zoom-out text-palm uppercase font-black tracking-tighter italic">
            <button className="absolute top-8 right-8 p-4 opacity-40 hover:opacity-100 transition-opacity"><X size={32} /></button>
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="text-center max-w-5xl">
                <img src={selectedImage.url} className="w-full shadow-2xl mb-8 md:mb-12 border border-palm/5" alt={selectedImage.title} />
                <p className="font-serif text-2xl md:text-4xl italic">{selectedImage.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="py-24 md:py-32 bg-white border-t border-palm/5 text-palm text-center relative z-10">
        <div className="container mx-auto px-8">
          <div className="flex justify-center gap-12 md:gap-16 mb-16 md:mb-20 opacity-20 hover:opacity-100 transition-all duration-500">
            <a href="https://www.instagram.com/casadonjose_ptoescondido/" target="_blank" rel="noreferrer"><FaInstagram size={32} /></a>
            <button onClick={handleBooking} className="cursor-pointer"><FaWhatsapp size={32} /></button>
          </div>
          <p className="text-[9px] uppercase tracking-[0.8em] opacity-30 font-black italic">CDJ • 2026 • Private Residence</p>
        </div>
      </footer>
    </div>
  );
}

export default App;