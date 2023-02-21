import { CardIdea } from './components/idea/CardIdea';
import './styles/_ideas.scss';
import { useContext, useEffect } from 'react';
import { useIdeas } from '../../../../hooks/useIdeas';
import { AuthContext } from '../../../../context';

export const IdeasPage = () => {

  const { getIdeas, ideas, loader } = useIdeas();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user !== undefined) getIdeas(user?.email);
  }, [user]);


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
          className="container-ideas d-flex  justify-content-center  justify-content-xl-start   flex-wrap"
        >
          {ideas.map(idea => (<CardIdea idea={idea} key={idea.id_idea} />))}
        </div>
      </div>
    </>
  )
}
