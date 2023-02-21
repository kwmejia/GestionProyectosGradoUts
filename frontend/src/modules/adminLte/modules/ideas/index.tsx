import { CardIdea } from './components/idea/CardIdea';
import './styles/_ideas.scss';

export const IdeasPage = () => {
  return (
    <>

      <div className="ideas">
        <h2 className="title-section f-16 mt-2">Ideas Propuestas</h2>
        <div className="container-ideas">
          <CardIdea />
          <CardIdea />
          <CardIdea />
          <CardIdea />
          <CardIdea />
          <CardIdea />
        </div>
      </div>
    </>
  )
}
