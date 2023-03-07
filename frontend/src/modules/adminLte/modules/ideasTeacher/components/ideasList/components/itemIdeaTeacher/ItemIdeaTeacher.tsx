import { useEffect, useContext } from 'react';
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
import './itemIdea.scss';

export const ItemIdeaTeacher = () => {

  const { user } = useContext(AuthContext);
  useEffect(() => {
    mountedComponent();
  }, [])

  const mountedComponent = async () => {

  }

  const handleDeleteIdea = () => {

  }


  const alertDeleteIdea = () => {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar esta idea?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#0B4A75"

    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteIdea();
      }
    })
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
    <div className="accordion accordion-flush w-100" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            <div className="d-flex align-items-center gap-2">
              <Avatar src={user?.avatar} aria-label="Foto Profesor" />
              <div className="mx-2">
                <p>nombre_idea</p>
              </div>
            </div>
          </button>
        </h2>
        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body row">
            <h4>nombre_idea</h4>
            <Col md={6}>
              <p className="my-2"> <span>Docente: </span> userDirector.displayName</p>
              <p className="my-2"> <span>Tipo de idea: </span> </p>
              {/* <p className={`${nombre} tag`}>{nombre}</p> */}
              <p className="my-2"> <span>Fecha idea propuesta:</span> fecha</p>
              <p className="my-2"> <span>Correo:</span> id_azure_docente_correo</p>
              <p className="my-2"><span>Descripción: </span></p>
              <p className="my-2">
                descripcion_idea
              </p>
            </Col>
            <Col md={6}>
              <p className="my-2"> <span>Estado de la idea: </span></p>

              <div className="cont-line-time mb-5 mt-3">
                <LineTimeProgress />
              </div>

              <hr />
              <div className="mt-4 d-flex gap-4">
                <LightTooltip title="Editar idea" placement="bottom">
                  <Fab color="primary" aria-label="edit">
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
          </div>
        </div>
      </div>

    </div>
  )
}
