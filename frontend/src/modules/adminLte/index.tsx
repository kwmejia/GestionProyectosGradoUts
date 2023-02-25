
import { Header } from './components/header/Header';
import { Sidebar } from './components/sidebar/Sidebar'
import './styles/_AdminLte.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context';

const AdminLte = () => {

  const { isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("login");
    }
  }, [isLogged])

  return (
    <main id="admin_lte">
      <Sidebar />
      <Header />
      <section className="content custom-scroll">
        <Outlet />
      </section>
    </main>
  )
}


export default AdminLte;
