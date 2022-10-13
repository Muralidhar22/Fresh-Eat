import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../formInput/FormInput.component";
import { EMAIL_REGEX, USER_REGEX, PWD_REGEX } from "../../utils/regex";
import { showToastInfoMessage, showToastSuccessMessage, showToastErrorMessage } from "../../utils/toastMessage";
import signUpFormValidation from "../../utils/signUpFormValidation";

import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

import FormValuesType from "../../types/FormValuesType";

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    terms: false,
    email: '',
    password: '',
    confirmPassword: ''
}
type FormValidValueType = {
    firstName: boolean,
    lastName: boolean,
    email: boolean,
    password: boolean,
    confirmPassword: boolean
    terms: boolean,
}
type FormInputFocusType = {
    firstName: boolean,
    lastName: boolean,
    email: boolean,
    password: boolean,
    confirmPassword: boolean
}

const SignUp = () => {
    const [formState, setFormState] = useState<FormValuesType>(INITIAL_STATE)
    const [formValidValue, setFormValidValue] = useState({} as FormValidValueType)
    const [formInputFocus, setFormInputFocus] = useState({} as FormInputFocusType)
    const navigate = useNavigate();
    let allValidValues = formValidValue?.email && formValidValue?.firstName && formValidValue.lastName && formValidValue.password && formValidValue.confirmPassword;

    const handleInputFocus = (changedProperty: keyof FormInputFocusType, isFocus: boolean) => {
        setFormInputFocus({ ...formInputFocus, [changedProperty]: isFocus });
    }

    const displayInvalidValueNote = (changedProperty: keyof FormInputFocusType): boolean => {
        return ((!formValidValue[changedProperty] && formState[changedProperty].length > 0)
            || (formInputFocus[changedProperty] && formState[changedProperty].length > 0 && !formValidValue[changedProperty]))
    }

    const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>, changedProperty: keyof typeof formState | keyof FormValidValueType) => {
        if (changedProperty === 'terms') {
            const isFormValueValid = signUpFormValidation(changedProperty, event.target.checked)
            setFormValidValue({ ...formValidValue, [changedProperty]: isFormValueValid })
            setFormState((prevState) => ({ ...prevState, [changedProperty]: event.target.checked }))
        } else {
            if (changedProperty === 'confirmPassword') {
                const isFormValueValid = signUpFormValidation(changedProperty, event.target.value, formState.password)
                setFormValidValue({ ...formValidValue, [changedProperty]: isFormValueValid })
            } else {
                const isFormValueValid = signUpFormValidation(changedProperty, event.target.value)
                setFormValidValue({ ...formValidValue, [changedProperty]: isFormValueValid })
            }
            setFormState((prevState) => ({ ...prevState, [changedProperty]: event.target.value }))
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget
        const { firstName, lastName, email, password } = form.elements as typeof form.elements & {
            firstName: HTMLInputElement,
            lastName: HTMLInputElement,
            email: HTMLInputElement,
            password: HTMLInputElement
        };

        const response = await fetch(`${process.env.REACT_APP_DEV_BACKEND_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstName.value,
                lastname: lastName.value,
                email: email.value,
                password: password.value
            })
        })
        const result = await response.json();

        if (response.status === 409) {
            showToastErrorMessage(result.message)
        }
        if (response.status === 201) {
            showToastInfoMessage(`Redirecting to SignIn page`)
            showToastSuccessMessage(result.message)
            setTimeout(() => {
                navigate('/signin')
            }, 4000)
        }
    }

    return (
        <>
            <div>
                <h1>Sign Up to create an account</h1>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Firstname"
                        type="text"
                        id="firstName"
                        value={formState.firstName}
                        name="firstName"
                        required={true}
                        onChange={(event) => handleFormInputChange(event, 'firstName')}
                        autoComplete="off"
                        ariaInvalid={formValidValue.firstName}
                        ariaDescribedBy="f-nidnote"
                        onFocus={() => handleInputFocus('firstName', true)}
                        onBlur={() => handleInputFocus('firstName', false)}
                    />
                    {displayInvalidValueNote('firstName') &&
                        <p id="f-nidnote">
                            <FaInfoCircle />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    }
                    <FormInput
                        label="Lastname"
                        type="text"
                        id="lastName"
                        value={formState.lastName}
                        name="lastName"
                        required={true}
                        onChange={(event) => handleFormInputChange(event, 'lastName')}
                        autoComplete="off"
                        ariaInvalid={formValidValue.lastName}
                        ariaDescribedBy="l-nidnote"
                        onFocus={() => handleInputFocus('lastName', true)}
                        onBlur={() => handleInputFocus('lastName', false)}
                    />
                    {displayInvalidValueNote('lastName') &&
                        <p id="l-nidnote">
                            <FaInfoCircle />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    }
                    <FormInput
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={(event) => handleFormInputChange(event, 'email')}
                        required={true}
                        autoComplete="off"
                        ariaInvalid={formValidValue.email}
                        ariaDescribedBy="email-idnote"
                        onFocus={() => handleInputFocus('email', true)}
                        onBlur={() => handleInputFocus('email', false)}
                    />
                    {displayInvalidValueNote('email') &&
                        <p id="email-idnote">
                            <FaInfoCircle />
                            Your entered email should look like this <strong>example@test.com</strong>
                        </p>
                    }
                    <FormInput
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange={(event) => handleFormInputChange(event, 'password')}
                        required={true}
                        autoComplete="off"
                        ariaInvalid={formValidValue.password}
                        ariaDescribedBy="pwd-idnote"
                        onFocus={() => handleInputFocus('password', true)}
                        onBlur={() => handleInputFocus('password', false)}
                    />
                    {displayInvalidValueNote('password') &&
                        <p id='pwd-idnote'>
                            <FaInfoCircle />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                    }
                    <FormInput
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formState.confirmPassword}
                        onChange={(event) => handleFormInputChange(event, 'confirmPassword')}
                        required={true}
                        autoComplete="off"
                        ariaInvalid={formValidValue.confirmPassword}
                        ariaDescribedBy="c-pwd-idnote"
                        onFocus={() => handleInputFocus('confirmPassword', true)}
                        onBlur={() => handleInputFocus('confirmPassword', false)}
                    />
                    {displayInvalidValueNote('confirmPassword') &&
                        <p id="c-pwd-idnote">
                            <FaInfoCircle />
                            Must match the first password input field.
                        </p>
                    }
                    <label htmlFor="checkbox">
                        <input type="checkbox"
                            required
                            checked={formState.terms}
                            onChange={(event) => handleFormInputChange(event, 'terms')}
                            id="terms"
                            name="terms"
                            aria-invalid={formValidValue.terms} />
                        I accept Terms & Conditions
                    </label>
                    <button disabled={!allValidValues}>Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUp;