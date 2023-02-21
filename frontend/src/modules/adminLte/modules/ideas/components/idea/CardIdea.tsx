import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../../../context';
import Avatar from '@mui/material/Avatar';
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TypeStateIdeas } from '../../../../../../interfaces/interfacesEndPoints';
import AzureGraphServices from '../../../../../../config/AzureGraphServices';
import { useFavorites } from '../../../../../../hooks/useFavorites';
import './idea.scss';


interface PropsCard {
  idea: TypeStateIdeas;
}

export const CardIdea = ({ idea }: PropsCard) => {

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isShopping, setIsShopping] = useState<boolean>(false);
  const [urlPhoto, setUrlPhoto] = useState('');

  const { addFavorite, deleteFavorite, favorites, getFavorites, isLoadingFavorite } = useFavorites();
  const { user, logOut } = useContext(AuthContext);
  const { nombre_idea, fecha_creacion, id_azure_docente_correo, id_idea } = idea;

  useEffect(() => {
    if (favorites.length > 0) return
    mountedComponent();
  }, []);

  const mountedComponent = async () => {
    await getFavorites(user?.email);
    await getPhotoOtherUser();
    console.log(favorites)
    favorites.forEach(favorite => {
      if (favorite.id_idea === id_idea) setIsFavorite(true);
    })
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

  const changeShopping = () => {
    setIsShopping(!isShopping);
  }

  const showMore = () => {
    console.log("Ver mas")
  }


  return (
    <div className="card_">

      <div className="info-idea">
        <Avatar src={urlPhoto} alt="Photo user" className="photo-user" />

        <div>
          <h4 className="title-idea text-title">
            {nombre_idea}

          </h4>
          <span className="date-idea">
            {fecha_creacion?.substr(0, 10)}
          </span>
        </div>
      </div>

      <p className="description text-muted">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, architecto? Magni cupiditate soluta tenetur nulla nobis. Quia fugiat libero beatae voluptas ut at accusantium.
      </p>
      <div className="cont-buttoms d-flex justify-content-between mt-3">
        <div className="">
          <button>
            <FontAwesomeIcon
              icon={faHeart}
              className={isFavorite ? "icon icon-selected" : "icon"}
              color={isFavorite ? "red" : "grey"}
              onClick={changeFavorite}
            />
          </button>

          <button>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={isShopping ? "icon icon-selected" : "icon"}
              color={isShopping ? "#0B4A75" : "grey"}
              onClick={changeShopping}
            />
          </button>
        </div>
        <button
          className="btn-show-more"
          onClick={showMore}
        >Ver más</button>
      </div>
    </div>
  )
}
