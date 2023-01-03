import React, { useState } from "react";

import styles from "./NewAddressForm.styles.module.css";

type NewAddressModalType = {
    editMode?: true
    setIsNewAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type FormStateType = {
    name: string
    line1: string
    city: string
    state: string
    country: string
    postalCode: number
    isDeliveryAddress: boolean
}

const NewAddressForm = ({ setIsNewAddressModalOpen, editMode }: NewAddressModalType) => {
    const [formState, setFormState] = useState<FormStateType | null>(null);

    const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(event)
    }


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
    }

    return (
        <div className={styles['address-form-wrapper']} onSubmit={handleSubmit} onClick={() => setIsNewAddressModalOpen(prev => !prev)}>
            <div className={styles['address-form']} onClick={(e) => e.stopPropagation()}>
                {editMode && <button>Close</button>}
                <form onChange={handleChange}>
                    <label className="sr-only" htmlFor="name">Name</label>
                    <input required={true} type="text" name="name" id="name" value={formState?.name} placeholder="name" />
                    <label className="sr-only" htmlFor="line1">House no., Street/line</label>
                    <input required={true} type="text" name="line1" id="line1" value={formState?.line1} placeholder="House No., Street" />
                    <label className="sr-only" htmlFor="city">City</label>
                    <input required={true} type="text" name="city" id="city" value={formState?.city} placeholder="city" />
                    <label className="sr-only" htmlFor="state">State</label>
                    <input required={true} type="text" name="state" id="state" value={formState?.state} placeholder="state" />
                    <label className="sr-only" htmlFor="country">Country</label>
                    <input required={true} type="text" name="country" id="country" value={formState?.country} placeholder="country" />
                    <label className="sr-only" htmlFor="postal-code">Postal code</label>
                    <input required={true} type="number" name="postalCode" id="postal-code" value={formState?.postalCode} placeholder="postal_code" />
                    <div className={styles["address-type"]}>
                        <label className={styles['address-type-radio-label']} htmlFor="type-home">
                            <input className="custom-input" type="radio" name="address-type" id="type-home" required={true} />
                            <span className="text-uppercase">home</span>
                        </label>
                        <label className={styles['address-type-radio-label']} htmlFor="type-office">
                            <input className="custom-input" type="radio" name="address-type" id="type-office" required={true} />
                            <span className="text-uppercase">office</span>
                        </label>
                        <label className={styles['address-type-radio-label']} htmlFor="type-guest">
                            <input className="custom-input" type="radio" name="address-type" id="type-guest" required={true} />
                            <span className="text-uppercase">guest</span>
                        </label>
                    </div>
                    <button className="cursor-pointer">Save</button>
                </form>
            </div>
        </div>

    )
}

export default NewAddressForm;