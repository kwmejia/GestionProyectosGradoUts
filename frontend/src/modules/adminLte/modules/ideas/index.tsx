import { useContext, useEffect, useState } from 'react';
import { CardIdea } from './components/idea/Card';
import { useIdeas } from '../../../../hooks/useIdeas';
import { AuthContext } from '../../../../context';
import { useFavorites } from '../../../../hooks/useFavorites';
import { IdeaSkeletonComponent } from '../../../shared/components/skeletons/ideaSkeleton/IdeaSkeletonComponent';
import { TypeStateIdeas, TypeCarrito } from '../../../../interfaces/interfacesEndPoints';
import { useCarrito } from '../../../../hooks/useCarrito';
import { FilterTag } from './components/filterTag/FilterTag';
import './styles/_ideas.scss';
import { TextField } from '@mui/material';

const IdeasPage = () => {

  const [favoritesCard, setfavoritesCard] = useState([]);
  const [typeName, setTypeName] = useState<string>('');
  const [ideasCard, setIdeasCard] = useState<TypeStateIdeas[]>([]);
  const [searchCard, setSearchCard] = useState('');
  const [carritoCard, setCarritoCard] = useState<TypeCarrito[]>([])
  const { user } = useContext(AuthContext);

  const { getIdeas, ideas, loader } = useIdeas();
  const { getFavorites } = useFavorites();
  const { getCarrito } = useCarrito();

  useEffect(() => {
    onMountedComponent();
  }, [user, typeName]);


  const onMountedComponent = async () => {
    if (user === undefined) return;
    const dataIdeas = await getIdeas(user?.email);
    const fav = await getFavorites(user?.email);
    const carr = await getCarrito(user?.email)
    setfavoritesCard(fav);
    setIdeasCard(dataIdeas);
    setCarritoCard(carr);
    if (typeName === '') return;
    filterCardsByType();
  }

  const filterCards = (filterValue: any) => {
    if (filterValue === '') {
      setIdeasCard(ideas);
      return
    }
    setSearchCard(filterValue)
    setIdeasCard(ideas.filter(idea => idea.nombre_idea?.trim().toLowerCase().includes(searchCard.trim().toLowerCase())))
  }

  const filterCardsByType = () => {
    console.log(typeName)
    setIdeasCard(ideas.filter(idea => idea.nombre?.trim().toLowerCase().includes(typeName.trim().toLowerCase())))
  }



  return (
    <>
      <div className="ideas px-0 px-xxl-3 my-3">
        <h2 className="title-section mt-2 text-center text-title mt-4">Ideas Propuestas</h2>
        <div className="mt-3  d-flex flex-wrap justify-content-center  justify-content-xl-start align-items-center  w-100 px-4">
          <div className=" ms-5">
            {/* <input type="text" required onChange={(e) => filterCards(e.target.value)} /> */}
            <TextField
              label="Buscar"
              variant="outlined"
              size='small'
              onChange={(e) => filterCards(e.target.value)}
            />
          </div>

          <FilterTag
            typeName={typeName}
            setTypeName={setTypeName}
          />

        </div>
        <div
          className={"container-ideas w-100 d-flex mt-4 mx-4 gap-4 gap-xxl-5 justify-content-center  justify-content-xl-start   flex-wrap"}
        >
          {loader
            ? <IdeaSkeletonComponent loader={loader} />
            : ideasCard.length
              ? ideasCard.map((idea, index) => (
                <CardIdea
                  idea={idea}
                  favorites={favoritesCard}
                  carrito={carritoCard}
                  key={index}
                />
              ))
              : <h1 className=" mt-5 pt-5 text-center w-100" style={{ color: '#AAAAAA', lineHeight: 1.4 }}>No se han <br /> encontrado ideas <br /> ☹</h1>
          }
        </div>
      </div>
    </>
  )
}

export default IdeasPage;