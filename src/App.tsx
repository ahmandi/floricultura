function App() {

  return (
    <div className="min-h-screen flex flex-col font-sans text-green-900">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md shadow-md z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Maria Flor</h1>
          <nav className="space-x-6 text-green-700 font-medium">
            <a href="#hero" className="hover:text-green-900">Home</a>
            <a href="#sobre" className="hover:text-green-900">Sobre</a>
            <a href="#servicos" className="hover:text-green-900">Serviços</a>
            <a href="#localizacao" className="hover:text-green-900">Localização</a>
            <a href="#contato" className="hover:text-green-900">Contato</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="w-full relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?floral,flowers')" }}
      >
        <div className="absolute inset-0 bg-green-900/50"></div>
        <div className="relative text-center px-6">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-lg mb-4">
            Seu Jardim de Encantos
          </h2>
          <p className="text-lg md:text-xl text-green-100 mb-8 drop-shadow">
            Flores frescas e arranjos personalizados para todas as ocasiões
          </p>
          <a
            href="#contato"
            className="inline-block px-8 py-3 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-shadow shadow-md"
          >
            Fale Conosco
          </a>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="w-full bg-white py-20">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <img
            src="src/assets/interiormariaflor.png"
            alt="Interior da floricultura"
            className="w-full md:w-1/3 max-w-sm rounded-lg shadow-lg"
          />
          <div className="md:w-1/2">
            <h3 className="text-3xl font-serif font-bold text-green-800 mb-4">Sobre Nós</h3>
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

      {/* Serviços Section */}
      <section id="servicos" className="w-full bg-green-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-serif font-bold text-green-800 mb-8">Nossos Serviços</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <img src="src/assets/bluetterflies.png" alt="Buquê" className="rounded mb-4" />
              <h4 className="text-xl font-medium text-green-700 mb-2">Buquês Personalizados</h4>
              <p className="text-green-600">Crie o buquê ideal com flores frescas e cores à sua escolha.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <img src="/src/assets/evento.png" alt="Evento" className="rounded mb-4" />
              <h4 className="text-xl font-medium text-green-700 mb-2">Decoração de Eventos</h4>
              <p className="text-green-600">Traga elegância e perfume para casamentos, festas e confraternizações.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <img src="/src/assets/vasojardim.png" alt="Plantas" className="rounded mb-4" />
              <h4 className="text-xl font-medium text-green-700 mb-2">Plantas & Jardinagem</h4>
              <p className="text-green-600">Seleção de plantas ornamentais e dicas de cultivo para seu espaço verde.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Localização Section */}
      <section id="localizacao" className="container mx-auto px-6 py-20">
        <h3 className="text-3xl font-serif font-bold text-green-800 mb-6 text-center">Como Chegar</h3>
        <div className="aspect-video rounded-lg shadow">
          <iframe
            title="Mapa da Floricultura"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.455033985166!2d-42.525495199999995!3d-19.479049300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb000420e11f849%3A0x93652ec6022392eb!2sMaria%20Flor!5e0!3m2!1spt-BR!2sbr!4v1753731458409!5m2!1spt-BR!2sbr" // coloque seu embed link real
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="bg-green-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-serif font-bold text-green-800 mb-4">Entre em Contato</h3>
          <p className="text-green-700 mb-6">Estamos prontos para ouvir você! Envie uma mensagem ou fale no WhatsApp.</p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://wa.me/5531996964905?text=Olá%20Floricultura%20Maria%20Flor!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition"
            >
              Chat no WhatsApp
            </a>

            <a
              href="https://www.instagram.com/mariaflor_ipatinga/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-4 bg-white text-green-600 rounded-full hover:bg-green-200 transition"
              aria-label="Instagram"
            >
              {/* Instagram Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5z"/>
                <path d="M12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7z"/>
                <circle cx="17.5" cy="6.5" r="1.5"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-100 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} Maria Flor. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App
