import React, { useEffect, useRef, useState } from "react";

import FormInput from "../formInput/FormInput.component";
import { EMAIL_REGEX, USER_REGEX, PWD_REGEX } from "../../utils/regex";

import { FcCheckmark } from "react-icons/fc";
import { FaTimes, FaExclamationCircle } from "react-icons/fa";
import { Form } from "react-router-dom";

type FormValuesType = {
    firstName: string
    lastName: string
    terms: boolean
    email: string
    password: string
    confirmPassword: string
}

// type FormValidValueType = {
//     [     
//         firstName: boolean,
//         lastName: boolean,
//         email: boolean,
//         password: boolean,
//         confirmPassword: boolean
//     ]

// }

const SignUp = () => {

    const [formState, setFormState] = useState({} as FormValuesType)
    const [formValidValue, setFormValidValue] = useState({})

    useEffect(() => {

    }, [formState])

    const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prevFormState) => ({ ...prevFormState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
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
                    onChange={handleFormInputChange}
                    autoComplete="off"
                    aria-invalid={false}
                />
                <FormInput
                    label="Lastname"
                    type="text"
                    id="lastName"
                    value={formState.lastName}
                    name="lastName"
                    required={true}
                    onChange={handleFormInputChange}
                    autoComplete="off"
                />
                <FormInput
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleFormInputChange}
                    required={true}
                    autoComplete="off"
                />
                <FormInput
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={handleFormInputChange}
                    required={true}
                    autoComplete="off"
                />
                <FormInput
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formState.confirmPassword}
                    onChange={handleFormInputChange}
                    required={true}
                    autoComplete="off"
                />
                <label htmlFor="checkbox">
                    <input type="checkbox"
                        required
                        checked={formState.terms}
                        onChange={handleFormInputChange}
                        id="terms"
                        name="terms" />
                    I accept Terms & Conditions
                </label>
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;