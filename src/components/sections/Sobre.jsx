export default function Sobre() {
  const features = [
    {
      title: "Formación Integral",
      description: "Aprende teoría y práctica en un balance perfecto",
    },
    {
      title: "Instructores Expertos",
      description: "Profesionales con años de experiencia en la industria",
    },
    {
      title: "Proyectos Reales",
      description: "Trabaja en proyectos similares a los del mundo laboral",
    },
    {
      title: "Certificación",
      description: "Obtén un certificado reconocido al finalizar",
    },
    {
      title: "Bolsa de Empleo",
      description: "Conectamos nuestros estudiantes con empresas",
    },
    {
      title: "Actualización Constante",
      description: "Contenido siempre acorde a las últimas tecnologías",
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sobre la Técnica
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proporcionamos una educación de calidad en programación de software,
            formando profesionales preparados para el mercado laboral actual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
