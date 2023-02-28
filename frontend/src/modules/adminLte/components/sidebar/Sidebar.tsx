
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHeart, faLightbulb, faBoltLightning, faChartBar, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { Slider } from "react-burgers";
import './_sidebar.scss';

export const Sidebar = () => {

  const [sideBarActive, setsideBarActive] = useState(false);
  return (
    <section className={sideBarActive ? "sidebar active " : "sidebar"}>
      <div className="cap"></div>
      <div className="pt-2 px-2">
        <Slider
          color={sideBarActive ? "#CAD225" : "#FFF"}
          active={sideBarActive}
          type="elastic"
          onClick={() => setsideBarActive(!sideBarActive)}
          width={25}
          lineHeight={sideBarActive ? 3 : 2}
          padding='4px'
        />
      </div>
      <div className="title-sidebar px-4">Gestor de proyectos UTS</div>

      <nav>
        <section>
          <hr />
          <h2 className="title-section">Estudiantes</h2>
          <NavLink to="/" className={({ isActive }) => isActive ? "active link-container" : "link-container"}>
            <FontAwesomeIcon icon={faLightbulb} className="icon " />
            <span>Ideas</span>
          </NavLink>
          <NavLink to="/favoritos" className={({ isActive }) => isActive ? "active link-container" : "link-container"}>
            <FontAwesomeIcon icon={faHeart} className="icon" />
            <span>Favoritos</span>
          </NavLink>
          <a href="/carrito" className="link-container">
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
            <span>Carrito</span>
          </a>
        </section>

        <section>
          <hr />
          <h2 className="title-section">Docentes</h2>
          <a href="#" className="link-container">
            <FontAwesomeIcon icon={faBoltLightning} className="icon " />
            <span> Mis ideas</span>
          </a>
        </section>

        <section>
          <hr />
          <h2 className="title-section">Administrativos</h2>
          <a href="#" className="link-container">
            <FontAwesomeIcon icon={faChartBar} className="icon" />
            <span>Estadisticas</span>
          </a>
          <a href="#" className="link-container">
            <FontAwesomeIcon icon={faUserCog} className="icon" />
            <span>Adminstrar ideas</span>
          </a>

        </section>
      </nav>
    </section>
  );
}
