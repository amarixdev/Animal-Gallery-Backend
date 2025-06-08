import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Animal } from '../types/Animal';
import { useEffect, useState } from 'react';
import { staticAnimals } from '../data/static-animals';
import { API_BASE_URL, BASE_URL } from '../util/BASEURL';

function UpdateConfirmationPage() {
  const navigate = useNavigate();
  const { colorName, animalId } = useParams<{ colorName: string; animalId: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);

  const isStatic = animalId && parseInt(animalId) <= staticAnimals.length;

  useEffect(() => {
    if (isStatic) {
      const staticAnimal = staticAnimals.find((animal) => animal.animalId === parseInt(animalId!));
      if (staticAnimal) {
        setAnimal(staticAnimal);
      } else {
        navigate(`/${colorName}/all`, { replace: true });
      }
    } else {
      const fetchAnimal = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/${colorName}/${animalId}`);
          if (!response.ok) {
            navigate(`/${colorName}/all`, { replace: true });
            return;
          }
          const data = await response.json();
          if (data) {
            setAnimal(data);
          } else {
            navigate(`/${colorName}/all`, { replace: true });
          }
        } catch (error) {
          console.error('Error fetching animal:', error);
          navigate(`/${colorName}/all`, { replace: true });
        }
      };
      fetchAnimal();
    }
  }, [animalId, colorName, navigate, isStatic]);

  const handleCancel = () => {
    navigate(`/${colorName}/${animalId}`);
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

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-900">
        <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full"></div>
      </div>
    );
  }

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

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-2xl">
          
          {/* Update Confirmation Card */}
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 border-2 border-slate-700/80 shadow-2xl">
            
            {/* Warning Icon */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-yellow-400">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Cannot Update Animal</h1>
              <p className="text-slate-400 text-lg">Static animals cannot be modified</p>
            </div>

            {/* Animal Info */}
            <div className="flex items-center space-x-6 mb-8 p-6 bg-slate-700/50 rounded-2xl">
              <div 
                className="w-20 h-20 rounded-full border-3 overflow-hidden flex-shrink-0"
                style={{
                  backgroundColor: `${currentColor.primary}20`,
                  borderColor: `${currentColor.primary}60`,
                }}
              >
                <img 
                  src={isStatic ? `/images/${animal.imageUrl}` : `${BASE_URL}${animal.imageUrl}`} 
                  alt={animal.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">{animal.name}</h2>
                <p className="text-slate-400 italic">{animal.scientificName}</p>
                <div 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium capitalize mt-2"
                  style={{ 
                    backgroundColor: `${currentColor.primary}20`,
                    color: currentColor.primary
                  }}
                >
                  {animal.color}
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-yellow-500/20 border-2 border-yellow-500/40 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-yellow-400 font-semibold mb-1">Cannot Update Static Animal</h3>
                  <p className="text-yellow-200 text-sm">
                    {animal.name} is a static animal and cannot be updated. Only user-created animals can be modified.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={handleCancel}
                className="px-8 py-3 bg-slate-700/80 text-white rounded-full border-2 border-slate-600/80
                           hover:bg-slate-600/80 hover:border-slate-500/80 transition-all duration-300
                           text-lg font-medium tracking-wide shadow-lg"
              >
                Back to Animal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateConfirmationPage; 