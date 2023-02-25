import { CardIdea } from './components/idea/Card';
import './styles/_ideas.scss';
import { useContext, useEffect, useState } from 'react';
import { useIdeas } from '../../../../hooks/useIdeas';
import { AuthContext } from '../../../../context';
import { useFavorites } from '../../../../hooks/useFavorites';
import { IdeaSkeletonComponent } from '../../../shared/components/skeletons/ideaSkeleton/IdeaSkeletonComponent';

const IdeasPage = () => {

  const [favoritesCard, setfavoritesCard] = useState([]);
  const { getIdeas, ideas, loader } = useIdeas();
  const { user } = useContext(AuthContext);
  const { getFavorites } = useFavorites();


  useEffect(() => {
    onMountedComponent();
  }, [user]);


  const onMountedComponent = async () => {
    if (user === undefined) return;
    await getIdeas(user?.email);
    const fav = await getFavorites(user?.email);
    setfavoritesCard(fav);
  }

  return (
    <>
      <div className="ideas px-0 px-xxl-3 mt-3">
        <h2 className="title-section mt-2 text-center text-title mt-4">Ideas Propuestas</h2>
        <div className="mt-3 d-flex  justify-content-center  justify-content-xl-start  w-100 px-4">
          <div className="inputBox">
            <input type="text" required />
            <span>Buscar</span>
          </div>
        </div>
        <div
          className="container-ideas w-100 d-flex m-4 gap-4 gap-xxl-5 justify-content-center  justify-content-xl-start   flex-wrap"
        >
          {loader
            ? <IdeaSkeletonComponent loader={loader} />
            : ideas.map(idea => (<CardIdea idea={idea} favorites={favoritesCard} key={idea.id_idea} />))}

        </div>
      </div>
    </>
  )
}

export default IdeasPage;