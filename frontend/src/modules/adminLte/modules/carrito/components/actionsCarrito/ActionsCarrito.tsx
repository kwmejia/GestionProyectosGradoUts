import { useContext, useState, useEffect } from 'react';
import { Button, styled, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DeleteIcon from '@mui/icons-material/Delete';
import SwipeUpIcon from '@mui/icons-material/SwipeUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { TypeCarrito, TypeStateIdeas } from '../../../../../../interfaces/interfacesEndPoints';
import { paramsIdeaTaken, useIdeasTaken } from '../../../../../../hooks/useIdeasTaken';
import { useCarrito } from '../../../../../../hooks/useCarrito';
import { AuthContext } from '../../../../../../context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './actionsCarrito.scss';


interface PropsAction {
  idea: TypeStateIdeas;
  carrito: TypeCarrito[];
}


export const ActionsCarrito = ({ idea, carrito }: PropsAction) => {

  const [isTaken, setIsTaken] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { deleteCarrito } = useCarrito();
  const { insertIdeaTaken, isLoadingIdeasTaken, getIdeaTakenById, ideaTaken } = useIdeasTaken();
  const { id_idea } = idea;


  useEffect(() => {
    onMounted();
  }, [isTaken]);

  const onMounted = async () => {
    const exitsIdea = await getIdeaTakenById(id_idea as number);
    if (exitsIdea.length) {
      setIsTaken(true);
    }
  }

  const handleDeleteCarrito = async () => {
    try {
      await deleteCarrito(user?.email, id_idea as number);
      Swal.fire({
        title: 'Carrito limpiado correctamente',
        icon: 'success',
        color: "#344563",
        toast: true,
        position: 'bottom-end',
        timer: 5000,
        showConfirmButton: false,
        iconColor: "#c3d730"
      });
      navigate("/");
    } catch (error) {
      Swal.fire({ title: 'Ocurrió un error al limpiar el carrito', icon: 'error' })
    }
  }

  const handleTakeIdea = async () => {
    const data: paramsIdeaTaken = { state: 0, cooldown: '', email: user?.email, idIdea: id_idea, date: '' }
    await insertIdeaTaken(data);
    setIsTaken(true);
    Swal.fire({
      title: 'Idea Tomada Correctamente',
      icon: 'success',
      color: "#344563",
      toast: true,
      position: 'bottom-end',
      timer: 5000,
      showConfirmButton: false,
      iconColor: "#c3d730"
    });
  }

  const handleBuyIdea = () => {
    const ancle = document.createElement("a");
    ancle.href = "https://gdeco.uts.edu.co/pagosuts/info.php?bulletProofEco=4faff57c92dbb7bdb41ba6a8779a5ef4";
    ancle.target = "_blanck";
    ancle.click();
    ancle.remove();
  }

  const alertConfirmDelete = () => {
    Swal.fire({
      title: '¿Estás seguro que quieres eliminar esta idea del carrito?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: "#dc2626",
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteCarrito();
      }
    })
  }

  const alertConfirmTakeIdea = () => {
    Swal.fire({
      title: '¿Estás seguro que quieres tomar esta idea?',
      text: 'Después de tomar esta idea tendrás que hacer el respectivo pago y no podrás comprar más ideas hasta que tu pago sea revisado.',
      showCancelButton: true,
      confirmButtonText: 'Tomar idea',
      confirmButtonColor: "#0B4A75",
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        handleTakeIdea();
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
    <div className="cont-action mt-1">
      <h5 className="text-center ">Información</h5>

      <div className="mt-3">
        <LightTooltip title="Nombre estudiante" placement="right" style={{ background: "#fff" }}>
          <div className="text-des name-user"><PersonIcon color="primary" /> {user?.displayName.toLowerCase()}</div>
        </LightTooltip>
        <LightTooltip title="Correo estudiante" placement="right">
          <div className="text-des"><AlternateEmailIcon color="primary" /> {user?.email}</div>
        </LightTooltip>
        <LightTooltip title="Estado de la idea" placement="right">
          <div className="text-des"><SwipeUpIcon color="primary" /> <span className="ms-1">{isTaken ? 'Idea Tomada' : 'Idea sin tomar'}</span></div>
        </LightTooltip>

        {(isTaken && ideaTaken.length) && (
          <>
            <LightTooltip title="Fecha en la que se tomó la idea" placement="right">
              <div className="text-des"><QueryBuilderIcon color="primary" />
                <span className="ms-1">{ideaTaken[0].fecha_aceptado.substr(0, 10)}</span>
              </div>
            </LightTooltip>
            <LightTooltip title="Estado de pago" placement="right">
              <div className="text-des"><AttachMoneyIcon color="primary" />
                <span className="ms-1">{ideaTaken[0].estado_pago == 1 ? 'Aceptado' : 'En revisión'}</span>
              </div>
            </LightTooltip>
          </>
        )
        }
        <hr />
        <div className="d-flex flex-column gap-2 mt-4 px-4 mb-3">
          <Button
            variant="contained"
            color="success"
            onClick={handleBuyIdea}
          >
            Pagar Idea
          </Button>
          {
            (!isTaken && !isLoadingIdeasTaken) && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={alertConfirmTakeIdea}
                >
                  <span className="text-white">Tomar Idea</span>
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon color="secondary" />}
                  onClick={alertConfirmDelete}
                >
                  Vaciar carrito
                </Button>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}
