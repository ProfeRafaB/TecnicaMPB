export default function Niveles() {
  const niveles = [
    {
      nombre: "Nivel 1",
      duracion: "6 meses",
      descripcion: "Fundamentos de programación, variables, estructuras básicas",
      materias: ["Lógica de Programación", "HTML/CSS", "JavaScript Básico"],
    },
    {
      nombre: "Nivel 2",
      duracion: "6 meses",
      descripcion: "Desarrollo web avanzado, frameworks y bases de datos",
      materias: ["React/Vue", "Node.js", "SQL/MongoDB"],
    },
    {
      nombre: "Nivel 3",
      duracion: "6 meses",
      descripcion: "Aplicaciones empresariales, DevOps, arquitectura de software",
      materias: ["Docker", "Cloud Computing", "Patrones de Diseño"],
    },
  ];

  return (
    <section id="niveles" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Niveles Académicos</h2>
          <p className="text-xl text-gray-600">
            Estructura progresiva de aprendizaje en tres niveles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {niveles.map((nivel, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{nivel.nombre}</h3>
              <p className="text-blue-600 font-semibold mb-3">{nivel.duracion}</p>
              <p className="text-gray-600 mb-4">{nivel.descripcion}</p>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Materias:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {nivel.materias.map((materia, i) => (
                    <li key={i}>{materia}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
