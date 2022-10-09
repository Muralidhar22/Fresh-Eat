import React from "react";

import styles from "./FormInput.styles.module.css";

type FormInputPropsType = {
    label: string,
    id: string,
    value: string,
    type: "email" | "password" | "text",
    autoComplete?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
    required: boolean
    name?: string
    'aria-invalid'?: boolean
}

const FormInput = ({ label, ...otherProps }: FormInputPropsType) => {
    return (
        <div className={styles.group}>

            <input className={styles.formInput} {...otherProps} />
            {label && (
                <label
                    htmlFor={otherProps.id}
                    className={`${otherProps.value?.length ? styles.shrink : ''
                        } ${styles.formInputLabel}`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;