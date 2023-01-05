import React, { useState } from "react";

import { AddressFormValuesType } from "types/FormValuesType";
import { useUserContext } from "contexts/user.context";
import { AddressType } from "types/AddressType";

import styles from "./AddressForm.styles.module.css";

type AddressFormModalType = {
    editMode: boolean
    setIsAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    initialValues?: AddressType
}

type FormInputType = {
    name: keyof AddressFormValuesType,
    id: string,
    labelClassName: string,
    placeholder?: string,
    labelContent: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    type: 'text' | 'radio',
    value: string
    inputClassName?: string
    checked?: boolean
}
const INITIAL_FORM_STATE: AddressFormValuesType = {
    addressType: "",
    city: "",
    country: "",
    line1: "",
    name: "",
    postalCode: "",
    state: ""
}
const setInitialState = (editMode: boolean, initialValues: AddressType | undefined) => {
    if (editMode && initialValues) {
        const {
            addressType,
            city,
            country,
            line1,
            name,
            postalCode,
            state
        } = initialValues
        return ({
            addressType,
            city,
            country,
            line1,
            name,
            postalCode,
            state
        } as AddressFormValuesType)
    }
    return INITIAL_FORM_STATE;
}

export const FormInput = ({
    name,
    id,
    labelClassName,
    placeholder,
    labelContent,
    onChange,
    type,
    value,
    inputClassName,
    checked }: FormInputType) => {
    return (
        <>
            <label className={labelClassName} htmlFor={id}>{labelContent}</label>
            {
                checked !== undefined
                    ?
                    <input
                        name={name}
                        id={id}
                        type={type}
                        checked={checked}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        className={inputClassName ? inputClassName : ""}
                        required />
                    :
                    <input
                        name={name}
                        id={id}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        className={inputClassName ? inputClassName : ""}
                        required />
            }
        </>
    )
}

const AddressForm = ({ setIsAddressModalOpen, editMode, initialValues }: AddressFormModalType) => {
    const [formState, setFormState] = useState<AddressFormValuesType>(() => setInitialState(editMode, initialValues))
    const { addNewAddress, updateAddress } = useUserContext()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name
        const value = event.target.value
        console.log(Number.isNaN(parseInt(value)))
        if (key === "postalCode"
            && value.length <= 6) {
            setFormState(prev => ({ ...prev, [key]: value }))
        } else if (event.target.name !== "postalCode") {
            setFormState(prev => ({ ...prev, [key]: value }))
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (editMode) {
            // addNewAddress()

        } else if (!editMode) {
            // updateAddress()
        }
    }

    return (
        <div className={styles['address-form-wrapper']} onSubmit={handleSubmit} onClick={() => setIsAddressModalOpen(prev => !prev)}>
            <div className={styles['address-form']} onClick={(e) => e.stopPropagation()}>
                {editMode && <button
                    onClick={() => setIsAddressModalOpen(prev => !prev)}
                >Close</button>}
                <form>
                    <FormInput
                        name="name"
                        id="name"
                        type="text"
                        value={formState ? formState.name : ""}
                        placeholder="name"
                        onChange={handleChange}
                        labelClassName="sr-only"
                        labelContent="Name"
                    />
                    <FormInput
                        name="line1"
                        id="line1"
                        type="text"
                        value={formState ? formState.line1 : ""}
                        placeholder="House No., Street"
                        onChange={handleChange}
                        labelClassName="sr-only"
                        labelContent="House no., Street/line"
                    />
                    <FormInput
                        name="city"
                        id="city"
                        type="text"
                        value={formState ? formState.city : ""}
                        placeholder="city"
                        onChange={handleChange}
                        labelClassName="sr-only"
                        labelContent="City"
                    />
                    <FormInput
                        name="state"
                        id="state"
                        type="text"
                        value={formState ? formState.state : ""}
                        placeholder="state"
                        onChange={handleChange}
                        labelClassName="sr-only"
                        labelContent="State"
                    />
                    <FormInput
                        name="country"
                        id="country"
                        type="text"
                        value={formState ? formState.country : ""}
                        placeholder="country"
                        onChange={handleChange}
                        labelClassName="sr-only"
                        labelContent="Country"
                    />
                    <FormInput
                        name="postalCode"
                        id="postal-code"
                        type="text"
                        value={formState ? formState.postalCode : ""}
                        placeholder="postal-code/ pin-code"
                        onChange={handleChange}
                        labelClassName="sr-only"
                        labelContent="Postal code"
                    />
                    <div className={styles["address-type"]}>
                        <div className={styles['address-type-input']}>
                            <FormInput
                                name="addressType"
                                id="type-home"
                                type="radio"
                                value="home"
                                checked={formState && formState.addressType === 'home'}
                                onChange={handleChange}
                                labelClassName={'text-uppercase'}
                                labelContent="home"
                                inputClassName="custom-input"
                            />
                        </div>
                        <div className={styles['address-type-input']}>
                            <FormInput
                                name="addressType"
                                id="type-work"
                                type="radio"
                                value="work"
                                checked={formState && formState.addressType === 'work'}
                                onChange={handleChange}
                                labelClassName={'text-uppercase'}
                                labelContent="work"
                                inputClassName="custom-input"
                            />
                        </div>
                        <div className={styles['address-type-input']}>
                            <FormInput
                                name="addressType"
                                id="type-guest"
                                type="radio"
                                value="guest"
                                checked={formState && formState.addressType === 'guest'}
                                onChange={handleChange}
                                labelClassName={'text-uppercase'}
                                labelContent="guest"
                                inputClassName="custom-input"
                            />
                        </div>
                    </div>
                    <button className="cursor-pointer">Save</button>
                </form>
            </div>
        </div>

    )
}

export default AddressForm;