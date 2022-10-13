import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../formInput/FormInput.component";
import { EMAIL_REGEX } from "../../utils/regex";
import { showToastErrorMessage, showToastSuccessMessage } from '../../utils/toastMessage';
import { UserContext } from "../../contexts/user.context";

import styles from "./SignIn.styles.module.css";

type SignInFormValuesType = {
    email: string
    password: string
}

type FormValidValueType = {
    email: boolean
}

const INITIAL_STATE = {
    email: '',
    password: ''
}


const SignIn = () => {
    const [formState, setFormState] = useState<SignInFormValuesType>(INITIAL_STATE);
    const [formValidValue, setFormValidValue] = useState({} as FormValidValueType);
    const { setSignedIn, setAccessToken } = useContext(UserContext);
    let allValidValues = formValidValue?.email;
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget
        const { email, password } = form.elements as typeof form.elements & {
            email: HTMLInputElement,
            password: HTMLInputElement
        };

        const response = await fetch(`${process.env.REACT_APP_DEV_BACKEND_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        const result = await response.json();

        if (response.status === (401 || 400)) {
            showToastErrorMessage(result.message)
        }
        else if (response.status === 200) {
            showToastSuccessMessage(result.message)
            setSignedIn(true)
            setAccessToken(result.accessToken)
            setTimeout(() => {
                navigate('/')
            }, 1000)
        } else {
            showToastErrorMessage(`uh Oh! Something went wrong`)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, changedProperty: keyof typeof formState) => {
        if (changedProperty === 'email') {
            const validEmail = EMAIL_REGEX.test(event.target.value)
            setFormValidValue({ [changedProperty]: validEmail })
        }
        setFormState((prevState) => ({ ...prevState, [changedProperty]: event.target.value }))
    }

    return (
        <div className={styles.signInWrapper}>

            <section>
                <h1>Sign In to shop</h1>

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Email"
                        id="user-email"
                        value={formState.email}
                        type="email"
                        name="email"
                        autoComplete="off"
                        onChange={(event) => handleChange(event, 'email')}
                        required={true}
                        ariaInvalid={formValidValue.email}
                    />
                    <FormInput
                        label="Password"
                        id="user-pwd"
                        value={formState.password}
                        type="password"
                        name="password"
                        onChange={(event) => handleChange(event, 'password')}
                        required={true}
                    />
                    <button disabled={!allValidValues}>Sign In</button>
                </form>
                <div><p>Don't have an account? <Link to="/signup">SignUp</Link></p></div>
            </section>
        </div>
    )
}

export default SignIn;