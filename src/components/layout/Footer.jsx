export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo/About */}
          <div className="animate-fade-in-up">
            <h3 className="text-xl font-bold mb-4">MPB Tech</h3>
            <p className="text-gray-400">
              Técnica en Programación con formación de calidad para el mercado laboral actual.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#inicio" className="hover:text-white transition">Inicio</a></li>
              <li><a href="#sobre" className="hover:text-white transition">Sobre</a></li>
              <li><a href="#niveles" className="hover:text-white transition">Niveles</a></li>
              <li><a href="#malla" className="hover:text-white transition">Malla</a></li>
            </ul>
          </div>

          {/* More Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-lg font-semibold mb-4">Académico</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#proyectos" className="hover:text-white transition">Proyectos</a></li>
              <li><a href="#contacto" className="hover:text-white transition">Contacto</a></li>
              <li><a href="#" className="hover:text-white transition">Políticas</a></li>
              <li><a href="#" className="hover:text-white transition">Términos</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📧 info@mpatech.com</li>
              <li>📱 +57 (1) 1234-5678</li>
              <li>📍 Bogotá, Colombia</li>
              <li>🕐 L-V: 8am - 5pm</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} I.E Misael Pastrana Borrero. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
