import logo from '../assets/cantina-logo.png';
import { Link } from "react-router-dom";
import './HeaderNav.css';


function HeaderNav() {
  return (
    <div className="header-nav">
      <div className="header-nav-content">
        <div>
          <div id="header-nav-left">
            <img src={logo} alt="logo du site"/>
          </div>  
          <nav id="header-nav-right">
          <Link to="/">Accueil</Link>|
          <Link to="/nouvelle-recette">Créer</Link> 
          </nav>
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;
