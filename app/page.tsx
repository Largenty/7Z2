'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DIFFICULTY_CONFIGS } from '@/lib/difficulty';
import type { Difficulty } from '@/types/game';

export default function HomePage() {
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('normal');

  const handlePlay = () => {
    router.push(`/play?difficulty=${selectedDifficulty}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-white">
      <div className="max-w-3xl w-full">
        <h1 className="text-6xl sm:text-9xl font-black text-black text-center mb-4 sm:mb-8 tracking-tighter">
          7Z2
        </h1>

        <h2 className="text-lg sm:text-2xl font-bold text-black text-center mb-8 sm:mb-16 tracking-tight px-2">
          Trouve le 722 plus vite que tout le monde
        </h2>

        <div className="border-2 sm:border-4 border-black p-4 sm:p-8 mb-6 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-black text-black mb-4 sm:mb-6 uppercase tracking-wide">
            Règles
          </h3>
          <ul className="space-y-3 sm:space-y-4 text-black text-sm sm:text-base">
            <li className="flex items-start">
              <span className="font-black mr-2 sm:mr-3">1.</span>
              <span className="font-medium">
                Une grille remplie de <span className="font-black">7Z2</span> apparaît
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-black mr-2 sm:mr-3">2.</span>
              <span className="font-medium">
                Une seule case contient <span className="font-black">722</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-black mr-2 sm:mr-3">3.</span>
              <span className="font-medium">Trouve-la le plus vite possible</span>
            </li>
          </ul>
        </div>

        {/* Sélecteur de difficulté */}
        <div className="border-2 sm:border-4 border-black p-4 sm:p-8 mb-6 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-black text-black mb-4 sm:mb-6 uppercase tracking-wide">
            Difficulté
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {Object.values(DIFFICULTY_CONFIGS).map((config) => (
              <button
                key={config.name}
                onClick={() => setSelectedDifficulty(config.name)}
                className={`
                  border-2 sm:border-4 border-black p-3 sm:p-4 font-black uppercase tracking-wide transition-all
                  ${
                    selectedDifficulty === config.name
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-black hover:text-white active:bg-black active:text-white'
                  }
                `}
              >
                <div className="text-sm sm:text-lg mb-1">{config.label}</div>
                <div className="text-xs sm:text-sm font-medium">{config.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-12">
          <button
            onClick={handlePlay}
            className="flex-1 bg-white border-2 sm:border-4 border-black text-black font-black py-4 sm:py-6 text-center text-lg sm:text-xl uppercase tracking-wide hover:bg-black hover:text-white active:bg-black active:text-white transition-all"
          >
            Jouer
          </button>

          <Link
            href="/leaderboard"
            className="flex-1 bg-white border-2 sm:border-4 border-black text-black font-black py-4 sm:py-6 text-center text-lg sm:text-xl uppercase tracking-wide hover:bg-black hover:text-white active:bg-black active:text-white transition-all"
          >
            Classement
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-black text-center font-medium">
          Ctrl+F ne marche pas ici.
        </p>
      </div>
    </div>
  );
}
