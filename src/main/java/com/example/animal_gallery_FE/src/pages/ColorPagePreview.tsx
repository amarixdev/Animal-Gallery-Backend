import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type Animal } from '../types/Animal';
import { staticAnimals } from '../data/static-animals';
import { API_BASE_URL, BASE_URL } from '../util/BASEURL';


function ColorPagePreview() {
  const navigate = useNavigate();
  const { colorName } = useParams<{ colorName: string }>();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Animal[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setAnimals(staticAnimals.filter((animal: Animal) => animal.color === colorName));

    const fetchAnimals = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${colorName}/all`);
        const data = await response.json();
        setAnimals(prevAnimals => [...prevAnimals, ...data]);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    }
    fetchAnimals();
  }, [colorName]);

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
        // Search in static animals first (filtered by color)
        const staticResults = staticAnimals.filter(animal =>
          animal.color.toLowerCase() === colorName?.toLowerCase() &&
          animal.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Search in API animals (filtered by color)
        const response = await fetch(`${API_BASE_URL}/${colorName}/all?animalName=${encodeURIComponent(searchTerm)}`);
        let apiResults: Animal[] = [];
        
        if (response.ok) {
          apiResults = await response.json();
          apiResults = apiResults.filter((animal: Animal) =>
            animal.color.toLowerCase() === colorName?.toLowerCase()
          );
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
          animal.color.toLowerCase() === colorName?.toLowerCase() &&
          animal.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(staticResults);
        setShowResults(true);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, colorName]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
    setSearchResults([]);
  };

  // Color mapping for dynamic theming
  const colorMap: { [key: string]: { primary: string; subtle: string } } = {
    red: { primary: '#ef4444', subtle: '#3f1212' },
    orange: { primary: '#f97316', subtle: '#4d2a0b' },
    yellow: { primary: '#facc15', subtle: '#4a3f0c' },
    green: { primary: '#22c55e', subtle: '#103b21' },
    blue: { primary: '#3b82f6', subtle: '#152a4c' },
    indigo: { primary: '#6366f1', subtle: '#22234e' },
    violet: { primary: '#8b5cf6', subtle: '#2e1e4e' },
    white: { primary: '#ffffff', subtle: '#333333' }
  };

  const defaultColor = { primary: '#8b5cf6', subtle: '#2e1e4e' };
  const currentColor = colorMap[colorName?.toLowerCase() || ''] || defaultColor;

  return (
    <div 
      className="min-h-screen flex flex-col p-8 transition-[background] duration-1000 ease-in-out relative"
      style={{
        background: `linear-gradient(to bottom right, ${currentColor.subtle}, #000, ${currentColor.subtle})`
      }}
    >
      {/* Navigation Buttons - Top Left */}
      <div className="relative mb-10 flex justify-between w-full">
        <button 
          onClick={() => navigate(-1)}
          className="cursor-pointer active:scale-95 px-6 py-3 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
                     hover:bg-slate-700/50 hover:border-slate-600/80 transition-all duration-300
                     text-lg font-medium tracking-wide shadow-lg shadow-black/20"
        >
          ← Back
        </button>
        <Link 
          to="/"
          className="cursor-pointer active:scale-95 px-6 py-3 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
                     hover:bg-slate-700/50 hover:border-slate-600/80 transition-all duration-300
                     text-lg font-medium tracking-wide shadow-lg shadow-black/20"
        >
          🏠 Home
        </Link>
        <div 
          className="opacity-0 px-6 py-3 bg-slate-800/50 text-white rounded-full border-2 border-slate-700/80
                     hover:bg-slate-700/50 hover:border-slate-600/80 transition-all duration-300
                     text-lg font-medium tracking-wide shadow-lg shadow-black/20"
        >
          🏠 Home
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-center space-y-8 mb-16 mt-8">
        {/* Title */}
        <h1 className="text-6xl font-bold text-white uppercase tracking-widest
                       bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent
                       md:text-5xl sm:text-4xl">
          {colorName} Animals
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-md relative">
          <div className="relative">
            <input 
              type="text"
              placeholder={`Search ${colorName} animals...`}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-6 py-4 bg-slate-800/50 text-white placeholder-slate-400/80
                         border-2 border-slate-700/80 rounded-full
                         focus:outline-none focus:ring-2 focus:border-2
                         transition-all duration-300 ease-in-out text-lg tracking-wide
                         shadow-lg shadow-black/20"
              style={{
                '--tw-ring-color': `${currentColor.primary}80`,
                borderColor: `${currentColor.primary}80`
              } as React.CSSProperties}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5 space-x-2">
              {isSearching && (
                <div 
                  className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full"
                  style={{ borderColor: currentColor.primary }}
                />
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
                    Found {searchResults.length} {colorName?.toLowerCase()} animal{searchResults.length !== 1 ? 's' : ''}
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
                          <h3 
                            className="font-medium truncate transition-colors group-hover:text-blue-400"
                            style={{ 
                              color: currentColor.primary
                            }}
                          >
                            {animal.name}
                          </h3>
                          <p className="text-slate-400 text-sm truncate">
                            {animal.scientificName}
                          </p>
                        </div>
                        <div 
                          className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                          style={{ 
                            backgroundColor: `${currentColor.primary}20`,
                            color: currentColor.primary
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
                  <p className="text-slate-400">No {colorName?.toLowerCase()} animals found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Only show when not searching */}
      {!showResults && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-12">
          {/* Add New Animal Button */}
          <Link
            to={`/${colorName}/create`}
            className="px-8 py-4 text-xl font-bold text-white rounded-full border-2
                       transition-all duration-300 ease-out
                       hover:scale-105 hover:shadow-lg uppercase tracking-wider inline-block"
            style={{
              backgroundColor: `${currentColor.primary}20`,
              borderColor: currentColor.primary,
              color: currentColor.primary
            }}
          >
            + Create a New Animal
          </Link>

          {/* Animals Grid */}
          <div className="flex gap-8 flex-wrap justify-center items-center">
            {animals.length > 0 ? (
              animals.slice(0, 3).map((animal) => (
                <div key={animal.animalId} className="flex flex-col items-center space-y-2 group">
                  <Link
                    to={`/${colorName}/${animal.animalId}`}
                    className="w-32 h-32 rounded-full border-4 cursor-pointer
                               transition-all duration-300 ease-out
                               hover:scale-110 hover:shadow-lg
                               flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundColor: `${currentColor.primary}20`,
                      borderColor: `${currentColor.primary}60`,
                      boxShadow: `0 0 20px ${currentColor.primary}30`,
                    }}
                  >
                    <img 
                      src={animal.animalId <= 24 ? `/images/${animal.imageUrl}` : `${BASE_URL}${animal.imageUrl}`} 
                      alt={animal.name} 
                      className="w-full h-full object-cover" 
                    />
                  </Link>
                  <span className="text-white text-sm font-medium opacity-80 text-center group-hover:opacity-100 transition-opacity duration-300">
                    {animal.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-white/60">
                <p className="text-lg mb-4">No {colorName} animals yet!</p>
                <p className="text-sm">Create the first one below.</p>
              </div>
            )}

            {/* View More Arrow */}
            <div className="relative group">
              <Link
                to={`/${colorName}/all`}
                className="w-32 h-32 rounded-full border-4 cursor-pointer
                           transition-all duration-300 ease-out
                           hover:scale-110 hover:shadow-lg
                           flex items-center justify-center"
                style={{
                  backgroundColor: `${currentColor.primary}10`,
                  borderColor: `${currentColor.primary}60`,
                  boxShadow: `0 0 20px ${currentColor.primary}30`
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  className="w-8 h-8 transition-all duration-300"
                  style={{ color: currentColor.primary }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              {/* Hover Text */}
              <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300
                             bg-slate-800/90 text-white px-3 py-1 rounded-full text-sm font-medium
                             pointer-events-none whitespace-nowrap">
                View All
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPagePreview; 