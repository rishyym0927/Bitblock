import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <motion.header 
    className="flex justify-between items-center py-8"
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
  >
    <motion.div 
      className="text-5xl font-bold text-green-400"
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      CodeNFT
    </motion.div>
    <nav>
      {["Home", "Marketplace", "About", "Contact"].map((item, index) => (
        <motion.a 
          key={item}
          href={`#${item.toLowerCase()}`} 
          className="text-white text-xl ml-8"
          whileHover={{ scale: 1.2, color: "#4ade80" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {item}
        </motion.a>
      ))}
    </nav>
  </motion.header>
);

const Hero: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3 }
    }));
  }, [controls]);

  return (
    <section className="text-center py-24">
      <motion.h1 
        className="text-7xl font-bold mb-8 text-green-400"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        Sell Your Code as NFTs
      </motion.h1>
      <motion.p 
        className="text-3xl mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        Monetize your intellectual property on the blockchain
      </motion.p>
      <Link to='/my-collections'>  <motion.button 
        className="bg-green-400 text-black px-12 py-6 rounded-full text-2xl font-semibold"
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgb(74, 222, 128)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
 Get Started
      </motion.button></Link>
    
    </section>
  );
};

const FloatingParticle: React.FC = () => {
  const randomX = Math.random() * 200 - 100;
  const randomY = Math.random() * 200 - 100;

  return (
    <motion.div
      className="absolute w-2 h-2 bg-green-400 rounded-full"
      initial={{ scale: 0 }}
      animate={{ 
        scale: [0, 1, 1, 0],
        x: [0, randomX, randomX, 0],
        y: [0, randomY, randomY, 0],
        opacity: [0, 1, 1, 0]
      }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
    />
  );
};

const ParticlesBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <FloatingParticle key={i} />
    ))}
  </div>
);

interface FeatureProps {
  title: string;
  description: string;
  icon: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-green-900 bg-opacity-20 p-12 rounded-lg relative overflow-hidden mb-10 shadow-lg"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="text-6xl mb-6"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h2 className="text-3xl font-semibold text-green-400 mb-6">{title}</h2>
      <p className="text-xl">{description}</p>
      <motion.div 
        className="absolute inset-0 bg-green-400"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isHovered ? 1.5 : 0, opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Features: React.FC = () => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
    <Feature 
      title="Secure" 
      description="Your code is protected by cutting-edge blockchain technology" 
      icon="🔒"
    />
    <Feature 
      title="Profitable" 
      description="Set your own prices and earn ongoing royalties" 
      icon="💰"
    />
    <Feature 
      title="Innovative" 
      description="Be at the forefront of the digital ownership revolution" 
      icon="🚀"
    />
  </section>
);

const Landing: React.FC = () => (
  <div className="min-h-screen bg-black text-white relative h-full">
    <ParticlesBackground />
    <div className="max-w-7xl mx-auto px-8 relative z-10">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  </div>
);

export default Landing;
