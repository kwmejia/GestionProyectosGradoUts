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
import './idea.scss'
import Swal from 'sweetalert2';
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
  const { nombre_idea, fecha_creacion, id_azure_docente_correo, id_idea } = idea;

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
      setAlert({ title: res.data.error, icon: 'error' });
      return;
    }

    setAlert({ title: 'Idea agregada al carrito', icon: 'success' })
    setIsShopping(!isShopping);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} src={urlPhoto} aria-label="recipe">
          </Avatar>
        }

        title={nombre_idea}
        subheader={fecha_creacion?.substr(0, 10)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
          <p className="my-3 email-teacher">{id_azure_docente_correo}</p>
        </CardContent>
      </Collapse>
    </Card>
  );
}