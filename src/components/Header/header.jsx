import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const handleRegisterRedirect = () => routeChange("/register");
  const handleLoginRedirect = () => routeChange("/login");
  const handleMainRedirect = () => routeChange("/");
  
  return (
    <header className="header">
      <div onClick={handleMainRedirect} style={{cursor:"pointer"}}>
        <img src="/images/logo_header.png" alt="logo" />
        <p>MyBlog - post whatever, whenever and wherever</p>
      </div>
      <div>
        <Button
          onClick={handleRegisterRedirect}
          style={{
            backgroundColor: "#d03c3c",
            fontSize: 16,
            textTransform: "none",
            borderRadius: 15,
          }}
          className="main-page-sign-up-button"
          variant="contained"
        >
          Sign Up
        </Button>
        <Button
          onClick={handleLoginRedirect}
          style={{
            backgroundColor: "#d03c3c",
            fontSize: 16,
            textTransform: "none",
            borderRadius: 15,
          }}
          className="main-page-sign-in-button"
          variant="contained"
        >
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;
