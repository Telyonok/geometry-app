import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './home.css';


function Home() {
  return (
    <div className="home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>
          <code>Geometry</code>
        </p>
        <Link to="/editor" className="Home-link">
          Start here
        </Link>
      </header>
    </div>
  );
}

export default Home;