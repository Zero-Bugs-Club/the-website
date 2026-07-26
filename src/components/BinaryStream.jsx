import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SYMBOLS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/';
const WORDS = ['ZERO BUGS CLUB', 'EXPLORE', 'ENGINEER', 'EVOLVE'];

const getRandomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

const BinaryStream = () => {
  const STREAM_LENGTH = 40;
  
  // Initialize stream with standard symbols
  const [streamItems, setStreamItems] = useState(() =>
    Array.from({ length: STREAM_LENGTH }, () => ({
      char: getRandomSymbol(),
      isWord: false,
    }))
  );

  useEffect(() => {
    // 1. Rapid symbol tumbling loop
    const tumbleInterval = setInterval(() => {
      setStreamItems((prev) =>
        prev.map((item) => {
          if (item.isWord) return item; // Preserve active word characters
          return { ...item, char: getRandomSymbol() };
        })
      );
    }, 110);

    // 2. Periodic word injection loop (triggers a new word every ~4 seconds)
    const wordInjectionInterval = setInterval(() => {
      const selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)];
      const wordLength = selectedWord.length;

      // Pick a valid random starting index where the word fits in the stream
      const maxStartIndex = Math.max(0, STREAM_LENGTH - wordLength - 2);
      const startIndex = Math.floor(Math.random() * maxStartIndex);

      // Inject the word into the stream array
      setStreamItems((prev) => {
        const next = [...prev];
        for (let i = 0; i < wordLength; i++) {
          next[startIndex + i] = {
            char: selectedWord[i],
            isWord: true,
          };
        }
        return next;
      });

      // Clear the word back into tumbling matrix symbols after 2.8 seconds
      setTimeout(() => {
        setStreamItems((prev) => {
          const next = [...prev];
          for (let i = 0; i < wordLength; i++) {
            if (startIndex + i < next.length) {
              next[startIndex + i] = {
                char: getRandomSymbol(),
                isWord: false,
              };
            }
          }
          return next;
        });
      }, 2800);

    }, 4500);

    return () => {
      clearInterval(tumbleInterval);
      clearInterval(wordInjectionInterval);
    };
  }, []);

  // Smooth scroll tracking
  const { scrollY } = useScroll();

  const smoothScroll = useSpring(scrollY, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.001,
  });

  // Seamless modulo infinite scroll wrap
  const yTranslate = useTransform(smoothScroll, (latest) => {
    const loopDistance = 2800;
    const progress = (latest % loopDistance) / loopDistance;
    return `-${progress * 50}%`;
  });

  return (
    <div className="fixed left-3 md:left-6 top-20 md:top-24 z-20 h-[calc(100vh-96px)] w-8 pointer-events-none select-none overflow-hidden flex flex-col items-center opacity-45 hover:opacity-90 transition-opacity duration-300">
      
      {/* Infinite Rolling Stream */}
      <motion.div
        style={{ y: yTranslate }}
        className="font-mono text-xs md:text-sm leading-5 tracking-widest flex flex-col items-center gap-1 py-4"
      >
        {/* Render base set twice for seamless infinite carousel */}
        {[...streamItems, ...streamItems].map((item, idx) => (
          <React.Fragment key={idx}>
            {item.isWord ? (
              // Highlighted word characters when formed
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-white font-bold [text-shadow:0_0_12px_rgba(255,255,255,1)] animate-pulse"
              >
                {item.char === ' ' ? ' ' : item.char}
              </motion.span>
            ) : (
              // Regular tumbling symbols
              <span className="text-emerald-400/80 [text-shadow:0_0_8px_rgba(52,211,153,0.6)]">
                {item.char}
              </span>
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Vertical Accent Line */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
    </div>
  );
};

export default BinaryStream;