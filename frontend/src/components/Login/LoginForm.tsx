import Login from "../../pages/Login";
import style from "./style.module.css";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await login(email, password);
        navigate('/');
    }
    return (
        <div className={style.formContainer} onSubmit={handleSubmit}>
        <p className={style.title}>Log In</p>
        <form className={style.form}>
          <input type="email"  placeholder="Email"
            className={style.input}
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
          <input type="password" className={style.input} placeholder="Password"
           onChange={(e) => setPassword(e.target.value)} 
           value={password} 
           />
          <p className={style.pageLink}>
            <span className={style.pageLinkLabel}>Forgot Password?</span>
          </p>
          <button className={style.formBtn} disabled={isLoading}>Log in</button>
        </form>
        <p className={style.signUpLabel}>
          Don't have an account?
          <Link to='/register' className={style.signUpLink}>Sign up
          </Link>
        </p>
      </div>
    );
}

export default LoginForm;