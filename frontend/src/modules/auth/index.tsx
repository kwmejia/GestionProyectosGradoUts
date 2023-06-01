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

      <section className="login-container">
        <img className="pez" src={require('../../assets/img/pez1.png')} alt="" />
        <img className="pez" src={require('../../assets/img/pez4.png')} alt="" />
        <img className="pez" src={require('../../assets/img/pez5.png')} alt="" />
        <img className="pez" src={require('../../assets/img/pez9.png')} alt="" />
        <img className="pez" src={require('../../assets/img/pezRosa.png')} alt="" />

        <div className="login">
          <img src={require('../../assets/img/pulpo2.png')} alt="" width="300" />
          <button className="btn-login" onClick={logIn}>Inicar sesión con correo institucional</button>
        </div>

      </section>

    </main>
  )
}

export default LoginPage;
