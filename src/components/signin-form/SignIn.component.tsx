import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../formInput/FormInput.component";

import styles from "./SignIn.styles.module.css";

const SignIn = () => {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <div className={styles.signInWrapper}>

            <section>
                <h1>Sign In to shop</h1>

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Email"
                        id="user-email"
                        value={userEmail}
                        type="email"
                        autoComplete="off"
                        onChange={(e) => setUserEmail(e.target.value)}
                        required={true}
                    />
                    <FormInput
                        label="Password"
                        id="user-pwd"
                        value={pwd}
                        type="password"
                        onChange={(e) => setPwd(e.target.value)}
                        required={true}
                    />
                    <button>Sign In</button>
                </form>
                <div><p>Don't have an account? <Link to="/signup">SignUp</Link></p></div>
            </section>
        </div>
    )
}

export default SignIn;