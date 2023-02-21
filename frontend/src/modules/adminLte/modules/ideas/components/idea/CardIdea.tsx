import { useContext } from 'react';
import { AuthContext } from '../../../../../../context';
import Avatar from '@mui/material/Avatar';
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './idea.scss';

export const CardIdea = () => {

  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="card_">

      <div className="info-idea">
        <Avatar src={user?.avatar} alt="Photo user" className="photo-user" />

        <div>
          <h4 className="title-idea">
            Gestor de proyectos de grado para la gestion de las UTS

          </h4>
          <span className="date-idea">20/03/2020</span>
        </div>
      </div>

      <p className="description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, architecto? Magni cupiditate soluta tenetur nulla nobis. Quia fugiat libero beatae voluptas ut at accusantium.
      </p>
      <div className="cont-buttoms d-flex justify-content-between mt-3">
        <div className="">
          <button>
            <FontAwesomeIcon icon={faHeart} className="icon" />
          </button>

          <button>
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
          </button>
        </div>
        <button className="btn-show-more">Ver mas</button>
      </div>
    </div>
  )
}
