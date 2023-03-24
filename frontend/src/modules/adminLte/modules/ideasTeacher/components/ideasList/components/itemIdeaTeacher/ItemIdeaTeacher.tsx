import { useEffect, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, styled, Tooltip } from '@mui/material';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Col } from 'reactstrap';
import { AuthContext } from '../../../../../../../../context/AuthContext';
import { LineTimeProgress } from '../lineTimeProgress/LineTimeProgress';
import { TypeIdeasTeacher } from '../../../../../../../../interfaces/interfacesEndPoints';
import './itemIdea.scss';
import { useIdeasTeacher } from '../../../../../../../../hooks/useIdeasTeacher';
import { useNavigate } from 'react-router-dom';
import { useIdeasTaken } from '../../../../../../../../hooks';
import clientHTTP from '../../../../../../../../api/configAxios';

interface PropsItemIdeaTeacher {
  idea: TypeIdeasTeacher;
  updateComponent: any;
  index: number;
}

export const ItemIdeaTeacher = ({ idea, updateComponent, index }: PropsItemIdeaTeacher) => {

  const [isTaken, setIsTaken] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { nombre_idea, nombre, id_azure_docente_correo, fecha_creacion, descripcion_idea, aprovado, id_idea } = idea;
  const { deleteIdeaTeacher } = useIdeasTeacher();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) mountedComponent();
  }, [user, idea])

  const mountedComponent = async () => {
    try {
      const { data } = await clientHTTP.get(`/getIdeaTomadaId?id=${idea.id_idea}`);
      data.length ? setIsTaken(true) : setIsTaken(false)
    } catch (error) {
    }
  }

  const handleDeleteIdea = async () => {

    await deleteIdeaTeacher(id_idea as number);
    Swal.fire({
      title: "La idea fue eliminada exitosamente",
      icon: 'success',
      toast: true,
      timer: 5000,
      showConfirmButton: false,
      iconColor: "#c3d730",
      position: "bottom-end"
    });
    updateComponent();
  }


  const alertDeleteIdea = () => {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar esta idea?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#0B4A75",
      cancelButtonText: "Cancelar"

    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteIdea();
      }
    })
  }

  const onUpdateIdea = () => {
    navigate(`/editar-idea/${id_idea}`);
  }

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: '#344563',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  return (
    <div className="accordion accordion-flush w-100 my-3" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${id_idea}`} aria-expanded="false" aria-controls="flush-collapseOne">
            <div className="d-flex align-items-center gap-2">
              <Avatar aria-label="Foto Profesor"  > {index}</Avatar>
              <div className="mx-2">
                <p>{nombre_idea}</p>
              </div>
            </div>
          </button>
        </h2>
        <div id={`flush-collapseOne${id_idea}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body row">
            <h4 className="text-second">{nombre_idea}</h4>
            <Col md={6}>
              <p className="my-2"> <span>Docente: </span> <br /> {user?.displayName}</p>
              <Avatar src={user?.avatar} aria-label="Foto Profesor" />
              <p className="my-2"> <span>Tipo de idea: </span> </p>
              <p className={`${nombre} tag`}>{nombre}</p>
              <p className="my-2"> <span>Fecha idea propuesta: </span>{fecha_creacion?.substr(0, 10)}</p>
              <p className="my-2"> <span>Correo:</span> {id_azure_docente_correo}</p>

            </Col>
            <Col md={6}>
              <p className="my-2"> <span>Estado de la idea: </span></p>

              <div className="cont-line-time mb-5 mt-3">
                <LineTimeProgress
                  approved={aprovado as boolean}
                  taken={isTaken}
                />
              </div>

              <hr className="w-75" />
              <div className="mt-4 d-flex gap-4">
                <LightTooltip title="Editar idea" placement="bottom">
                  <Fab color="primary" aria-label="edit" onClick={onUpdateIdea}>
                    <EditIcon color="secondary" />
                  </Fab>
                </LightTooltip>
                <LightTooltip title="Eliminar idea" placement="bottom">
                  <Fab color="error" aria-label="edit" onClick={alertDeleteIdea}>
                    <DeleteIcon color="secondary" />
                  </Fab>
                </LightTooltip>
              </div>
            </Col>
            <p className="my-2"><span>Descripción: </span></p>
            <div className="my-2 pe-5" dangerouslySetInnerHTML={{ __html: descripcion_idea as string }}>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
