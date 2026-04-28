export default function Proyectos() {
  const proyectos = [
    {
      titulo: "Red Social Académica",
      descripcion: "Plataforma para conectar estudiantes y docentes",
      tecnologias: ["React", "Node.js", "MongoDB"],
    },
    {
      titulo: "Sistema de Gestión Escolar",
      descripcion: "Aplicación para administrar calificaciones y asistencia",
      tecnologias: ["React", "Express", "PostgreSQL"],
    },
    {
      titulo: "E-commerce Educativo",
      descripcion: "Tienda en línea para cursos y materiales",
      tecnologias: ["Vue.js", "Laravel", "MySQL"],
    },
    {
      titulo: "Chat en Tiempo Real",
      descripcion: "Aplicación de mensajería instantánea",
      tecnologias: ["Socket.io", "React", "Node.js"],
    },
    {
      titulo: "Aplicación de Tareas",
      descripcion: "Gestor de tareas con sincronización en la nube",
      tecnologias: ["Flutter", "Firebase"],
    },
    {
      titulo: "Dashboard Analítico",
      descripcion: "Panel de análisis de datos con gráficos",
      tecnologias: ["React", "D3.js", "Python"],
    },
  ];

  return (
    <section id="proyectos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Proyectos</h2>
          <p className="text-xl text-gray-600">
            Proyectos realizados por nuestros estudiantes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {proyecto.titulo}
              </h3>
              <p className="text-gray-600 mb-4">{proyecto.descripcion}</p>
              <div className="flex flex-wrap gap-2">
                {proyecto.tecnologias.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
