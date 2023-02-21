
import './_sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHeart, faLightbulb, faBoltLightning, faChartBar, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export const Sidebar = () => {

  const [linkActive, setLinkActive] = useState("")
  return (
    <section className="sidebar">
      <div className="cap"></div>
      <div className="title-sidebar">Gestor de proyectos UTS</div>

      <nav>
        <section>
          <h2 className="title-section">Estudiantes</h2>
          <NavLink to="/" className={({ isActive }) => isActive ? "active link-container" : "link-container"}>
            <FontAwesomeIcon icon={faLightbulb} className="icon" />
            ideas
          </NavLink>
          <NavLink to="/favoritos" className={({ isActive }) => isActive ? "active link-container" : "link-container"}>
            <FontAwesomeIcon icon={faHeart} className="icon" />
            Favoritos
          </NavLink>
          <a href="#" className="link-container">
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
            Compras
          </a>
        </section>

        <section>
          <h2 className="title-section">Docentes</h2>
          <a href="#" className="link-container">
            <FontAwesomeIcon icon={faBoltLightning} className="icon" />
            Mis ideas
          </a>
        </section>

        <section>
          <h2 className="title-section">Administrativos</h2>
          <a href="#" className="link-container">
            <FontAwesomeIcon icon={faChartBar} className="icon" />
            Estadisticas
          </a>
          <a href="#" className="link-container">
            <FontAwesomeIcon icon={faUserCog} className="icon" />
            Adminstrar ideas
          </a>

        </section>
      </nav>
    </section>
  );
}
