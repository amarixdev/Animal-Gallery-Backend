import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ColorPage from './pages/ColorPage';
import AddAnimalPage from './pages/AddAnimalPage';
import AllAnimalsPage from './pages/AllAnimalsPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/all" element={<AllAnimalsPage />} />
      <Route path="/:colorName" element={<ColorPage />} />
      <Route path="/:colorName/create" element={<AddAnimalPage />} />
    </Routes>
  );
}

export default App;
