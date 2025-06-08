import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { type Animal } from '../types/Animal';
import { staticAnimals } from '../data/static-animals';
import { API_BASE_URL, BASE_URL } from '../util/BASEURL';




function ColorAnimalsPage() {
  const navigate = useNavigate();
  const { colorName } = useParams<{ colorName: string }>();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // This flag is used to prevent state updates after the component has unmounted,
    // which is a scenario that can happen in React's StrictMode or with fast navigation.
    let isCancelled = false;

    const fetchAnimals = async () => {
      console.log("Fetching animals for:", colorName);
      if (!colorName) return;

      // Start with the static animals for the given color
      const staticColorAnimals = staticAnimals.filter((animal: Animal) => animal.color === colorName);

      try {
        const response = await fetch(`${API_BASE_URL}/${colorName}/all`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedAnimals: Animal[] = await response.json();
        
        if (!isCancelled) {
          // Combine static and fetched animals.
          // Using a Map ensures that there are no duplicates if an animal exists in both static and fetched data.
          const allAnimalsMap = new Map();
          staticColorAnimals.forEach(animal => allAnimalsMap.set(animal.animalId, animal));
          fetchedAnimals.forEach((animal: Animal) => allAnimalsMap.set(animal.animalId, animal));

          setAnimals(Array.from(allAnimalsMap.values()));
          console.log("Animals: ", allAnimalsMap.values())
        }
      } catch (error) {
        console.error('Error fetching animals:', error);
        if (!isCancelled) {
          // If the fetch fails, we at least have the static animals to show.
          setAnimals(staticColorAnimals);
        }
      }
    };

    fetchAnimals();

    // The cleanup function will run when the component unmounts or before the effect runs again.
    return () => {
      isCancelled = true;
    };
  }, [colorName]);

  // Filter animals based on search term
  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
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
    white: { primary: '#ffffff', subtle: '#333333' },
  };

  const defaultColor = { primary: '#8b5cf6', subtle: '#2e1e4e' };
  const currentColor = colorMap[colorName?.toLowerCase() || ''] || defaultColor;

  const placeholderCount = Math.max(0, 16 - filteredAnimals.length);
  const placeholders = Array.from({ length: placeholderCount }, (_, index) => ({
    id: `placeholder-${index}`,
  }));

  return (
    <div
      className="min-h-screen flex flex-col p-8 transition-[background] duration-1000 ease-in-out relative"
      style={{
        background: `linear-gradient(to bottom right, ${currentColor.subtle}, #000, ${currentColor.subtle})`,
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
        <h1 className="text-6xl font-bold text-white uppercase tracking-widest
                       bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent
                       md:text-5xl sm:text-4xl">
          All {colorName} Animals
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
              style={
                {
                  '--tw-ring-color': `${currentColor.primary}80`,
                  borderColor: `${currentColor.primary}80`,
                } as React.CSSProperties
              }
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5 space-x-2">
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
        </div>

        {/* Results count */}
        <p className="text-slate-400 text-sm">
          {searchTerm 
            ? `Showing ${filteredAnimals.length} of ${animals.length} ${colorName?.toLowerCase()} animals`
            : `${animals.length} ${colorName?.toLowerCase()} animals`
          }
        </p>
      </div>

      {/* Animals Grid */}
      <div className="flex-1">
        {filteredAnimals.length === 0 && searchTerm ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No {colorName?.toLowerCase()} animals found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-6 gap-y-10 max-w-7xl mx-auto">
            {filteredAnimals.map((animal) => (
              <div key={animal.animalId} className="flex flex-col items-center space-y-2 group">
                {/* Animal Circle */}
                <Link
                  to={`/${colorName}/${animal.animalId}`}
                  className="w-24 h-24 rounded-full border-4 cursor-pointer
                             transition-all duration-300 ease-out
                             hover:scale-110 hover:shadow-lg
                             flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: `${currentColor.primary}20`,
                    borderColor: `${currentColor.primary}60`,
                    boxShadow: `0 0 20px ${currentColor.primary}30`,
                  }}
                >
                  <img src={ animal.animalId <= 24 ? `/images/${animal.imageUrl}` : `${BASE_URL}${animal.imageUrl}`} alt={animal.name} className="w-full h-full object-cover" />
                </Link>

                {/* Animal Name */}
                <span className="text-white text-sm font-medium opacity-80 text-center group-hover:opacity-100 transition-opacity duration-300">
                  {animal.name}
                </span>
              </div>
            ))}
            {!searchTerm && placeholders.map((placeholder) => (
              <div key={placeholder.id} className="flex flex-col items-center space-y-2 group">
                <Link
                  to={`/${colorName}/create`}
                  className="w-24 h-24 rounded-full border-4 border-dashed flex items-center justify-center cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg hover:border-solid hover:bg-opacity-30"
                  style={{
                    backgroundColor: `${currentColor.primary}10`,
                    borderColor: `${currentColor.primary}40`,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: `${currentColor.primary}` }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </Link>
                <span className="text-white text-sm font-medium opacity-60 text-center group-hover:opacity-100 transition-opacity duration-300">
                  Add New
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-12">
          {/* Add Animal Button */}
          <Link
            to={`/${colorName}/create`}
            className="px-8 py-4 text-xl font-bold text-white rounded-full border-2
                       transition-all duration-300 ease-out
                       hover:scale-105 hover:shadow-lg uppercase tracking-wider inline-block"
            style={{
              backgroundColor: `${currentColor.primary}30`,
              borderColor: currentColor.primary,
              color: currentColor.primary,
            }}
          >
            + Create {colorName} Animal
          </Link>

          {/* View All Colors Button */}
          <Link
            to="/all"
            className="px-8 py-4 text-xl font-bold text-white rounded-full border-2
                       transition-all duration-300 ease-out
                       hover:scale-105 hover:shadow-lg uppercase tracking-wider inline-block
                       bg-slate-800/50 border-slate-700/80 hover:bg-slate-700/50 hover:border-slate-600/80"
          >
            View All Colors
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ColorAnimalsPage; 