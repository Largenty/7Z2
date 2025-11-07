'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentPseudo, savePseudo, isValidPseudo } from '@/lib/user';

export default function Header() {
  const [pseudo, setPseudo] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setPseudo(getCurrentPseudo());
  }, []);

  const handleSave = () => {
    setError('');
    if (!isValidPseudo(inputValue)) {
      setError('2-20 caractères (lettres, chiffres, -, _)');
      return;
    }
    const trimmed = inputValue.trim();
    savePseudo(trimmed);
    setPseudo(trimmed);
    setIsEditing(false);
    setInputValue('');
  };

  const handleEdit = () => {
    setInputValue(pseudo || '');
    setIsEditing(true);
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setInputValue('');
    setError('');
  };

  return (
    <header className="bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl sm:text-3xl font-black tracking-tight text-black hover:opacity-70 transition-opacity">
            7Z2
          </Link>

          {/* Navigation + Pseudo */}
          <div className="flex items-center gap-2 sm:gap-6">
            <nav className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/play"
                className="px-3 sm:px-6 py-1.5 sm:py-2 border-2 border-black bg-white text-black font-semibold hover:bg-black hover:text-white active:bg-black active:text-white transition-all text-xs sm:text-base"
              >
                Jouer
              </Link>
              <Link
                href="/leaderboard"
                className="hidden sm:inline-block px-6 py-2 border-2 border-black bg-white text-black font-semibold hover:bg-black hover:text-white active:bg-black active:text-white transition-all"
              >
                Leaderboard
              </Link>
              <Link
                href="/leaderboard"
                className="sm:hidden px-3 py-1.5 border-2 border-black bg-white text-black font-semibold hover:bg-black hover:text-white active:bg-black active:text-white transition-all text-xs"
              >
                Score
              </Link>
            </nav>

            {/* Gestion du pseudo */}
            <div className="flex items-center gap-2 sm:gap-3">
              {!isEditing ? (
                <>
                  {pseudo ? (
                    <>
                      <span className="text-xs sm:text-sm font-medium text-black max-w-[80px] sm:max-w-none truncate">
                        {pseudo}
                      </span>
                      <button
                        onClick={handleEdit}
                        className="text-xs px-2 sm:px-3 py-1 border border-black bg-white text-black hover:bg-black hover:text-white active:bg-black active:text-white transition-all"
                      >
                        Modifier
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-black bg-white text-black font-semibold hover:bg-black hover:text-white active:bg-black active:text-white transition-all"
                    >
                      Pseudo
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Pseudo"
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-white text-black border-2 border-black focus:outline-none w-20 sm:w-auto"
                    maxLength={20}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSave();
                      if (e.key === 'Escape') handleCancel();
                    }}
                    autoFocus
                  />
                  <button
                    onClick={handleSave}
                    className="text-xs px-2 sm:px-3 py-1 border-2 border-black bg-white text-black hover:bg-black hover:text-white active:bg-black active:text-white transition-all"
                  >
                    OK
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-xs px-2 sm:px-3 py-1 border border-black bg-white text-black hover:bg-black hover:text-white active:bg-black active:text-white transition-all"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-2 text-xs text-black text-right">
            {error}
          </div>
        )}
      </div>
    </header>
  );
}
