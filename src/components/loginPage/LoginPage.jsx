import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function LoginPage({ setIsLog, userName, setUserName }) {


  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const changeLogin = (e) => {
    setLogin(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("setIsLog", "true");
    localStorage.setItem("UserName", login);
    setUserName(login);
    setIsLog(true);
    navigate("/");
  };


  return (
    <>
      <h1>Авторизация</h1>

      <form className="authorizationForm" onSubmit={handleSubmit}>
      <h5 className="loginQuestion">
        Как к Вам обращаться? 
      </h5>
        <div className="loginInput">
          <input
            type="text"
            placeholder="login"
            
            onChange={changeLogin}
            className="formInput"
          />
        </div>
        <div className="passInput ">
          <input
            type="password"
            placeholder="password"
    
            onChange={changePassword}
            className="formInput"
          />
        </div>
        <div>
          <button type="submit" className="buttonLog myButton">
            Войти
          </button>

        </div>
      </form>
    </>
  );
}
