import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../types/Animal';
import { API_BASE_URL, BASE_URL } from '../util/BASEURL';
import { staticAnimals } from '../data/static-animals';

function HomePage() {
  const [hoveredBg, setHoveredBg] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Animal[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Debounced search effect
  useEffect(() => {
    // If search term is empty, hide results
    if (!searchTerm.trim()) {
      setShowResults(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Debounce the search with 300ms delay
    const timeoutId = setTimeout(async () => {
      try {
        // Search in static animals first
        const staticResults = staticAnimals.filter(animal =>
          animal.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Search in API animals
        const response = await fetch(`${API_BASE_URL}/all?animalName=${encodeURIComponent(searchTerm)}`);
        let apiResults: Animal[] = [];
        
        if (response.ok) {
          apiResults = await response.json();
        }

        // Combine results, avoiding duplicates using Map
        const allResultsMap = new Map();
        staticResults.forEach(animal => allResultsMap.set(animal.animalId, animal));
        apiResults.forEach(animal => allResultsMap.set(animal.animalId, animal));

        const combinedResults = Array.from(allResultsMap.values());
        setSearchResults(combinedResults);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        // Fallback to static search only
        const staticResults = staticAnimals.filter(animal =>
          animal.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(staticResults);
        setShowResults(true);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
    setSearchResults([]);
  };

  const colors = [
    { name: 'Red',    hex: '#ef4444', subtleHex: '#3f1212', hoverColor: 'hover:text-red-500',    shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(239,68,68)]' },
    { name: 'Orange', hex: '#f97316', subtleHex: '#4d2a0b', hoverColor: 'hover:text-orange-500', shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(249,115,22)]' },
    { name: 'Yellow', hex: '#facc15', subtleHex: '#4a3f0c', hoverColor: 'hover:text-yellow-400', shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(250,204,21)]' },
    { name: 'Green',  hex: '#22c55e', subtleHex: '#103b21', hoverColor: 'hover:text-green-500',  shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(34,197,94)]' },
    { name: 'Blue',   hex: '#3b82f6', subtleHex: '#152a4c', hoverColor: 'hover:text-blue-500',   shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(59,130,246)]' },
    { name: 'Indigo', hex: '#6366f1', subtleHex: '#22234e', hoverColor: 'hover:text-indigo-500', shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(99,102,241)]' },
    { name: 'Violet', hex: '#8b5cf6', subtleHex: '#2e1e4e', hoverColor: 'hover:text-violet-500', shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(139,92,246)]' },
    { name: 'White',  hex: '#ffffff', subtleHex: '#333333', hoverColor: 'hover:text-white',      shadowColor: 'hover:drop-shadow-[0_0_20px_rgb(255,255,255)]' }
  ];
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 transition-[background] duration-1000 ease-in-out"
      style={{
          background: `linear-gradient(to bottom right, ${hoveredBg || '#0f172a'}, #000, ${hoveredBg || '#0f172a'})`
      }}
    >
      <div className="flex flex-col items-center space-y-16">
        {/* Title */}
        <div className="text-center space-y-6">
          <h1 className={`text-8xl font-bold text-white uppercase tracking-widest
                         hover:opacity-100 hover:text-gradient-to-r hover:from-blue-400 hover:to-purple-500
                         transition-all duration-500 ease-out
                         bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent
                         md:text-7xl sm:text-5xl`}>
            Animal Gallery
          </h1>
        </div>

        {/* Search Bar */}
        <div className={`w-full max-w-md relative`}>
          <div className="relative">
            <input 
              type="text"
              placeholder="Search for animals..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-6 py-4 bg-slate-800/50 text-white placeholder-slate-400/80
                         border-2 border-slate-700/80 rounded-full
                         focus:outline-none focus:ring-2 focus:ring-white-500/80 focus:border-white-500/80
                         transition-all duration-300 ease-in-out text-lg tracking-wide
                         shadow-lg shadow-black/20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5 space-x-2">
              {isSearching && (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              )}
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
              {!searchTerm && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-slate-400">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-sm border-2 border-slate-700/80 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="p-4">
                  <p className="text-slate-400 text-sm mb-3">
                    Found {searchResults.length} animal{searchResults.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-2">
                    {searchResults.map((animal) => (
                      <Link
                        key={animal.animalId}
                        to={`/${animal.color}/${animal.animalId}`}
                        onClick={clearSearch}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group"
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={animal.animalId <= 24 ? `/images/${animal.imageUrl}` : `${BASE_URL}${animal.imageUrl}`}
                            alt={animal.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                            {animal.name}
                          </h3>
                          <p className="text-slate-400 text-sm truncate">
                            {animal.scientificName}
                          </p>
                        </div>
                        <div 
                          className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                          style={{ 
                            backgroundColor: `var(--${animal.color}-color, #6366f1)20`,
                            color: `var(--${animal.color}-color, #6366f1)`
                          }}
                        >
                          {animal.color}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-slate-400">No animals found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Color Words - Only show when not searching */}
        {!showResults && (
          <div 
              className="flex flex-wrap gap-12 justify-center items-center max-w-6xl mx-auto"
              onMouseLeave={() => setHoveredBg(null)}
          >
            {colors.map((colorItem, index) => (
              <Link
                to={`/${colorItem.name.toLowerCase()}`}
                key={colorItem.name}
                onMouseEnter={() => setHoveredBg(colorItem.subtleHex)}
                className={`
                  text-6xl font-bold text-white opacity-30 cursor-pointer
                  transition-all duration-500 ease-out
                  relative uppercase tracking-wider select-none
                  hover:opacity-100 hover:-translate-y-3 hover:scale-110
                  hover:brightness-125
                  ${colorItem.hoverColor}
                  ${colorItem.shadowColor}
                  md:text-5xl sm:text-4xl
                `}
              >
                {colorItem.name}
              </Link>
            ))}
          </div>
        )}

        {/* View All Button - Only show when not searching */}
        {!showResults && (
          <div className="mt-8">
            <Link
              to="/all"
              className="px-12 py-4 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
                         hover:bg-slate-700/50 hover:border-slate-600/80 hover:scale-105
                         transition-all duration-300 ease-out
                         text-xl font-bold tracking-wide shadow-lg shadow-black/20
                         hover:shadow-2xl hover:shadow-white/10
                         bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20
                         hover:border-blue-400/60"
            >
              View All Animals
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage; 