import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../../context';
import { useFavorites } from '../../../../hooks/useFavorites';
import { CardIdea } from '../ideas/components/idea/Card';
import './styles/favorites.scss';

const FavoritesPage = () => {
  const { user } = useContext(AuthContext);
  const { favorites, getFavorites } = useFavorites();
  useEffect(() => {
    getFavorites(user?.email);
  }, []);

  return (
    <div className="favorites">
      <h1 className="text-center f">Mis Ideas Favoritas</h1>
      <div className="w-100">
        {favorites && favorites.map(favorite => (
          <code key={favorite?.id_ideaFav}>{JSON.stringify(favorite)}</code>
        ))}
      </div>
    </div>
  );
}


export default FavoritesPage;