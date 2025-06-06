import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ColorPage from './pages/ColorPage';
import AddAnimalPage from './pages/AddAnimalPage';
import AllAnimalsPage from './pages/AllAnimalsPage';
import ColorAnimalsPage from './pages/ColorAnimalsPage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/all" element={<AllAnimalsPage />} />
      <Route path="/:colorName" element={<ColorPage />} />
      <Route path="/:colorName/all" element={<ColorAnimalsPage />} />
      <Route path="/:colorName/create" element={<AddAnimalPage />} />
      <Route path="/:colorName/:animalId" element={<AnimalDetailPage />} />
    </Routes>
  );
}

export default App;
