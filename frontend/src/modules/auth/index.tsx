import { useContext } from 'react';
import { AuthContext } from '../../context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/_LoginPage.scss';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {

  const { isLogged, logIn } = useContext(AuthContext);
  if (isLogged) return (<Navigate to="/" />);

  return (
    <main className="container_ flex_center">
      <section className="login">
        <div className="flex_center form ">
          <img src={require('../../assets/octupusDark.jpeg')} alt="CDN_Logo" width={300} />
          <button
            className="btn_login flex_center"
            onClick={logIn}
          >
            <img src={require('../../assets/o365.png')} alt="365" className="me-2" />
            Iniciar sesión con correo institucional
          </button>
        </div>
      </section>
    </main>
  )
}

export default LoginPage;
