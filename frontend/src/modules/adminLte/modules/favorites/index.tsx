import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context';
import { useCarrito } from '../../../../hooks/useCarrito';
import { useFavorites } from '../../../../hooks/useFavorites';
import { useIdeas } from '../../../../hooks/useIdeas';
import { TypeCarrito, TypeStateIdeas, TypeFavorites } from '../../../../interfaces/interfacesEndPoints';
import { IdeaSkeletonComponent } from '../../../shared/components/skeletons/ideaSkeleton/IdeaSkeletonComponent';
import { CardIdea } from '../ideas/components/idea/Card';
import iconSrc from "../../../../assets/img/iconSad.png";
import './styles/favorites.scss';

const FavoritesPage = () => {
  const [ideasCard, setIdeasCard] = useState<TypeStateIdeas[]>([]);
  const [carritoCard, setCarritoCard] = useState<TypeCarrito[]>([]);
  const [favoritesCard, setfavoritesCard] = useState<TypeFavorites[]>([]);
  const { user } = useContext(AuthContext);

  const { getIdeasFavorites, loader } = useIdeas();
  const { getFavorites, favorites } = useFavorites();
  const { getCarrito } = useCarrito();

  useEffect(() => {
    onMountedComponent();
  }, [user]);


  const onMountedComponent = async () => {
    if (user === undefined) return;
    const dataIdeas = await getIdeasFavorites(user?.email);
    const fav = await getFavorites(user?.email);
    const carr = await getCarrito(user?.email)
    setfavoritesCard(fav);
    setIdeasCard(dataIdeas);
    setCarritoCard(carr);
  }
  return (
    <>
      <div className={ideasCard.length ? "ideas px-0 px-xxl-3 mt-3 w-100 h-100" : "ideas px-0 px-xxl-3 mt-3 w-100 h-100vh d-flex flex-column justy-content-center aling-items-center"} >
        <div className="w-100 text-center d-flex flex-column align-items-center justify-content-center gap-5" >
          <h2 className="title-section mt-2 text-center text-title mt-4">
            {ideasCard.length
              ? 'Ideas Favoritas'
              : 'Aún no tienes ideas favoritas'}
          </h2>
          {!ideasCard.length && <img src={iconSrc} alt="img" width={200} />}
        </div>

        <div
          className="container-ideas w-100 d-flex m-4 gap-4 gap-xxl-5 justify-content-center  justify-content-xl-start flex-wrap"
        >
          {loader
            ? <IdeaSkeletonComponent loader={loader} />
            : ideasCard && ideasCard.map((idea, index) => (
              <CardIdea
                idea={idea}
                favorites={favoritesCard}
                carrito={carritoCard}
                key={index}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}


export default FavoritesPage;


