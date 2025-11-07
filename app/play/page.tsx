import { Suspense } from 'react';
import PlayPageClient from './PlayPageClient';

export default function PlayPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-2xl font-black text-black">Chargement...</div>
        </div>
      </div>
    }>
      <PlayPageClient />
    </Suspense>
  );
}
