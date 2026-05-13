import React from "react";
import { motion } from 'framer-motion';
import TextType from "../TextType";
import ModelViewer from '../ModelViewer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center py-20 pt-20 relative"
    >
      <motion.div 
        className="relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sección de Texto */}
        <div className="flex flex-col items-start justify-center text-left flex-[2]">
          <div className="flex flex-col items-start justify-center gap-4 mb-20">
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white italic text-left font-mono"
            >
              Desarrollo y Análisis de Software
            </motion.h1>

            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white italic text-left font-mono"
            >
              I.E Misael Pastrana Borrero
            </motion.h1>

            <motion.div variants={itemVariants}>
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
                className="text-2xl sm:text-3xl text-gray-400 italic font-serif text-left"
              />
            </motion.div>
          </div>
        </div>

        {/* Sección Model Viewer */}
        <div className="flex items-center justify-center w-full md:w-auto">
          {/* <ModelViewer
            url="/models/Logo3D.glb"
            width={500}
            height={500}
            modelXOffset={0}
            modelYOffset={0}
            defaultRotationX={-30}
            defaultRotationY={45}
            defaultZoom={1.2}
            enableMouseParallax
            enableManualRotation
            enableHoverRotation
            enableManualZoom
            environmentPreset="forest"
            fadeIn={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            showScreenshotButton={false}
          /> */}
        </div>
      </motion.div>
    </section>
  );
}