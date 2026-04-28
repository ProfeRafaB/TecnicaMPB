export default function Malla() {
  const semestres = [
    {
      numero: "Semestre 1",
      materias: [
        "Lógica de Programación",
        "Matemáticas Discretas",
        "Introducción a la Informática",
        "Inglés Técnico",
      ],
    },
    {
      numero: "Semestre 2",
      materias: [
        "Programación Orientada a Objetos",
        "Estructuras de Datos",
        "Álgebra Lineal",
        "Comunicación Empresarial",
      ],
    },
    {
      numero: "Semestre 3",
      materias: [
        "Desarrollo Web Frontend",
        "Bases de Datos",
        "Sistemas Operativos",
        "Ética Profesional",
      ],
    },
    {
      numero: "Semestre 4",
      materias: [
        "Desarrollo Web Backend",
        "Ingeniería de Software",
        "Redes y Seguridad",
        "Emprendimiento",
      ],
    },
  ];

  return (
    <section id="malla" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Malla Curricular</h2>
          <p className="text-xl text-gray-600">
            Estructura de materias por semestre
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {semestres.map((semestre, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {semestre.numero}
              </h3>
              <ul className="space-y-2">
                {semestre.materias.map((materia, i) => (
                  <li
                    key={i}
                    className="p-3 bg-white rounded border-l-4 border-blue-600"
                  >
                    {materia}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
