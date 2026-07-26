import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VariableProximity = ({
  label,
  className = '',
  onClick,
}) => {
  const words = label.split(' ');

  return (
    <span
      className={`inline-block select-none ${className}`}
      onClick={onClick}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <HoverLetter key={charIndex} char={char} />
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
};

const HoverLetter = ({ char }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        // Inherit exact site font weight & family; swell with a tiny scale + light reaction
        scale: isHovered ? 1.04 : 1,
        color: isHovered ? '#ffffff' : 'inherit',
        textShadow: isHovered ? '0 0 10px rgba(255,255,255,0.7)' : '0 0 0px rgba(0,0,0,0)',
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 20,
      }}
      className="inline-block cursor-pointer transition-colors"
    >
      {char}
    </motion.span>
  );
};

export default VariableProximity;