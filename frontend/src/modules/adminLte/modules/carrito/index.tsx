import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../context';
import { TypeCarrito, TypeFavorites, TypeStateIdeas } from '../../../../interfaces/interfacesEndPoints';
import { useIdeas } from '../../../../hooks/useIdeas';
import { useFavorites } from '../../../../hooks/useFavorites';
import { useCarrito } from '../../../../hooks/useCarrito';
import iconSrc from "../../../../assets/img/iconSad.png";
import { AccordionIdea } from './components/accordionIdea/AccordionIdea';
import { ActionsCarrito } from './components/actionsCarrito/ActionsCarrito';
import { Roles } from '../../../../interfaces/enumRoles';
import { useNavigate } from 'react-router-dom';

const CarritoPage = () => {
  const [ideasCard, setIdeasCard] = useState<TypeStateIdeas[]>([]);
  const [carritoCard, setCarritoCard] = useState<TypeCarrito[]>([]);
  const [favoritesCard, setfavoritesCard] = useState<TypeFavorites[]>([]);
  const [existIdeas, setExistIdeas] = useState<boolean>();
  const { user } = useContext(AuthContext);

  const { getIdeasFavorites, loaderIdeasFavorites } = useIdeas();
  const { getFavorites, favorites } = useFavorites();
  const { getCarrito } = useCarrito();
  const navigate = useNavigate();
  useEffect(() => {
    onMountedComponent();
  }, [user]);


  const onMountedComponent = async () => {
    if (user?.rol == Roles.ADMIN) {
      navigate("/estadisticas");
    }

    if (user?.rol == Roles.TEACHER) {
      navigate("/mis-ideas");
    }
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
          className="w-100 row mt-4 flex-wrap"
        >
          <div className="col-md-8 px-5">
            {carritoCard?.length ? <AccordionIdea
              idea={carritoCard[0]}
            />
              : ''}
          </div>
          <div className="col-md-4 ps-0 d-flex justify-content-center">
            {carritoCard.length ?
              <ActionsCarrito
                idea={carritoCard[0]}
                carrito={carritoCard}
              />
              : ''
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default CarritoPage;