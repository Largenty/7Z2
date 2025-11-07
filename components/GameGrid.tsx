'use client';

import { useMemo } from 'react';
import { isSpecialCell } from '@/lib/antiCheat';
import type { CellPosition } from '@/types/game';

interface GameGridProps {
  rows: number;
  cols: number;
  specialCell: CellPosition;
  onCellClick: (row: number, col: number) => void;
  disabled?: boolean;
}

export default function GameGrid({
  rows,
  cols,
  specialCell,
  onCellClick,
  disabled = false,
}: GameGridProps) {
  const grid = useMemo(() => {
    const result: Array<Array<{ row: number; col: number; isSpecial: boolean }>> = [];

    for (let row = 0; row < rows; row++) {
      const rowData = [];
      for (let col = 0; col < cols; col++) {
        rowData.push({
          row,
          col,
          isSpecial: isSpecialCell(row, col, specialCell.row, specialCell.col),
        });
      }
      result.push(rowData);
    }

    return result;
  }, [rows, cols, specialCell.row, specialCell.col]);

  return (
    <div className="w-full min-h-screen bg-white overflow-auto p-2 sm:flex sm:items-center sm:justify-center sm:p-4">
      <style jsx>{`
        .grid-container {
          display: inline-grid;
          gap: 0;
        }
        .grid-cell {
          width: 80px;
          height: 55px;
        }
        .grid-cell::before {
          content: '7Z2';
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          color: black;
          font-weight: bold;
          font-size: 1.75rem;
          font-family: 'Nunito Sans', sans-serif;
        }
        .grid-cell:hover::before {
          background: black;
          color: white;
        }
        .grid-cell:active::before {
          background: black;
          color: white;
        }
        .cell-special::before {
          content: '722';
        }

        /* Responsive pour mobile - cellules carrées et plus grandes */
        @media (max-width: 640px) {
          .grid-cell {
            width: 80px;
            height: 80px;
          }
          .grid-cell::before {
            font-size: 1.5rem;
          }
        }

        /* Responsive pour tablettes */
        @media (min-width: 641px) and (max-width: 1024px) {
          .grid-cell {
            width: 60px;
            height: 45px;
          }
          .grid-cell::before {
            font-size: 1.3rem;
          }
        }
      `}</style>
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${cols}, auto)`,
        }}
      >
        {grid.flat().map((cell) => {
          return (
            <button
              key={`${cell.row}-${cell.col}`}
              onClick={() => !disabled && onCellClick(cell.row, cell.col)}
              disabled={disabled}
              className={`
                grid-cell
                bg-white
                text-black
                select-none
                transition-colors
                cursor-pointer
                disabled:cursor-not-allowed
                disabled:opacity-50
                relative
                touch-manipulation
                ${cell.isSpecial ? 'cell-special' : ''}
              `}
            >
              {/* Aucun texte dans le DOM - tout affiché via CSS ::before */}
            </button>
          );
        })}
      </div>
    </div>
  );
}
