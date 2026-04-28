export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
          Técnica en Programación de Software
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Forma profesionales competentes en el desarrollo de software moderno.
          Aprende desde lo básico hasta técnicas avanzadas con experiencia práctica.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contacto"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Inscríbete Ahora
          </a>
          <a
            href="#sobre"
            className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            Saber Más
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">+500</div>
            <div className="text-gray-600 mt-2">Estudiantes</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">15+</div>
            <div className="text-gray-600 mt-2">Cursos</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <div className="text-gray-600 mt-2">Empleabilidad</div>
          </div>
        </div>
      </div>
    </section>
  );
}
