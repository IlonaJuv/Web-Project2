import style from "./style.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { signup } from "../../services/userService";

import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch();


  

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
        if (password !== confirmpassword) {
          alert("Password mismatch");
          return;
        }
        const newUser = {
          username: username,
          email: email,
          password: password,
        };
        dispatch(signup(newUser));
      } catch (error: any) {
        setError(error);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmpassword("");
      }
        }

    return (
        <div className={style.formContainer} onSubmit={handleSubmit}>
        <p className={style.title}>Register </p>
        <form className={style.form}>
        <input type="text"  placeholder="Username"
            className={style.input}
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
          />
          <input type="email"  placeholder="Email"
            className={style.input}
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
          <input type="password" className={style.input} placeholder="Password"
           onChange={(e) => setPassword(e.target.value)} 
           value={password} 
           />
            <input type="password" className={style.input} placeholder="Confirm password"
           onChange={(e) => setConfirmpassword(e.target.value)} 
           value={confirmpassword} 
           />
          <p className={style.pageLink}>
            <span className={style.pageLinkLabel}>Forgot Password?</span>
          </p>
          <button className={style.formBtn} disabled={isLoading}>Register</button>
        </form>
        <p className={style.signUpLabel}>
          Already have an account?
          <Link to='/login' className={style.signUpLink}>Log in
          </Link>
        </p>
      </div>
    );
}

export default RegisterForm;