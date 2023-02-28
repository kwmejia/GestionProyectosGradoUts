import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../context';
import { TypeCarrito, TypeFavorites, TypeStateIdeas } from '../../../../interfaces/interfacesEndPoints';
import { useIdeas } from '../../../../hooks/useIdeas';
import { useFavorites } from '../../../../hooks/useFavorites';
import { useCarrito } from '../../../../hooks/useCarrito';
import { IdeaSkeletonComponent } from '../../../shared/components/skeletons/ideaSkeleton/IdeaSkeletonComponent';
import { CardIdea } from '../ideas/components/idea/Card';
import iconSrc from "../../../../assets/img/iconSad.png";

const CarritoPage = () => {
  const [ideasCard, setIdeasCard] = useState<TypeStateIdeas[]>([]);
  const [carritoCard, setCarritoCard] = useState<TypeCarrito[]>([]);
  const [favoritesCard, setfavoritesCard] = useState<TypeFavorites[]>([]);
  const [existIdeas, setExistIdeas] = useState<boolean>();
  const { user } = useContext(AuthContext);

  const { getIdeasFavorites, loaderIdeasFavorites } = useIdeas();
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
      <div className={ideasCard.length ? "ideas px-0 px-xxl-3 mt-3 w-100 h-100 fadeIn " : "ideas px-0 px-xxl-3 mt-3 w-100 h-100vh d-flex flex-column justy-content-center aling-items-center fadeIn "} >
        <div className="w-100 text-center d-flex flex-column align-items-center justify-content-center gap-5 fadeIn " >
          <h2 className="title-section mt-2 text-center text-title mt-4">
            {carritoCard.length
              ? 'Carrito de compras'
              : 'Aún no tienes una idea en el carrito'}
          </h2>
          {!carritoCard.length && <img src={iconSrc} alt="img" width={200} />}
        </div>

        <div
          className="container-ideas w-100 d-flex m-4 gap-4 gap-xxl-5 justify-content-center   flex-wrap"
        >
          {loaderIdeasFavorites
            ? <IdeaSkeletonComponent loader={loaderIdeasFavorites} />
            : ideasCard && carritoCard.map((idea, index) => (
              <CardIdea
                idea={idea}
                favorites={favoritesCard}
                carrito={carritoCard}
                key={index}
              />
            ))
          }
        </div>
        {carritoCard.length &&
          (
            <div className="text-center">
              <a
                href="https://gdeco.uts.edu.co/pagosuts/info.php?bulletProofEco=953b93636d18ede47a869c67e131de41"
                target="_blank"
                className="btn btn-primary">Finalizar Compra</a>
            </div>
          )}
      </div>
    </>
  )
}

export default CarritoPage;