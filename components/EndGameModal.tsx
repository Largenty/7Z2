'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentPseudo, savePseudo, isValidPseudo } from '@/lib/user';
import { createScore } from '@/lib/scores';
import { formatTimeShort } from '@/lib/time';
import type { Difficulty } from '@/types/game';

interface EndGameModalProps {
  durationMs: number;
  clicksCount: number;
  gridRows: number;
  gridCols: number;
  difficulty: Difficulty;
  onClose: () => void;
}

export default function EndGameModal({
  durationMs,
  clicksCount,
  gridRows,
  gridCols,
  difficulty,
  onClose,
}: EndGameModalProps) {
  const router = useRouter();
  const [pseudo, setPseudo] = useState('');
  const [currentPseudo, setCurrentPseudo] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getCurrentPseudo();
    setCurrentPseudo(existing);
    if (existing) {
      setPseudo(existing);
    }
  }, []);

  const handleSave = async () => {
    setError('');

    if (!isValidPseudo(pseudo)) {
      setError('2-20 caractères (lettres, chiffres, -, _)');
      return;
    }

    setIsSaving(true);

    try {
      const trimmedPseudo = pseudo.trim();
      await createScore({
        pseudo: trimmedPseudo,
        durationMs,
        clicksCount,
        gridRows,
        gridCols,
        difficulty,
      });
      savePseudo(trimmedPseudo);
      setSaved(true);
    } catch (err) {
      console.error('Error saving score:', err);
      setError(err instanceof Error ? err.message : 'Erreur de sauvegarde');
      setIsSaving(false);
    }
  };

  const handleViewLeaderboard = () => {
    router.push('/leaderboard');
  };

  const handlePlayAgain = () => {
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-2 sm:border-4 border-black max-w-md w-full p-6 sm:p-8">
        {!saved ? (
          <>
            <h2 className="text-3xl sm:text-4xl font-black text-black mb-4 sm:mb-6 uppercase">Bravo !</h2>

            <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
              <p className="text-base sm:text-lg font-bold text-black">
                Temps : <span className="font-black">{formatTimeShort(durationMs)}</span>
              </p>
              <p className="text-sm font-medium text-black">Clics : {clicksCount}</p>
              {clicksCount > 1 && (
                <p className="text-xs font-medium text-black">
                  ({clicksCount - 1} mauvais clic{clicksCount - 1 > 1 ? 's' : ''} = +{clicksCount - 1}s)
                </p>
              )}
            </div>

            {currentPseudo ? (
              <>
                <p className="text-xs sm:text-sm font-medium text-black mb-3 sm:mb-4">
                  Score enregistré avec <span className="font-black">{currentPseudo}</span> ?
                </p>

                <div className="mb-3 sm:mb-4">
                  <label className="text-xs font-medium text-black block mb-2">
                    Ou change ton pseudo :
                  </label>
                  <input
                    type="text"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-black bg-white text-black focus:outline-none font-medium text-sm"
                    maxLength={20}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSave();
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-xs sm:text-sm font-medium text-black mb-3 sm:mb-4">
                  Entre ton pseudo :
                </p>

                <div className="mb-3 sm:mb-4">
                  <input
                    type="text"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    placeholder="Pseudo"
                    className="w-full px-3 py-2 border-2 border-black bg-white text-black focus:outline-none font-medium text-sm"
                    maxLength={20}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSave();
                    }}
                    autoFocus
                  />
                  <p className="text-xs font-medium text-black mt-2">
                    2-20 caractères (lettres, chiffres, -, _)
                  </p>
                </div>
              </>
            )}

            {error && <div className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-black">{error}</div>}

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving || !pseudo.trim()}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white active:bg-black active:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm sm:text-base"
              >
                {isSaving ? 'Enreg...' : 'Enregistrer'}
              </button>

              <button
                onClick={onClose}
                className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white active:bg-black active:text-white transition-all uppercase text-sm sm:text-base"
              >
                ×
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl sm:text-4xl font-black text-black mb-4 sm:mb-6 uppercase">Enregistré !</h2>

            <p className="text-black font-medium mb-6 sm:mb-8 text-sm sm:text-base">
              Ton score est dans le classement.
            </p>

            <div className="flex flex-col gap-2 sm:gap-3">
              <button
                onClick={handleViewLeaderboard}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white active:bg-black active:text-white transition-all uppercase text-sm sm:text-base"
              >
                Classement
              </button>

              <button
                onClick={handlePlayAgain}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white active:bg-black active:text-white transition-all uppercase text-sm sm:text-base"
              >
                Rejouer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
