import { CardIdea } from './components/idea/Card';
import './styles/_ideas.scss';
import { useContext, useEffect, useState } from 'react';
import { useIdeas } from '../../../../hooks/useIdeas';
import { AuthContext } from '../../../../context';
import { useFavorites } from '../../../../hooks/useFavorites';
import { IdeaSkeletonComponent } from '../../../shared/components/skeletons/ideaSkeleton/IdeaSkeletonComponent';
import { TypeStateIdeas, TypeCarrito } from '../../../../interfaces/interfacesEndPoints';
import { useCarrito } from '../../../../hooks/useCarrito';

const IdeasPage = () => {

  const [favoritesCard, setfavoritesCard] = useState([]);
  const [ideasCard, setIdeasCard] = useState<TypeStateIdeas[]>([]);
  const [searchCard, setSearchCard] = useState('');
  const [carritoCard, setCarritoCard] = useState<TypeCarrito[]>([])
  const { user } = useContext(AuthContext);

  const { getIdeas, ideas, loader } = useIdeas();
  const { getFavorites } = useFavorites();
  const { getCarrito } = useCarrito();

  useEffect(() => {
    onMountedComponent();
  }, [user]);


  const onMountedComponent = async () => {
    if (user === undefined) return;
    const dataIdeas = await getIdeas(user?.email);
    const fav = await getFavorites(user?.email);
    const carr = await getCarrito(user?.email)
    setfavoritesCard(fav);
    setIdeasCard(dataIdeas);
    setCarritoCard(carr);
  }

  const filterCards = (filterValue: any) => {
    if (filterValue === '') {
      setIdeasCard(ideas);
      return
    }
    setSearchCard(filterValue)
    setIdeasCard(ideas.filter(idea => idea.nombre_idea?.trim().toLowerCase().includes(searchCard.trim().toLowerCase())))
  }

  return (
    <>
      <div className="ideas px-0 px-xxl-3 mt-3">
        <h2 className="title-section mt-2 text-center text-title mt-4">Ideas Propuestas</h2>
        <div className="mt-3  d-flex  justify-content-center  justify-content-xl-start  w-100 px-4">
          <div className="inputBox ms-4">
            <input type="text" required onChange={(e) => filterCards(e.target.value)} />
            <span>Buscar</span>
          </div>
        </div>
        <div
          className="container-ideas w-100 d-flex m-4 gap-4 gap-xxl-5 justify-content-center  justify-content-xl-start   flex-wrap"
        >
          {loader
            ? <IdeaSkeletonComponent loader={loader} />
            : ideasCard.map((idea, index) => (
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
  )
}

export default IdeasPage;