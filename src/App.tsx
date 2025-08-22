import Logo from './assets/logo-sm.png'
import entradaBackground from './assets/entrada.jpeg'
import interior from './assets/interiormariaflor.png'
import buque from './assets/bluetterflies.png'
import vaso from './assets/vasojardim.png'
import evento from './assets/evento.png'
import bannerNoiva from './assets/3-min.png'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import ContactIcon from './assets/contact.svg';

import '../node_modules/swiper/swiper.min.css';
import Footer from './Footer'

function App() {

  return (
    <div className="min-h-screen flex flex-col font-sans text-green-900">

      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md shadow-md z-20">
        
        <div
          className="w-full"
          style={{ backgroundColor: "#175D49" }}
        >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-around items-center gap-4 py-2 text-white text-sm font-medium">
            <div className="flex items-center gap-2">
              <span role="img" aria-label="truck">🚚</span>
              <span className="">Entrega expressa: entrega até as 18h</span>
            </div>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="card" className="mb-[1px]">💳</span>
              <span>Parcelamento em até 2x sem juros</span>
            </div>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="shield">📱</span>
              <span className="">Compras também pelo WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <nav className="flex justify-around items-center w-full space-x-6 text-green-700 font-medium">
            <div className="">
              <img className="h-16 w-auto" src={Logo} />
            </div>
            <div className='flex gap-12 text-lg'>
              <a href="#hero" className="hover:text-green-900">Home</a>
              <a href="#sobre" className="hover:text-green-900">Sobre</a>
              <a href="#servicos" className="hover:text-green-900">Serviços</a>
              <a href="#localizacao" className="hover:text-green-900">Localização</a>
            </div>
            <a href="#contato" className="hover:text-green-900 flex items-center gap-1">
              {/* Ícone headset SAC */}
              <img src={ContactIcon} alt="Contato" className="h-10 w-10 inline-block" />
              <div className='flex flex-col'>
                <span>Atendimento</span>
                <span>(31) 99696-4905</span>
              </div>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="w-full relative flex items-center justify-center h-screen bg-cover bg-center"
      >
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          className="absolute inset-0 h-full w-full"
        >
          <SwiperSlide>
            <img
              src={entradaBackground}
              alt="Entrada"
              className="object-cover w-full h-full"
            />
            {/*
            <div className="absolute inset-0 bg-green-900/50"></div>
             <div className="relative text-center px-6 z-10">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-lg mb-4">
                Maria Flor
              </h2>
              <p className="text-lg md:text-xl text-green-100 mb-8 drop-shadow">
                Flores frescas e arranjos personalizados para todas as ocasiões
              </p>
            </div> */}
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={interior}
              alt="Interior"
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={bannerNoiva}
              alt="Banner Noiva"
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="w-full bg-green-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className='flex flex-row items-center mb-12 gap-4'>
            <img className="h-16 w-auto" src={Logo} />
            <h3 className="text-3xl font-serif font-bold text-green-800">Nossos Serviços</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className=" p-6 rounded-lg shadow hover:shadow-lg transition">
              <img src={buque} alt="Buquê" className="rounded mb-4" />
              <h4 className="text-xl font-medium text-green-700 mb-2">Buquês Personalizados</h4>
              <p className="text-green-600">Crie o buquê ideal com flores frescas e cores à sua escolha.</p>
            </div>
            <div className=" p-6 rounded-lg shadow hover:shadow-lg transition">
              <img src={evento} alt="Evento" className="rounded mb-4" />
              <h4 className="text-xl font-medium text-green-700 mb-2">Decoração de Eventos</h4>
              <p className="text-green-600">Traga elegância e perfume para casamentos, festas e confraternizações.</p>
            </div>
            <div className=" p-6 rounded-lg shadow hover:shadow-lg transition">
              <img src={vaso} alt="Plantas" className="rounded mb-4" />
              <h4 className="text-xl font-medium text-green-700 mb-2">Plantas & Jardinagem</h4>
              <p className="text-green-600">Seleção de plantas ornamentais e dicas de cultivo para seu espaço verde.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="w-full  py-20">
        <div className='container mx-auto px-6 text-center'>
          <div className='flex flex-row items-center mb-12 gap-4'>
            <img className="h-16 w-auto" src={Logo} />
            <h3 className="text-3xl font-serif font-bold text-green-800">Sobre Nós</h3>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <img
            src={interior}
            alt="Interior da floricultura"
            className="w-full md:w-1/3 max-w-sm rounded-lg shadow-lg"
          />
            <div className="md:w-1/2">
            <p className="text-green-700 leading-relaxed mb-4">
              Na Maria Flor, dedicamo-nos a transformar momentos em memórias inesquecíveis. Com flores selecionadas
              diariamente e arranjos artesanais, oferecemos o toque perfeito para celebrar amor, amizade e conquistas.
            </p>
            <p className="text-green-700 leading-relaxed">
              Nossa paixão pela natureza e compromisso com a qualidade garantem um atendimento personalizado e produtos que
              encantam e duram. Venha nos visitar ou faça seu pedido online!</p>
          </div>
        </div>
      </section>

      <div className='container mx-auto px-6 text-center'>
        <img src={bannerNoiva} alt="Logo Maria Flor" className="mx-auto my-8 h-auto w-auto" />
      </div>

      {/* Localização Section */}
      <section id="localizacao" className="container mx-auto px-6 py-20">
        <div className='flex flex-row items-center mb-12 gap-4'>
          <img className="h-16 w-auto" src={Logo} />
          <h3 className="text-3xl font-serif font-bold text-green-800">Como Chegar</h3>
        </div>
        <div className="aspect-video rounded-lg shadow">
          <iframe
            title="Mapa da Floricultura"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.455033985166!2d-42.525495199999995!3d-19.479049300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb000420e11f849%3A0x93652ec6022392eb!2sMaria%20Flor!5e0!3m2!1spt-BR!2sbr!4v1753731458409!5m2!1spt-BR!2sbr" // coloque seu embed link real
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default App
