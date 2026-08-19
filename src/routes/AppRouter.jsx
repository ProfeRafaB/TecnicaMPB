import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProjectDocumentation from '../components/ProjectDocumentation';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos/:id" element={<ProjectDocumentation />} />
        {/* Rutas adicionales pueden agregarse aquí */}
      </Routes>
    </BrowserRouter>
  );
}
