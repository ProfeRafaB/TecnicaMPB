import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProjectDocumentation from '../components/ProjectDocumentation';
import RatingResults from '../pages/RatingResults';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos/:id" element={<ProjectDocumentation />} />
        <Route path="/resultados" element={<RatingResults />} />
        {/* Rutas adicionales pueden agregarse aquí */}
      </Routes>
    </BrowserRouter>
  );
}
