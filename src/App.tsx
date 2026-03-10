import { useEffect, useRef, useState } from 'react'
import Logo from './assets/logo-sm.png'
import entradaBackground from './assets/entrada.jpeg'
import interior from './assets/interiormariaflor.png'
import buque from './assets/bluetterflies.png'
import vaso from './assets/vasojardim.png'
import evento from './assets/evento.png'
import bannerBuque from './assets/bannerbuque1.png'
import bannerNoiva from './assets/buquenoiva.png'


import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import { Menu, X, Instagram, Phone, MapPin, Mail, ArrowUp, ChevronDown } from 'lucide-react'

import Footer from './Footer'

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function useParallax(ref, speed = 0.3, maxOffset = 60, baseOffset = 0) {
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const windowH = window.innerHeight
      if (rect.bottom < 0 || rect.top > windowH) return
      const center = rect.top + rect.height / 2
      const raw = (center - windowH / 2) * speed + baseOffset
      const offset = Math.max(-maxOffset, Math.min(maxOffset, raw))
      ref.current.style.transform = `translateY(${offset}px) scale(1.20)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref, speed, maxOffset, baseOffset])
}

function MobileMenu({ isOpen, onClose }) {
  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <div className={`menu-overlay fixed inset-0 z-50 bg-green-900/95 backdrop-blur-md flex flex-col items-center justify-center ${isOpen ? 'open' : ''}`}>
      <button onClick={onClose} className="absolute top-8 right-8 text-white hover:opacity-70 transition">
        <X size={28} strokeWidth={1} />
      </button>
      <nav className="flex flex-col items-center gap-8">
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-white text-lg tracking-[0.3em] uppercase font-light hover:opacity-70 transition"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="absolute bottom-12 flex gap-6 text-white/60">
        <a href="https://www.instagram.com/mariaflor_ipatinga/" className="hover:text-white transition">
          <Instagram size={20} strokeWidth={1} />
        </a>
        <a href="https://wa.me/5531996964905" className="hover:text-white transition">
          <Phone size={20} strokeWidth={1} />
        </a>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroImgRef = useRef(null)
  const noivaImgRef = useRef(null)
  const buqueImgRef = useRef(null)

  useScrollReveal()

  useParallax(heroImgRef, 0.25, 80)
  useParallax(noivaImgRef, 0.15, 50, -30)
  useParallax(buqueImgRef, 0.45, 50)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="grain-overlay min-h-screen bg-green-50 font-sans text-green-900">
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <header className={`fixed top-0 w-full z-40 transition-all duration-700 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex justify-between items-center">
          <a href="#hero">
            <img
              src={Logo}
              alt="Maria Flor"
              className={`transition-all duration-500 h-16`}
            />
          </a>

          <nav className="hidden md:flex items-center gap-10">
            <a href="#sobre" className={`nav-link ${scrolled ? 'text-green-800' : 'text-white'}`}>Sobre</a>
            <a href="#servicos" className={`nav-link ${scrolled ? 'text-green-800' : 'text-white'}`}>Serviços</a>
            <a href="#portfolio" className={`nav-link ${scrolled ? 'text-green-800' : 'text-white'}`}>Portfólio</a>
            <a href="#localizacao" className={`nav-link ${scrolled ? 'text-green-800' : 'text-white'}`}>Localização</a>
            <a href="#contato" className={`nav-link ${scrolled ? 'text-green-800' : 'text-white'}`}>Contato</a>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`md:hidden transition ${scrolled ? 'text-green-800' : 'text-white'}`}
          >
            <Menu size={26} strokeWidth={1} />
          </button>
        </div>
      </header>

      <section id="hero" className="relative h-screen w-full overflow-hidden">
        <div className="parallax-container absolute inset-0">
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            speed={1200}
            className="h-full w-full"
          >
            <SwiperSlide>
              <img ref={heroImgRef} src={entradaBackground} alt="Entrada" className="parallax-img object-cover w-full h-full scale-110" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={interior} alt="Interior" className="object-cover w-full h-full scale-110" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={bannerBuque} alt="Noiva" className="object-cover w-full h-full scale-110" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-green-900/20 to-green-900/60 z-10" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="subtitle-track text-white/80 mb-6 hero-text-animate">
            Floricultura & Ateliê Floral
          </p>
          <h1 className="editorial-title text-white text-5xl md:text-7xl lg:text-8xl hero-text-animate-delay-1">
            Maria Flor
          </h1>
          <div className="separator bg-white/50 my-8 hero-text-animate-delay-2" />
          <p className="hero-text-animate-delay-2 text-white/80 font-light text-base md:text-lg max-w-lg leading-relaxed">
            Flores frescas, arranjos artesanais e decoração floral
            para transformar seus momentos em memórias inesquecíveis.
          </p>
          <a href="#servicos" className="btn-elegant btn-elegant-light mt-10 hero-text-animate-delay-3">
            Conheça nossos serviços
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 animate-bounce">
          <ChevronDown size={24} strokeWidth={1} />
        </div>
      </section>

      <section className="py-28 md:py-36 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="reveal subtitle-track text-green-600 mb-6">Bem-vindos</p>
          <h2 className="reveal delay-1 editorial-title text-3xl md:text-5xl lg:text-6xl text-green-900 leading-tight">
            Um ateliê floral dedicado a criar
            <em className="italic font-light"> mundos sensoriais </em>
            através da beleza das flores.
          </h2>
          <div className="reveal delay-2 separator mx-auto mt-10" />
        </div>
      </section>

      <section id="sobre" className="pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

            <div className="reveal-left img-zoom rounded-sm overflow-hidden">
              <img
                src={interior}
                alt="Interior da floricultura Maria Flor"
                className="w-full h-[500px] md:h-[650px] object-cover"
              />
            </div>

            {/* Text */}
            <div className="reveal-right">
              <p className="subtitle-track text-green-600 mb-4">Sobre Nós</p>
              <h3 className="editorial-title text-3xl md:text-5xl text-green-900 mb-8 leading-tight">
                Arte, natureza e<br />
                <em className="italic font-light">paixão pelas flores</em>
              </h3>
              <div className="separator mb-8" />
              <p className="text-green-700 leading-relaxed mb-6 font-light">
                Na Maria Flor, dedicamo-nos a transformar momentos em memórias inesquecíveis.
                Com flores selecionadas diariamente e arranjos artesanais, oferecemos o toque
                perfeito para celebrar amor, amizade e conquistas.
              </p>
              <p className="text-green-700 leading-relaxed mb-10 font-light">
                Nossa paixão pela natureza e compromisso com a qualidade garantem um atendimento
                personalizado e produtos que encantam e duram. Cada pétala, cada cor, cada textura
                é escolhida com intenção — para criar algo verdadeiramente especial.
              </p>
              <a href="#servicos" className="btn-elegant">
                Nossos serviços
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden py-10 border-y border-green-200">
        <div className="marquee-track whitespace-nowrap flex items-center gap-12">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="editorial-title text-4xl md:text-6xl text-green-800/20">Buquês</span>
              <span className="text-green-600/30">✦</span>
              <span className="editorial-title text-4xl md:text-6xl text-green-800/20">Decoração</span>
              <span className="text-green-600/30">✦</span>
              <span className="editorial-title text-4xl md:text-6xl text-green-800/20">Eventos</span>
              <span className="text-green-600/30">✦</span>
              <span className="editorial-title text-4xl md:text-6xl text-green-800/20">Jardinagem</span>
              <span className="text-green-600/30">✦</span>
              <span className="editorial-title text-4xl md:text-6xl text-green-800/20">Casamentos</span>
              <span className="text-green-600/30">✦</span>
              <span className="editorial-title text-4xl md:text-6xl text-green-800/20">Arranjos</span>
              <span className="text-green-600/30">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section id="servicos" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="reveal subtitle-track text-green-600 mb-4">O que fazemos</p>
            <h3 className="reveal delay-1 editorial-title text-3xl md:text-5xl lg:text-6xl text-green-900">
              Nossos Serviços
            </h3>
            <div className="reveal delay-2 separator mx-auto mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            <div className="reveal delay-1 img-zoom group relative overflow-hidden rounded-sm md:row-span-2">
              <div className="relative w-full h-[400px] md:h-full">
                <img
                  ref={buqueImgRef}
                  src={buque}
                  alt="Buquês Personalizados"
                  className="parallax-img absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p className="subtitle-track text-white/70 mb-3">01</p>
                <h4 className="editorial-title text-2xl md:text-4xl text-white mb-3">
                  Buquês Personalizados
                </h4>
                <p className="text-white/70 font-light text-sm md:text-base max-w-md">
                  Crie o buquê ideal com flores frescas e cores à sua escolha.
                  Cada arranjo é único, feito com carinho e atenção aos detalhes.
                </p>
              </div>
            </div>

            <div className="reveal delay-2 img-zoom group relative overflow-hidden rounded-sm">
              <img
                src={evento}
                alt="Decoração de Eventos"
                className="w-full h-[350px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="subtitle-track text-white/70 mb-3">02</p>
                <h4 className="editorial-title text-2xl md:text-3xl text-white mb-2">
                  Decoração de Eventos
                </h4>
                <p className="text-white/70 font-light text-sm max-w-sm">
                  Elegância e perfume para casamentos, festas e confraternizações.
                </p>
              </div>
            </div>

            <div className="reveal delay-3 img-zoom group relative overflow-hidden rounded-sm">
              <img
                src={vaso}
                alt="Plantas & Jardinagem"
                className="w-full h-[350px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="subtitle-track text-white/70 mb-3">03</p>
                <h4 className="editorial-title text-2xl md:text-3xl text-white mb-2">
                  Plantas & Jardinagem
                </h4>
                <p className="text-white/70 font-light text-sm max-w-sm">
                  Plantas ornamentais e dicas de cultivo para seu espaço verde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-900 py-28 md:py-36 relative overflow-hidden">

        <div className="absolute inset-0 opacity-5">
          <img src={buque} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="reveal">
            <span className="quote-mark relative inline-block" style={{ position: 'relative', top: 0, left: 0, opacity: 0.2 }}>
              &ldquo;
            </span>
            <blockquote className="editorial-title text-2xl md:text-4xl lg:text-5xl text-white/90 leading-snug mt-[-2rem]">
              Você colocou seu coração na nossa visão…
              <em className="italic font-light block mt-2">
                Tudo ficou ainda mais lindo do que sonhamos.
              </em>
            </blockquote>
            <div className="separator bg-white/30 mx-auto mt-10 mb-6" />
            <p className="subtitle-track text-white/50">— Cliente Maria Flor</p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="reveal subtitle-track text-green-600 mb-4">Nosso trabalho</p>
            <h3 className="reveal delay-1 editorial-title text-3xl md:text-5xl lg:text-6xl text-green-900">
              Portfólio
            </h3>
            <div className="reveal delay-2 separator mx-auto mt-8" />
          </div>

          <div className="reveal-scale gallery-scroll">
            {[entradaBackground, interior, buque, evento, vaso, bannerNoiva].map((img, i) => (
              <div key={i} className="img-zoom rounded-sm overflow-hidden" style={{ minWidth: '320px' }}>
                <img
                  src={img}
                  alt={`Portfólio ${i + 1}`}
                  className="w-80 h-[450px] object-cover"
                />
              </div>
            ))}
          </div>

          {/* Second row - staggered grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {[vaso, entradaBackground, buque, interior, evento, bannerNoiva].map((img, i) => (
              <div key={i} className={`reveal delay-${(i % 4) + 1} img-zoom rounded-sm overflow-hidden`}>
                <img
                  src={img}
                  alt={`Galeria ${i + 1}`}
                  className={`w-full object-cover ${i % 3 === 0 ? 'h-72 md:h-96' : 'h-56 md:h-72'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          ref={noivaImgRef}
          src={bannerNoiva}
          alt="Banner"
          className="parallax-img w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/30 to-green-900/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="reveal subtitle-track text-white/70 mb-4">
            Tem a visão mas não tem tempo?
          </p>
          <h3 className="reveal delay-1 editorial-title text-3xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
            Nós cuidamos de cada detalhe para você.
          </h3>
          <a href="#contato" className="reveal delay-2 btn-elegant btn-elegant-light mt-10">
            Fale conosco
          </a>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            <div className="reveal-left order-2 md:order-1">
              <p className="subtitle-track text-green-600 mb-4">Como trabalhamos</p>
              <h3 className="editorial-title text-3xl md:text-5xl text-green-900 mb-8 leading-tight">
                Seus arranjos devem
                <em className="italic font-light block">
                  contar a sua história.
                </em>
              </h3>
              <div className="separator mb-8" />
              <p className="text-green-700 leading-relaxed mb-6 font-light">
                Começamos com uma conversa — do tipo em que perguntamos demais
                e nos apaixonamos pelos detalhes. Entendemos o que importa para você
                e então criamos algo que é verdadeiramente seu.
              </p>
              <p className="text-green-700 leading-relaxed mb-6 font-light">
                Pesquisamos, selecionamos, cuidamos de cada etapa. Nada é demais
                quando se trata de transformar sua visão em realidade.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  { num: '01', title: 'Conversa Inicial', desc: 'Entendemos seus desejos e a ocasião.' },
                  { num: '02', title: 'Criação & Curadoria', desc: 'Selecionamos as melhores flores e materiais.' },
                  { num: '03', title: 'Produção Artesanal', desc: 'Montamos cada arranjo com carinho e arte.' },
                  { num: '04', title: 'Entrega & Encanto', desc: 'Entregamos a emoção na sua porta.' },
                ].map((step, i) => (
                  <div key={i} className={`reveal delay-${i + 1} flex items-start gap-5`}>
                    <span className="editorial-title text-3xl text-green-600/40">{step.num}</span>
                    <div>
                      <h5 className="font-medium text-green-800 mb-1">{step.title}</h5>
                      <p className="text-green-600 font-light text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-right order-1 md:order-2 relative">
              <div className="img-zoom rounded-sm overflow-hidden">
                <img
                  src={buque}
                  alt="Processo criativo"
                  className="w-full h-[500px] md:h-[700px] object-cover"
                />
              </div>

              <div className="hidden md:block img-zoom absolute -bottom-8 -left-12 w-48 h-64 rounded-sm overflow-hidden shadow-2xl border-4 border-green-50">
                <img
                  src={vaso}
                  alt="Detalhe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-green-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🚚', title: 'Entrega Expressa', desc: 'Entrega até as 18h para pedidos feitos até o meio-dia.' },
              { icon: '💳', title: 'Formas de Pagamento', desc: 'Crédito, débito, desconto em grandes compras à vista.' },
              { icon: '📱', title: 'WhatsApp', desc: 'Compre também pelo WhatsApp de forma prática e rápida.' },
            ].map((item, i) => (
              <div key={i} className={`reveal delay-${i + 1} flex flex-col items-center`}>
                <span className="text-3xl mb-4">{item.icon}</span>
                <h5 className="subtitle-track text-green-800 mb-2 text-xs">{item.title}</h5>
                <p className="text-green-600 font-light text-sm max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="localizacao" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <p className="subtitle-track text-green-600 mb-4">Visite-nos</p>
              <h3 className="editorial-title text-3xl md:text-5xl text-green-900 mb-8 leading-tight">
                Como Chegar
              </h3>
              <div className="separator mb-8" />
              <div className="space-y-5 text-green-700 font-light">
                <div className="flex items-start gap-3">
                  <MapPin size={18} strokeWidth={1} className="mt-1 text-green-600 shrink-0" />
                  <p>
                    Av. João Valentim Pascoal, 132<br />
                    Centro, Ipatinga - MG, 35160-002
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} strokeWidth={1} className="text-green-600 shrink-0" />
                  <p>(31) 99696-4905</p>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram size={18} strokeWidth={1} className="text-green-600 shrink-0" />
                  <a href="https://www.instagram.com/mariaflor_ipatinga/" className="hover:text-green-900 transition">
                    @mariaflor_ipatinga
                  </a>
                </div>
              </div>
              <a href="https://wa.me/5531996964905" className="btn-elegant inline-block mt-10">
                Fale no WhatsApp
              </a>
            </div>

            <div className="reveal-right">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-lg">
                <iframe
                  title="Mapa da Floricultura"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.455033985166!2d-42.525495199999995!3d-19.479049300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb000420e11f849%3A0x93652ec6022392eb!2sMaria%20Flor!5e0!3m2!1spt-BR!2sbr!4v1753731458409!5m2!1spt-BR!2sbr"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="bg-green-900 py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={entradaBackground} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="reveal subtitle-track text-white/60 mb-6">Pronta para encantar?</p>
          <h3 className="reveal delay-1 editorial-title text-3xl md:text-5xl lg:text-6xl text-white leading-tight">
            Cada flor conta uma história.
            <em className="italic font-light block mt-2">Qual será a sua?</em>
          </h3>
          <div className="reveal delay-2 separator bg-white/30 mx-auto mt-10 mb-10" />
          <p className="reveal delay-2 text-white/60 font-light mb-10 max-w-lg mx-auto">
            Entre em contato e vamos criar juntas o arranjo perfeito
            para o seu momento especial.
          </p>
          <a href="https://wa.me/5531996964905" className="reveal delay-3 btn-elegant btn-elegant-light">
            Fale conosco no WhatsApp
          </a>
        </div>
      </section>

      <Footer />

      {/* ═══ Back to Top ═══ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-30 p-3 rounded-full bg-green-800 text-white shadow-lg transition-all duration-500 hover:bg-green-700 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ArrowUp size={18} strokeWidth={1.5} />
      </button>
    </div>
  )
}

export default App