import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();

        navigate('/')
    }

  return (
    <>
      <h1>Авторизация</h1>

      <form className="authorizationForm" onSubmit={handleSubmit} >
        <div className="loginInput">
          <input
            type="text"
            placeholder="login"
            required
            className="formInput"
          />
        </div>
        <div className="passInput ">
          <input
            type="password"
            placeholder="password"
            required
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
};
