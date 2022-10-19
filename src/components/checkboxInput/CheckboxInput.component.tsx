type CheckboxInputPropsType = {
    label: string
    id: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
    value?: "game" | "accessories" | "Sony" | "EA" | "Ubisoft" | "Eureka" | "Acer" | "Ant" | "Razer" | "Redclutch" | "Qbik" | "GreenSoul" | "PC" | "PS" | "Teen" | "Everyone" | "Mature"
    checked: boolean
    name: "category" | "brand" | "priceRange" | "platform" | "esrbRating" | "inStock" | "fastDelivery"
}

const CheckboxInput = ({ label, id, ...otherProps }: CheckboxInputPropsType) => {
    return (
        <li>
            <input type="checkbox" id={id} {...otherProps} />
            <label htmlFor={id}>{label}</label>
        </li>
    )
}

export default CheckboxInput;