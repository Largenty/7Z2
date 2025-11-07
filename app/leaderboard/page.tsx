'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTopScores } from '@/lib/scores';
import { formatTimeShort, formatDate } from '@/lib/time';
import { DIFFICULTY_CONFIGS } from '@/lib/difficulty';
import type { Score, Difficulty } from '@/types/game';

export default function LeaderboardPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  useEffect(() => {
    loadScores();
  }, [selectedDifficulty]);

  const loadScores = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getTopScores(50, selectedDifficulty === 'all' ? undefined : selectedDifficulty);
      setScores(data);
    } catch (err) {
      console.error('Error loading scores:', err);
      setError('Impossible de charger les scores.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-6xl font-black text-black mb-3 sm:mb-4 uppercase tracking-tight">
            Leaderboard
          </h1>
          <p className="text-base sm:text-lg font-medium text-black">Top 50</p>
        </div>

        {/* Filtre par difficulté */}
        <div className="mb-6 sm:mb-8">
          <div className="flex gap-2 sm:gap-3 items-center flex-wrap">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`
                px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-black font-bold uppercase transition-all text-xs sm:text-sm
                ${
                  selectedDifficulty === 'all'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-black hover:text-white active:bg-black active:text-white'
                }
              `}
            >
              Tous
            </button>
            {Object.values(DIFFICULTY_CONFIGS).map((config) => (
              <button
                key={config.name}
                onClick={() => setSelectedDifficulty(config.name)}
                className={`
                  px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-black font-bold uppercase transition-all text-xs sm:text-sm
                  ${
                    selectedDifficulty === config.name
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-black hover:text-white active:bg-black active:text-white'
                  }
                `}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <Link
            href="/play"
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white active:bg-black active:text-white transition-all uppercase text-sm sm:text-base"
          >
            Jouer
          </Link>
        </div>

        <div className="border-2 sm:border-4 border-black bg-white">
          {isLoading ? (
            <div className="p-12 text-center">
              <p className="text-black font-bold">Chargement...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-black font-bold mb-4">{error}</p>
              <button
                onClick={loadScores}
                className="px-6 py-2 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white transition-all uppercase"
              >
                Réessayer
              </button>
            </div>
          ) : scores.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-black font-bold mb-6">
                Aucun score. Sois le premier !
              </p>
              <Link
                href="/play"
                className="inline-block px-6 py-3 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white transition-all uppercase"
              >
                Jouer
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2 border-black">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black text-black uppercase">
                      #
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black text-black uppercase">
                      Pseudo
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black text-black uppercase">
                      Temps
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black text-black uppercase hidden sm:table-cell">
                      Clics
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black text-black uppercase hidden md:table-cell">
                      Difficulté
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black text-black uppercase hidden lg:table-cell">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <tr
                      key={score.id}
                      className="border-b border-black hover:bg-black hover:text-white active:bg-black active:text-white transition-colors"
                    >
                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="text-xs sm:text-sm font-black">
                          {index + 1}
                        </span>
                      </td>

                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="text-xs sm:text-sm font-bold">
                          {score.pseudo}
                        </span>
                      </td>

                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="text-xs sm:text-sm font-black">
                          {formatTimeShort(score.duration_ms)}
                        </span>
                      </td>

                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden sm:table-cell">
                        <span className="text-xs sm:text-sm font-medium">{score.clicks_count}</span>
                      </td>

                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden md:table-cell">
                        <span className="text-xs font-bold uppercase">
                          {DIFFICULTY_CONFIGS[score.difficulty]?.label || score.difficulty}
                        </span>
                      </td>

                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden lg:table-cell">
                        <span className="text-xs font-medium">
                          {formatDate(score.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
