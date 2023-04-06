import { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TypeCarrito, TypeFavorites, TypeStateIdeas } from '../../../../../../interfaces/interfacesEndPoints';
import { useFavorites } from '../../../../../../hooks/useFavorites';
import { useCarrito } from '../../../../../../hooks/useCarrito';
import { AuthContext } from '../../../../../../context';
import AzureGraphServices from '../../../../../../config/AzureGraphServices';
import Swal from 'sweetalert2';
import formatDate from '../../../../../../helpers/formatDate';
import './idea.scss'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface PropsCard {
  idea: TypeStateIdeas;
  favorites: TypeFavorites[];
  carrito: TypeCarrito[];
}


export function CardIdea({ idea, favorites, carrito }: PropsCard) {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isShopping, setIsShopping] = useState<boolean>(false);
  const [urlPhoto, setUrlPhoto] = useState('');
  const [alert, setAlert] = useState<undefined | Object>(undefined);

  const { addCarrito, deleteCarrito } = useCarrito();
  const { addFavorite, deleteFavorite } = useFavorites();
  const { user } = useContext(AuthContext);
  const { nombre_idea, fecha_creacion, id_azure_docente_correo, id_idea, descripcion_idea, nombre } = idea;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  useEffect(() => {
    mountedComponent();
    if (alert) Swal.fire(alert);
  }, [favorites, alert, carrito]);



  const mountedComponent = async () => {
    await getPhotoOtherUser();

    favorites.forEach(favorite => {
      if (favorite.id_idea === id_idea) setIsFavorite(true);
    })
    carrito.forEach(carr => {
      if (carr.id_idea === id_idea) setIsShopping(true);
    });
  }

  const getPhotoOtherUser = async () => {
    const urlPhotoObj = await AzureGraphServices.getUserPhotoAsync(id_azure_docente_correo as string);
    const url: string = urlPhotoObj as string;
    setUrlPhoto(url);
  }

  const changeFavorite = async () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      await addFavorite(user?.email, id_idea as number);
      return;
    }
    deleteFavorite(id_idea as number);
  }

  const changeShopping = async () => {
    if (isShopping) {
      await deleteCarrito(user?.email, id_idea as number);
      setIsShopping(false);
      return;
    }
    const res = await addCarrito(user?.email, id_idea as number);
    if (res?.data.error) {
      setAlert({
        title: res.data.error,
        icon: 'error',
        position: 'center',
        timer: 5000,
        showConfirmButton: true,
        confirmButtonColor: '#0B4A75',
      });
      return;
    }

    setAlert({
      title: 'Idea agregada al carrito',
      icon: 'success',
      toast: false,
      position: 'center',
      timer: 5000,
      showConfirmButton: true,
      confirmButtonColor: '#0B4A75',
      iconColor: "#c3d730"
    })
    setIsShopping(!isShopping);
  }

  return (
    <Card sx={{ maxWidth: 345 }} className="mb-4 card-container">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} src={urlPhoto} aria-label="recipe">
          </Avatar>
        }

        title={nombre_idea}
        subheader={(
          <>
            <p>{formatDate(fecha_creacion).substring(0, 10)}</p>
            <p className={`${nombre} tag`}>{nombre}</p>
          </>
        )}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" className="des-cont des-header" dangerouslySetInnerHTML={{ __html: descripcion_idea?.substring(0, 150) as string }}>

        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={changeFavorite}>
          <FavoriteIcon style={{ color: isFavorite ? "red" : '' }} />
        </IconButton>
        <IconButton aria-label="share" onClick={changeShopping}>
          <ShoppingCartIcon style={{ color: isShopping ? "#0B4A75" : '' }} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <h2 style={{ fontSize: 20, fontWeight: 'bold' }} className="mb-4">{nombre_idea}</h2>
          <Typography paragraph className="description-cont des-cont" id="description-cont" dangerouslySetInnerHTML={{ __html: descripcion_idea as string }}>

          </Typography>


          <p className="my-3 email-teacher text-center">{id_azure_docente_correo}</p>
        </CardContent>
      </Collapse>
    </Card>
  );
}