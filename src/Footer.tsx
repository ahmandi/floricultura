import { Mail, Phone, MapPin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#175D49] text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Institucional */}
        <div>
          <h3 className="font-semibold text-lg mb-4">INSTITUCIONAL</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Sobre a Empresa</a></li>
            <li><a href="#" className="hover:underline">Política de Privacidade</a></li>
            <li><a href="#" className="hover:underline">Política de Segurança</a></li>
            <li><a href="#" className="hover:underline">Política de Garantia</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">SUPORTE</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Pagamentos</a></li>
            <li><a href="#" className="hover:underline">Cancelamentos</a></li>
            <li><a href="#" className="hover:underline">Perguntas Frequentes</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="font-semibold text-lg mb-4">CONTATO</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> (31) 99696-4905
            </li>
            {/* <li className="flex items-center gap-2">
              <Mail size={16} /> atendimento@atelierflores.com.br
            </li> */}
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-1" /> 
              Av. João Valentim Pascoal, 132 <br />
              Centro, Ipatinga - MG, 35160-002
            </li>
            <li>
              <a href="https://www.instagram.com/mariaflor_ipatinga/" className="inline-block hover:opacity-80">
                <Instagram size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
