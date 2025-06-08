import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Animal } from '../types/Animal';
import { useEffect, useState } from 'react';
import { staticAnimals } from '../data/static-animals';
import { API_BASE_URL, BASE_URL } from '../util/BASEURL';

function DeleteAnimalPage() {
  const navigate = useNavigate();
  const { colorName, animalId } = useParams<{ colorName: string; animalId: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

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

  const handleConfirmDelete = async () => {
    if (!animalId || !colorName || !animal) return;
    
    // Static animals cannot be deleted
    if (isStatic) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/${colorName}/${animalId}/delete`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete animal');
      }

      // Store Delete achievement in localStorage
      const achievements = JSON.parse(localStorage.getItem('crudAchievements') || '{}');
      if (!achievements.delete) {
        achievements.delete = true;
        localStorage.setItem('crudAchievements', JSON.stringify(achievements));
        setShowAchievement(true);
        
        // Hide achievement banner after 3 seconds and then navigate
        setTimeout(() => {
          setShowAchievement(false);
          setTimeout(() => {
            navigate(`/${colorName}/all`, { 
              replace: true,
              state: { 
                deletedAnimal: animal.name,
                message: `${animal.name} has been deleted successfully.` 
              }
            });
          }, 500);
        }, 3000);
      } else {
        // If achievement already unlocked, navigate immediately
        navigate(`/${colorName}/all`, { 
          replace: true,
          state: { 
            deletedAnimal: animal.name,
            message: `${animal.name} has been deleted successfully.` 
          }
        });
      }
    } catch (error) {
      console.error('Error deleting animal:', error);
      alert('Failed to delete animal. Please try again.');
      setIsDeleting(false);
    }
  };

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

      {/* Achievement Banner */}
      {showAchievement && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
                        animate-pulse">
          <div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 backdrop-blur-md
                          border-2 border-red-400/60 rounded-2xl p-8 shadow-2xl shadow-red-500/30
                          flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center
                              border-2 border-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                     className="w-8 h-8 text-red-400">
                  <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                <span style={{ color: currentColor.primary }}>D</span>elete achievement unlocked!
              </h2>
              <p className="text-red-200/80 text-lg">
                Your first animal has been successfully deleted
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {showAchievement && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-2xl">
          
          {/* Delete Confirmation Card */}
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 border-2 border-slate-700/80 shadow-2xl">
            
            {/* Warning Icon */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-red-400">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Delete Animal</h1>
              <p className="text-slate-400 text-lg">This action cannot be undone</p>
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

            {/* Static Animal Warning */}
            {isStatic && (
              <div className="bg-yellow-500/20 border-2 border-yellow-500/40 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-yellow-400 font-semibold mb-1">Cannot Delete Static Animal</h3>
                    <p className="text-yellow-200 text-sm">
                      {animal.name} is a static animal and cannot be deleted. Only user-created animals can be deleted.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Confirmation Message */}
            {!isStatic && (
              <div className="text-center mb-8">
                <p className="text-white text-lg mb-2">
                  Are you sure you want to delete <span className="font-bold" style={{ color: currentColor.primary }}>{animal.name}</span>?
                </p>
                <p className="text-slate-400">
                  All information about this animal will be permanently removed from the gallery.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCancel}
                disabled={isDeleting}
                className="px-8 py-3 bg-slate-700/80 text-white rounded-full border-2 border-slate-600/80
                           hover:bg-slate-600/80 hover:border-slate-500/80 transition-all duration-300
                           text-lg font-medium tracking-wide shadow-lg disabled:opacity-50"
              >
                Cancel
              </button>
              
              {!isStatic && (
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-8 py-3 bg-red-600/80 text-white rounded-full border-2 border-red-500/80
                             hover:bg-red-500/80 hover:border-red-400/80 transition-all duration-300
                             text-lg font-medium tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center space-x-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                      </svg>
                      <span>Delete Animal</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteAnimalPage; 