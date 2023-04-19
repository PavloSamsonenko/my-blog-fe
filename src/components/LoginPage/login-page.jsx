import "./login-page.css";

const LoginPage = () => {
  const pageName = "Login Page";
  const testFunc = () => {
    alert("test");
  }
  return <div className="test" onClick={()=>testFunc()}>{pageName}</div>;
};

export default LoginPage;
