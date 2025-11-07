export default function Footer() {
  return (
    <footer className="bg-white border-t-2 sm:border-t-4 border-black py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-4 sm:mb-6">
          {/* Copyright */}
          <div>
            <p className="text-xs sm:text-sm font-bold text-black mb-2">
              © {new Date().getFullYear()} Ludovic Argenty
            </p>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <a
                href="https://ludovicargenty.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-medium text-black hover:font-black transition-all"
              >
                ludovicargenty.com →
              </a>
              <a
                href="https://fetch-me.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-medium text-black hover:font-black transition-all"
              >
                fetch-me.dev →
              </a>
            </div>
          </div>

          {/* Inspiration */}
          <div className="md:col-span-2">
            <p className="text-xs sm:text-sm font-bold text-black mb-2">Inspiration</p>
            <p className="text-xs sm:text-sm font-medium text-black">
              Jeu inspiré par{' '}
              <a
                href="https://www.m6.fr/emission-pekin_express"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black hover:underline"
              >
                Pékin Express
              </a>
              {' '}saison 21 "La Route des Glaciers" diffusé tous les vendredis sur M6
            </p>
          </div>
        </div>

        <div className="border-t-2 border-black pt-3 sm:pt-4">
          <p className="text-xs font-medium text-black text-center">
            Trouve le 722 parmi les 7Z2 - Un jeu de rapidité et d'observation
          </p>
        </div>
      </div>
    </footer>
  );
}
