import React from "react";
import TextType from "../TextType";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center  from-gray-900 to-gray-800 py-20"
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">

        <h1 className="text-2xl sm:text-6xl font-bold text-white italic mb-6 animate-fade-in-up">
          Desarrollo y Análisis de Software,   I.E Misael Pastrana Borrero
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
          className="text-2xl sm:text-3xl text-white italic font-serif animate-fade-in-up delay-100"
        />

      </div>
    </section>
  );
}