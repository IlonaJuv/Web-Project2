import style from "./style.module.css";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    //const { login, error, isLoading } = useLogin();
   // const [error, setError] = useState(null)
    //const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const { register, error, isLoading } = useRegister();


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (password !== confirmpassword) {
          alert("Password mismatch");
          return;
        }
        const newUser = {
          username: username,
          email: email,
          password: password,
        };
        await register(newUser);
       // const userResponse = await signup(newUser);
        //console.log("userResponse refister: ", userResponse);
        //dispatch(setUser(userResponse));
        navigate('/');
      
    
      //userDispatch(registerUSer(newUser));
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