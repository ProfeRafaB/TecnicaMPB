import React from "react";
import TextType from "../TextType";

export default function Hero() {
  return (
    <section
  id="inicio"
  className="min-h-screen flex items-center justify-center from-gray-900 to-gray-800 py-20 pt-20"
>
  <style>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    .delay-100 {
      animation-delay: 0.1s;
    }
    .delay-200 {
      animation-delay: 0.2s;
    }
  `}</style>

  <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 w-full max-w-7xl px-6 mx-auto">

    {/* Sección de Texto */}
    <div className="flex flex-col items-start justify-center text-left flex-[2]">

      <div className="flex flex-col items-start justify-center gap-4 mb-20">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white italic animate-fade-in-up text-left">
          Desarrollo y Análisis de Software
        </h1>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white italic animate-fade-in-up text-left">
          I.E Misael Pastrana Borrero
        </h1>

        <TextType
          text={[
            "Fomentando el pensamiento computacional",
            "desde la creatividad y la innovación",
            "En convenio con el SENA",
            "formamos jóvenes enfocados",
            "en las nuevas tecnologías"
          ]}
          typingSpeed={100}
          pauseDuration={2000}
          showCursor
          cursorCharacter="_"
          deletingSpeed={50}
          variableSpeedEnabled={false}
          variableSpeedMin={60}
          variableSpeedMax={120}
          cursorBlinkDuration={0.5}
          className="text-2xl sm:text-3xl text-gray-400 italic font-serif animate-fade-in-up delay-100 text-left"
        />

      </div>
    </div>

    {/* Sección Model Viewer */}
    <div className="flex items-center justify-center w-full md:w-auto">
      <model-viewer
        src="/"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
        style={{ width: "100%", maxWidth: "500px", height: "500px" }}
      />
    </div>

  </div>
</section>
  );
}