import { Instagram, Phone, MapPin, ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-light tracking-wide mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Maria Flor
            </h3>
            <p className="text-white/50 font-light text-sm leading-relaxed">
              Floricultura e ateliê floral em Ipatinga, MG.
              Criando arranjos e decorações que transformam
              momentos em memórias.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              Menu
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Sobre', href: '#sobre' },
                { label: 'Serviços', href: '#servicos' },
                { label: 'Portfólio', href: '#portfolio' },
                { label: 'Localização', href: '#localizacao' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/60 text-sm font-light hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              Institucional
            </h4>
            <ul className="space-y-3">
              {[
                'Política de Privacidade',
                'Política de Segurança',
                'Termos de Uso',
                'Perguntas Frequentes',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 text-sm font-light hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              Contato
            </h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              <li className="flex items-center gap-3">
                <Phone size={14} strokeWidth={1} className="shrink-0 text-white/40" />
                <span>(31) 99696-4905</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} strokeWidth={1} className="mt-1 shrink-0 text-white/40" />
                <span>
                  Av. João Valentim Pascoal, 132<br />
                  Centro, Ipatinga - MG
                </span>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.instagram.com/mariaflor_ipatinga/"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                >
                  <Instagram size={16} strokeWidth={1} />
                  <span>@mariaflor_ipatinga</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs tracking-wider" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
            © {new Date().getFullYear()} Maria Flor — Todos os direitos reservados
          </p>
          <a
            href="#hero"
            className="text-white/30 text-xs tracking-[0.2em] uppercase hover:text-white/60 transition-colors duration-300 flex items-center gap-2"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            Voltar ao topo
            <ArrowUp size={12} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  )
}