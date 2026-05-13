import { motion } from 'framer-motion';
import { useState } from 'react';

export function AnimatedImage({ src, alt, hovering = false }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x: x * 10, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovering ? 0.6 : 0.3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect */}
      {hovering && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent z-5 pointer-events-none"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Image container with parallax */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: hovering ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />
      </motion.div>

      {/* Shine effect */}
      {hovering && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 z-20 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      )}

      {/* Loading skeleton */}
      {!imageLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse z-0"
          exit={{ opacity: 0 }}
        />
      )}

      {/* Corner accent lights */}
      {hovering && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-full blur-xl pointer-events-none z-5"
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-tl-full blur-xl pointer-events-none z-5"
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </>
      )}
    </div>
  );
}
