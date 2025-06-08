import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ColorPage from './pages/ColorPagePreview';
import AddAnimalPage from './pages/CreateAnimalPage';
import AllAnimalsPage from './pages/AllAnimalsPage';
import ColorAnimalsPage from './pages/ColorPageAll';
import AnimalDetailPage from './pages/AnimalDetailPage';
import UpdateAnimalPage from './pages/UpdateAnimalPage';
import UpdateConfirmationPage from './pages/UpdateConfirmationPage';
import DeleteAnimalPage from './pages/DeleteAnimalPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/all" element={<AllAnimalsPage />} />
      <Route path="/:colorName" element={<ColorPage />} />
      <Route path="/:colorName/all" element={<ColorAnimalsPage />} />
      <Route path="/:colorName/create" element={<AddAnimalPage />} /> //POST
      <Route path="/:colorName/:animalId" element={<AnimalDetailPage />} /> //GET
      <Route path="/:colorName/:animalId/update-confirm" element={<UpdateConfirmationPage />} /> //UPDATE CONFIRM
      <Route path="/:colorName/:animalId/update" element={<UpdateAnimalPage />} /> //PUT
      <Route path="/:colorName/:animalId/delete" element={<DeleteAnimalPage />} /> //DELETE
    </Routes>
  );
}

export default App;
