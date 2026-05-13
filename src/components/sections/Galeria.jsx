import { motion } from 'framer-motion';
import ShinyText from '../ShinyText ';
import DomeGallery from '../DomeGallery ';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function Galeria() {
    return (
        <section id="galeria" className="py-20">
            <motion.div 
                className="w-full flex flex-col items-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >

                {/* Header */}
                <motion.div variants={itemVariants} className="w-full max-w-5xl px-4 mb-20">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white">
                        <ShinyText
                            text="📸 Momentos Únicos"
                            speed={2}
                            delay={0}
                            color="#b5b5b5"
                            shineColor="#ffffff"
                            spread={120}
                            direction="left"
                            yoyo={false}
                            pauseOnHover={false}
                            disabled={false}
                        />
                    </h2>
                </motion.div>

                {/* Spacer */}
                <div style={{ height: '80px' }}></div>

                {/* Gallery Grid */}
                <motion.div variants={itemVariants} className="w-full flex justify-center">
                    <div className="w-full max-w-6xl px-4">
                        <div className="w-full h-[600px] flex justify-center items-center border-0 outline-none overflow-hidden">
                            <DomeGallery
                                fit={0.8}
                                minRadius={600}
                                maxVerticalRotationDeg={0}
                                segments={34}
                                dragDampening={2}
                                grayscale={false}
                            />
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
