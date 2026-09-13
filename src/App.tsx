import { useEffect, useRef, useState } from 'react'
import Logo from './assets/logo-sm.webp'
import fachada from './assets/fachada.jpg'
import buque from './assets/bluetterflies.jpg'
import buquePersonalizado from './assets/buque_personalizado.jpg'
import jardinagem from './assets/flor_8.jpg'
import cesta from './assets/cesta_3.jpg'
import bannerNoiva from './assets/buquenoiva.jpg'
import heroVideoMp4 from './assets/hero.mp4'
import heroVideoMobile from './assets/hero-mobile.mp4'
import heroPoster from './assets/hero-poster.jpg'
import logoVideo from './assets/logo_video_svg.svg'

import { Menu, X, Instagram, Phone, MapPin, Mail, ArrowUp, ChevronDown, Truck } from 'lucide-react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import Footer from './Footer'
import PanImage from './PanImage'

// Catálogo: cada categoria carrega todas as fotos com o prefixo, em ordem numérica (buques_2 antes de buques_10)
const toGallery = (files: Record<string, string>) =>
  Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src)

const catalogoCategorias = [
  {
    nome: 'Buquês',
    fotos: toGallery(import.meta.glob<string>('./assets/buques_*.jpg', { eager: true, import: 'default' })),
  },
  {
    nome: 'Flores e Vasos',
    fotos: toGallery({
      ...import.meta.glob<string>('./assets/flor_*.jpg', { eager: true, import: 'default' }),
      ...import.meta.glob<string>('./assets/vaso_*.jpg', { eager: true, import: 'default' }),
    }),
  },
  {
    nome: 'Presentes',
    fotos: toGallery(import.meta.glob<string>('./assets/presente_*.jpg', { eager: true, import: 'default' })),
  },
  {
    nome: 'Cestas',
    fotos: toGallery(import.meta.glob<string>('./assets/cesta_*.jpg', { eager: true, import: 'default' })),
  },
]

function WhatsAppIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 110.7L8 480l117.7-30.9c32 17.5 68.1 26.7 104.9 26.7h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-74.9-156.7zM223.9 438.6c-32.7 0-64.6-8.8-92.3-25.4l-6.6-3.9-68.7 18 18.3-66.9-4.3-6.9c-18.2-29-27.8-62.5-27.8-96.9 0-100.4 81.7-182.1 182.5-182.1 48.8 0 94.6 19 129.1 53.6 34.5 34.5 56 80.3 55.9 129.1-.1 100.4-83.9 181.5-184.1 181.5zm101-135.7c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.7-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.4-9.7-1.3-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.6 19.2-19.6 46.8 0 27.6 20 54.3 22.8 58 2.8 3.7 38.5 58.8 93.4 80.2 46.5 18 56 14.4 66.1 13.5 10.1-.9 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.4-5-3.8-10.5-6.6z" />
    </svg>
  )
}

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
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <div className={`menu-overlay fixed inset-0 z-50 bg-green-900/95 backdrop-blur-md flex flex-col items-center justify-center ${isOpen ? 'open' : ''}`}>
      <button onClick={onClose} aria-label="Fechar menu" className="absolute top-8 right-8 text-white hover:opacity-70 transition">
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
        <a href="https://www.instagram.com/mariaflor_ipatinga/" aria-label="Instagram da Maria Flor" className="hover:text-white transition">
          <Instagram size={20} strokeWidth={1} />
        </a>
        <a href="https://wa.me/5531996964905" aria-label="WhatsApp da Maria Flor" className="hover:text-white transition">
          <Phone size={20} strokeWidth={1} />
        </a>
      </div>
    </div>
  )
}

const CATALOGO_ROWS = 3
// Abaixo disso (por fileira), dividir a categoria deixaria fileiras com uma ou duas fotos repetidas
const MIN_PHOTOS_PER_ROW = 4
const CATEGORY_INTERVAL = 7000
// O Swiper em loop precisa de slides suficientes para cobrir a largura; fileiras curtas repetem as fotos
const MIN_SLIDES = 8

function CatalogoRow({ title, photos, reverse = false }: { title: string; photos: string[]; reverse?: boolean }) {
  const slides = [...photos]
  while (slides.length < MIN_SLIDES) slides.push(...photos)

  return (
    <div className="catalogo-fade mt-8 first:mt-0">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={16}
        loop
        grabCursor
        speed={800}
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true, reverseDirection: reverse }}
      >
        {slides.map((src, i) => (
          <SwiperSlide key={`${i}-${src}`} className="!w-64 md:!w-80">
            <PanImage
              src={src}
              alt={`${title} ${(i % photos.length) + 1}`}
              loading="lazy"
              className="block w-full h-[360px] md:h-[450px] rounded-sm"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

function Catalogo() {
  const [active, setActive] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [hovering, setHovering] = useState(false)

  // Troca a categoria sozinha; pausa com o mouse sobre as fotos e para de vez quando a pessoa interage
  useEffect(() => {
    if (!autoRotate || hovering) return
    const id = setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % catalogoCategorias.length)
    }, CATEGORY_INTERVAL)
    return () => clearInterval(id)
  }, [autoRotate, hovering])

  const categoria = catalogoCategorias[active]
  const { fotos } = categoria
  // Com fotos suficientes, cada fileira recebe fotos diferentes (1ª, 4ª, 7ª... na primeira, e assim por diante).
  // Com poucas, todas as fileiras mostram todas as fotos, começando de pontos diferentes para não alinharem.
  const rows =
    fotos.length >= CATALOGO_ROWS * MIN_PHOTOS_PER_ROW
      ? Array.from({ length: CATALOGO_ROWS }, (_, r) => fotos.filter((_src, i) => i % CATALOGO_ROWS === r))
      : fotos.length === 0
        ? []
        : Array.from({ length: CATALOGO_ROWS }, (_, r) => {
            const start = Math.round((r * fotos.length) / CATALOGO_ROWS)
            return [...fotos.slice(start), ...fotos.slice(0, start)]
          })

  const selectCategory = (i: number) => {
    setActive(i)
    setAutoRotate(false)
  }

  return (
    <>
      <div className="text-center mb-16">
        <p className="reveal subtitle-track text-green-700 mb-4">Nosso trabalho</p>
        <h2 className="reveal delay-1 editorial-title text-3xl md:text-5xl lg:text-6xl text-green-900">
          <span key={categoria.nome} className="catalogo-fade inline-block">
            {categoria.nome}
          </span>
        </h2>
        <div className="reveal delay-2 separator mx-auto mt-8" />
        <div role="tablist" aria-label="Categorias do catálogo" className="reveal delay-2 mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {catalogoCategorias.map((c, i) => (
            <button
              key={c.nome}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => selectCategory(i)}
              className={`subtitle-track transition-colors duration-300 underline-offset-8 decoration-1 ${i === active ? 'text-green-900 underline' : 'text-green-700 hover:text-green-900'}`}
            >
              {c.nome}
            </button>
          ))}
        </div>
      </div>

      <div
        className="reveal"
        onPointerDown={() => setAutoRotate(false)}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        {rows.map((fotos, r) => (
          <CatalogoRow key={`${categoria.nome}-${r}`} title={categoria.nome} photos={fotos} reverse={r === 1} />
        ))}
      </div>
    </>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const noivaImgRef = useRef(null)
  const mensagem = encodeURIComponent(
          "Olá! Vim pelo site da floricultura e gostaria de realizar um pedido."
        );

  useScrollReveal()

  useParallax(noivaImgRef, 0.15, 50, -30)

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
              width={59}
              height={64}
              className={`transition-all duration-500 h-16 w-auto ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
          </a>

          <nav className="hidden md:flex items-center gap-10">
            <a href="#sobre" className={`nav-link ${scrolled ? 'text-green-800' : 'text-white'}`}>Sobre</a>
            <a href="#servicos" className={`nav-link ${scrolled ? 'text-green-800' : 'text-white'}`}>Serviços</a>
            <a href="#catalogo" className={`nav-link ${scrolled ? 'text-green-800' : 'text-white'}`}>Catálogo</a>
            <a href="#localizacao" className={`nav-link ${scrolled ? 'text-green-800' : 'text-white'}`}>Localização</a>
            <a href="#contato" className={`nav-link ${scrolled ? 'text-green-800' : 'text-white'}`}>Contato</a>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className={`md:hidden transition ${scrolled ? 'text-green-800' : 'text-white'}`}
          >
            <Menu size={26} strokeWidth={1} />
          </button>
        </div>
      </header>

      {/* clip-path recorta o vídeo fixo: ele fica parado e o conteúdo rola por cima */}
      <section id="hero" className="relative h-svh w-full overflow-hidden bg-black [clip-path:inset(0)]">
        {/* Poster também como <img>: o navegador prioriza o download e mede o carregamento (LCP) por ele.
            O vídeo fica por cima e cobre a imagem quando começa a tocar. */}
        <img
          src={heroPoster}
          alt=""
          fetchPriority="high"
          className="fixed inset-0 h-svh w-full object-cover"
        />
        <video
          className="fixed inset-0 h-svh w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          aria-hidden="true"
        >
          {/* No celular, versão em 540p (3,8 MB em vez de 7,4 MB) */}
          <source media="(max-width: 767px)" src={heroVideoMobile} type="video/mp4" />
          <source src={heroVideoMp4} type="video/mp4" />
        </video>

        {/* Filtro escuro */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <h1 className="hero-text-animate w-[85vw] md:w-[70vw] max-w-5xl">
            <img src={logoVideo} alt="Maria Flor Floricultura" width={1062} height={277} className="w-full h-auto brightness-0 invert" />
          </h1>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 animate-bounce">
          <ChevronDown size={24} strokeWidth={1} />
        </div>
      </section>

      <section className="py-28 md:py-36 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="reveal subtitle-track text-green-700 mb-6">Bem-vindos</p>
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
                src={fachada}
                alt="Entrada da floricultura Maria Flor"
                loading="lazy"
                decoding="async"
                className="w-full h-[500px] md:h-[650px] object-cover"
              />
            </div>

            {/* Text */}
            <div className="reveal-right">
              <p className="subtitle-track text-green-700 mb-4">Sobre Nós</p>
              <h2 className="editorial-title text-3xl md:text-5xl text-green-900 mb-8 leading-tight">
                Arte, natureza e<br />
                <em className="italic font-light">paixão pelas flores</em>
              </h2>
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

      {/* Faixa decorativa: texto via CSS (deco-text) para não entrar na leitura de tela nem na checagem de contraste */}
      <div className="overflow-hidden py-10 border-y border-green-200" aria-hidden="true">
        <div className="marquee-track whitespace-nowrap flex items-center gap-12">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              {['Buquês', 'Decoração', 'Eventos', 'Jardinagem', 'Casamentos', 'Arranjos'].flatMap((word) => [
                <span key={word} className="deco-text editorial-title text-4xl md:text-6xl text-green-800/20" data-text={word} />,
                <span key={`${word}-sep`} className="deco-text text-green-600/30" data-text="✦" />,
              ])}
            </span>
          ))}
        </div>
      </div>

      <section id="servicos" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="reveal subtitle-track text-green-700 mb-4">O que fazemos</p>
            <h2 className="reveal delay-1 editorial-title text-3xl md:text-5xl lg:text-6xl text-green-900">
              Nossos Serviços
            </h2>
            <div className="reveal delay-2 separator mx-auto mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            <div className="reveal delay-1 group relative overflow-hidden rounded-sm md:row-span-2">
              <img
                src={buquePersonalizado}
                alt="Buquês Personalizados"
                width={1200}
                height={1600}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p className="subtitle-track text-white/70 mb-3">01</p>
                <h3 className="editorial-title text-2xl md:text-4xl text-white mb-3">
                  Buquês Personalizados
                </h3>
                <p className="text-white/70 font-light text-sm md:text-base max-w-md">
                  Crie o buquê ideal com flores frescas e cores à sua escolha.
                  Cada arranjo é único, feito com carinho e atenção aos detalhes.
                </p>
              </div>
            </div>

            <div className="reveal delay-2 group relative overflow-hidden rounded-sm md:min-h-[350px]">
              <PanImage
                src={cesta}
                alt="Cestas decoradas"
                restPosition="center 85%"
                loading="lazy"
                className="w-full h-[350px] md:absolute md:inset-0 md:h-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-900/70 via-transparent to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-8">
                <p className="subtitle-track text-white/70 mb-3">02</p>
                <h3 className="editorial-title text-2xl md:text-3xl text-white mb-2">
                  Cestas decoradas
                </h3>
                <p className="text-white/70 font-light text-sm max-w-sm">
                  Cestas feitas com carinho e sob medida para cada cliente.
                </p>
              </div>
            </div>

            <div className="reveal delay-3 group relative overflow-hidden rounded-sm md:min-h-[350px]">
              <PanImage
                src={jardinagem}
                alt="Plantas & Jardinagem"
                loading="lazy"
                className="w-full h-[350px] md:absolute md:inset-0 md:h-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-900/70 via-transparent to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-8">
                <p className="subtitle-track text-white/70 mb-3">03</p>
                <h3 className="editorial-title text-2xl md:text-3xl text-white mb-2">
                  Plantas & Jardinagem
                </h3>
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
          <img src={buque} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="reveal">
            <span
              aria-hidden="true"
              className="deco-text quote-mark relative inline-block"
              data-text="“"
              style={{ position: 'relative', top: 0, left: 0, opacity: 0.2 }}
            />
            <blockquote className="editorial-title text-2xl md:text-4xl lg:text-5xl text-white/90 leading-snug mt-[-2rem]">
              Você colocou seu coração na nossa visão…
              <em className="italic font-light block mt-2">
                Tudo ficou ainda mais lindo do que sonhamos.
              </em>
            </blockquote>
            <div className="separator bg-white/30 mx-auto mt-10 mb-6" />
            <p className="subtitle-track text-white/70">— Cliente Maria Flor</p>
          </div>
        </div>
      </section>

      <section id="catalogo" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Catalogo />
        </div>
      </section>

      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          ref={noivaImgRef}
          src={bannerNoiva}
          alt="Banner"
          loading="lazy"
          decoding="async"
          className="parallax-img w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/30 to-green-900/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="reveal subtitle-track text-white/70 mb-4">
            Tem a visão mas não tem tempo?
          </p>
          <h2 className="reveal delay-1 editorial-title text-3xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
            Nós cuidamos de cada detalhe para você.
          </h2>
          <a href="#contato" className="reveal delay-2 btn-elegant btn-elegant-light mt-10">
            Fale conosco
          </a>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            <div className="reveal-left order-2 md:order-1">
              <p className="subtitle-track text-green-700 mb-4">Como trabalhamos</p>
              <h2 className="editorial-title text-3xl md:text-5xl text-green-900 mb-8 leading-tight">
                Seus arranjos devem
                <em className="italic font-light block">
                  contar a sua história.
                </em>
              </h2>
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
                    <span aria-hidden="true" className="deco-text editorial-title text-3xl text-green-600/40" data-text={step.num} />
                    <div>
                      <h3 className="font-medium text-green-800 mb-1">{step.title}</h3>
                      <p className="text-green-700 font-light text-sm">{step.desc}</p>
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
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[500px] md:h-[700px] object-cover"
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
              { icon: '🚚', title: 'Entrega Expressa', desc: 'Entrega até as 18h — receba em até 2h.' },
              { icon: '💳', title: 'Formas de Pagamento', desc: 'Crédito, débito, desconto em grandes compras à vista.' },
              { icon: '📱', title: 'WhatsApp', desc: 'Compre também pelo WhatsApp de forma prática e rápida.' },
            ].map((item, i) => (
              <div key={i} className={`reveal delay-${i + 1} flex flex-col items-center`}>
                <span className="text-3xl mb-4">{item.icon}</span>
                <h3 className="subtitle-track text-green-800 mb-2 text-xs">{item.title}</h3>
                <p className="text-green-700 font-light text-sm max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="localizacao" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <p className="subtitle-track text-green-700 mb-4">Visite-nos</p>
              <h2 className="editorial-title text-3xl md:text-5xl text-green-900 mb-8 leading-tight">
                Como Chegar
              </h2>
              <div className="separator mb-8" />
              <div className="space-y-5 text-green-700 font-light">
                <div className="flex items-start gap-3">
                  <Truck size={18} strokeWidth={1} className="mt-1 text-green-600 shrink-0" />
                  <p>Estamos em Ipatinga, entregamos em Ipaba, Timóteo e Coronel Fabriciano</p>
                </div>
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
            <a
              href={`https://wa.me/553196964905?text=${mensagem}`}
              className="btn-elegant inline-block mt-10"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale no WhatsApp
            </a>
            </div>

            <div className="reveal-right">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-lg">
                <iframe
                  title="Mapa da Floricultura"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
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
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="reveal subtitle-track text-white/70 mb-6">Pronta para encantar?</p>
          <h2 className="reveal delay-1 editorial-title text-3xl md:text-5xl lg:text-6xl text-white leading-tight">
            Cada flor conta uma história.
            <em className="italic font-light block mt-2">Qual será a sua?</em>
          </h2>
          <div className="reveal delay-2 separator bg-white/30 mx-auto mt-10 mb-10" />
          <p className="reveal delay-2 text-white/70 font-light mb-10 max-w-lg mx-auto">
            Entre em contato e vamos criar juntas o arranjo perfeito
            para o seu momento especial.
          </p>
            <a
              href={`https://wa.me/553196964905?text=${mensagem}`}
              className="btn-elegant btn-elegant-light inline-block mt-10"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale no WhatsApp
            </a>
        </div>
      </section>

      <Footer />

      {/* ═══ WhatsApp Flutuante ═══ */}
      <a
        href={`https://wa.me/553196964905?text=${mensagem}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale no WhatsApp"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:bg-[#1ebd5a] hover:scale-110"
      >
        <WhatsAppIcon size={28} />
      </a>

      {/* ═══ Back to Top ═══ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
        className={`fixed bottom-24 right-8 z-30 p-3 rounded-full bg-green-800 text-white shadow-lg transition-all duration-500 hover:bg-green-700 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ArrowUp size={18} strokeWidth={1.5} />
      </button>
    </div>
  )
}

export default App