import { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { TypeCarrito, TypeFavorites, TypeStateIdeas } from '../../../../../../interfaces/interfacesEndPoints';
import AzureGraphServices from '../../../../../../config/AzureGraphServices';
import './accordions.scss';
import formatDate from '../../../../../../helpers/formatDate';


interface PropsAccordion {
  idea: TypeStateIdeas;
}

interface TypeDirector {
  displayName?: string;
}

export const AccordionIdea = ({ idea }: PropsAccordion) => {

  const [urlPhoto, setUrlPhoto] = useState('');
  const [userDirector, setuserDirector] = useState<TypeDirector>({});
  const { nombre_idea, fecha_creacion, id_azure_docente_correo, id_idea, descripcion_idea, nombre } = idea;

  useEffect(() => {
    mountedComponent();
  }, [])

  const mountedComponent = async () => {
    await getPhotoOtherUser();
    await getInfoTeacher();
  }

  const getPhotoOtherUser = async () => {
    const urlPhotoObj = await AzureGraphServices.getUserPhotoAsync(id_azure_docente_correo as string);
    const url: string = urlPhotoObj as string;
    setUrlPhoto(url);
  }

  const getInfoTeacher = async () => {
    const teacher = await AzureGraphServices.getUserByEmail(id_azure_docente_correo as string);
    setuserDirector(teacher);
  }

  return (
    <div className="accordion accordion-flush w-100" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            <div className="d-flex align-items-center gap-2">
              <Avatar src={urlPhoto} aria-label="recipe" />
              <div className="mx-2">
                <p>{nombre_idea}</p>
              </div>
            </div>
          </button>
        </h2>
        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body">
            <div>
              <h4>{nombre_idea}</h4>
              <p className="my-2"> <span>Docente: </span> {userDirector.displayName}</p>
              <p className="my-2"> <span>Tipo de idea: </span> </p>
              <p className={`${nombre} tag`}>{nombre}</p>
              <p className="my-2"> <span>Fecha idea propuesta:</span> {formatDate(fecha_creacion)}</p>
              <p className="my-2"> <span>Correo:</span> {id_azure_docente_correo}</p>
              <p className="my-2"><span>Descripción: </span></p>
              <p className="my-2" dangerouslySetInnerHTML={{ __html: descripcion_idea as string }}>

              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
