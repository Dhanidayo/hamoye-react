import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const user = localStorage.getItem("hamoye-user");
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem("hamoye-user");
        navigate("/login");
      };

    return (
        <header>
      <div className="container">
        <Link to="/">
          <h1>Hamoye</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>Hi {user.split('@')[0].toUpperCase()}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
        </nav>
      </div>
    </header>
    );
}
 
export default Navbar;