'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import GameGrid from '@/components/GameGrid';
import Timer from '@/components/Timer';
import EndGameModal from '@/components/EndGameModal';
import { generateRandomSpecialPosition, isSpecialCell } from '@/lib/antiCheat';
import { getDifficultyConfig } from '@/lib/difficulty';
import type { GameStatus, CellPosition, Difficulty } from '@/types/game';

export default function PlayPage() {
  const searchParams = useSearchParams();
  const difficultyParam = searchParams.get('difficulty') as Difficulty | null;
  const difficulty: Difficulty = difficultyParam || 'normal';
  const config = getDifficultyConfig(difficulty);

  const GRID_ROWS = config.rows;
  const GRID_COLS = config.cols;
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [durationMs, setDurationMs] = useState<number>(0);
  const [clicksCount, setClicksCount] = useState(0);
  const [specialCell, setSpecialCell] = useState<CellPosition | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleStart = () => {
    const newSpecialCell = generateRandomSpecialPosition(GRID_ROWS, GRID_COLS);
    setSpecialCell(newSpecialCell);
    setClicksCount(0);
    setEndTime(null);
    setDurationMs(0);
    const now = performance.now();
    setStartTime(now);
    setGameStatus('playing');
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameStatus !== 'playing' || !specialCell || !startTime) return;

    const newClicksCount = clicksCount + 1;
    setClicksCount(newClicksCount);

    if (isSpecialCell(row, col, specialCell.row, specialCell.col)) {
      const now = performance.now();
      const rawDuration = now - startTime;

      // Calculer le malus : chaque mauvais clic ajoute 1 seconde
      // Le nombre de mauvais clics = nombre total de clics - 1 (le bon clic)
      const wrongClicks = newClicksCount - 1;
      const penalty = wrongClicks * 1000; // 1000ms = 1 seconde
      const finalDuration = Math.round(rawDuration + penalty); // Arrondir pour avoir un entier

      setEndTime(now);
      setDurationMs(finalDuration);
      setGameStatus('finished');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full bg-white">
      {/* Grille plein écran */}
      {gameStatus === 'idle' ? (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-black text-black mb-6 sm:mb-8">Prêt ?</h1>
            <button
              onClick={handleStart}
              className="px-8 sm:px-12 py-3 sm:py-4 border-2 sm:border-4 border-black bg-white text-black font-black text-xl sm:text-2xl hover:bg-black hover:text-white active:bg-black active:text-white transition-all uppercase"
            >
              Start
            </button>
          </div>
        </div>
      ) : specialCell ? (
        <>
          {/* Barre d'info en dessous du header */}
          <div className="bg-white border-b-2 border-black">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2">
              <Timer
                isRunning={gameStatus === 'playing'}
                startTime={startTime}
                finalTime={gameStatus === 'finished' ? durationMs : undefined}
              />

              <div className="flex items-center gap-1 sm:gap-3">
                <button
                  onClick={handleStart}
                  className="px-2 sm:px-4 py-1 sm:py-2 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white active:bg-black active:text-white transition-all uppercase text-xs sm:text-sm"
                >
                  {gameStatus === 'playing' ? 'Restart' : 'Replay'}
                </button>

                <Link
                  href="/"
                  className="px-2 sm:px-4 py-1 sm:py-2 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white active:bg-black active:text-white transition-all uppercase text-xs sm:text-sm"
                >
                  Abandonner
                </Link>
              </div>

              <div className="text-center">
                <div className="text-xs font-medium text-black">Clics</div>
                <div className="text-lg sm:text-xl font-black text-black">{clicksCount}</div>
              </div>
            </div>
          </div>

          <GameGrid
            rows={GRID_ROWS}
            cols={GRID_COLS}
            specialCell={specialCell}
            onCellClick={handleCellClick}
            disabled={gameStatus === 'finished'}
          />
        </>
      ) : null}

      {/* Modal de fin de partie */}
      {showModal && gameStatus === 'finished' && (
        <EndGameModal
          durationMs={durationMs}
          clicksCount={clicksCount}
          gridRows={GRID_ROWS}
          gridCols={GRID_COLS}
          difficulty={difficulty}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
