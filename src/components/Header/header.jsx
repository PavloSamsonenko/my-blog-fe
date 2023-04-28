import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  let navigate = useNavigate();

  const token = localStorage.getItem("token");

  const routeChange = (path) => {
    navigate(path);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    handleLoginRedirect();
  };

  const handleRegisterRedirect = () => routeChange("/register");
  const handleLoginRedirect = () => routeChange("/login");
  const handlePostsRedirect = () => routeChange("/posts");
  const handlePostCreateRedirect = () => routeChange("/post/create");
  const handleMainRedirect = () => routeChange("/");
  const handleProfileRedirect = () => routeChange("/profile");

  return (
    <header>
      <div className="header">
        <div style={{ display: token ? "flex" : "none" }}>
          <div
            onClick={handleProfileRedirect}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              paddingRight: "10px",
            }}
          >
            <AccountCircleIcon fontSize="large" />
            <p style={{ marginLeft: "15px" }}>My profile</p>
          </div>
          <div style={{ display: "flex", marginLeft: "15px" }}>
            <Button
              onClick={handlePostsRedirect}
              style={{
                display: token ? "flex" : "none",
                backgroundColor: "#161E61",
                fontSize: 16,
                textTransform: "none",
                borderRadius: 15,
              }}
              variant="contained"
            >
              All Posts
            </Button>
            <Button
              onClick={handlePostCreateRedirect}
              style={{
                display: token ? "flex" : "none",
                backgroundColor: "#161E61",
                fontSize: 16,
                textTransform: "none",
                borderRadius: 15,
                marginLeft: "15px",
              }}
              variant="contained"
            >
              Create Post
            </Button>
          </div>
        </div>
        <div
          onClick={token ? handlePostsRedirect : handleMainRedirect}
          style={{ cursor: "pointer", marginRight: "400px" }}
        >
          <img src="/images/logo_header.png" alt="logo" />
          <p>MyBlog - post whatever, whenever and wherever</p>
        </div>

        <Button
          onClick={handleLogOut}
          style={{
            display: token ? "flex" : "none",
            backgroundColor: "#d03c3c",
            fontSize: 16,
            textTransform: "none",
            borderRadius: 15,
          }}
          className="header-log-oug-button"
          variant="contained"
        >
          Log Out
        </Button>

        <div style={{ display: !token ? "flex" : "none" }}>
          <Button
            onClick={handleRegisterRedirect}
            style={{
              backgroundColor: "#d03c3c",
              fontSize: 16,
              textTransform: "none",
              borderRadius: 15,
            }}
            className="header-sign-up-button"
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
            className="header-sign-in-button"
            variant="contained"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
