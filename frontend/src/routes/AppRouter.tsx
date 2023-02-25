import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const NotFoundPage = lazy(() => import('../modules/shared/components/notFoundPage/NotFoundPage'));
const LoginPage = lazy(() => import('../modules/auth/'));
const AdminLte = lazy(() => import('../modules/adminLte/'));
const IdeasPage = lazy(() => import('../modules/adminLte/modules/ideas'));
const FavoritesPage = lazy(() => import('../modules/adminLte/modules/favorites'));


export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route index path="/login" element={<LoginPage />} />
        <Route index path="*" element={<NotFoundPage />} />
        <Route path="/" element={<AdminLte />}>
          <Route index element={<IdeasPage />} />
          <Route path='favoritos' element={<FavoritesPage />} />
        </Route>
      </Routes>
    </>
  );
}
