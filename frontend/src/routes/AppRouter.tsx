import { Routes, Route } from 'react-router-dom';
import { AdminLte, LoginPage } from '../modules/';
import { IdeasPage } from '../modules/adminLte/modules/ideas'
import { FavoritesPage } from '../modules/adminLte/modules/favorites'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route index path="/login" element={<LoginPage />} />
        <Route path="/" element={<AdminLte />}>
          <Route index element={<IdeasPage />} />
          <Route path='favoritos' element={<FavoritesPage />} />
        </Route>
      </Routes>
    </>
  );
}
