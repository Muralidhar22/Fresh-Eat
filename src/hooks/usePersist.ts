import { useState, useEffect } from "react";

const getToken = () => {
    const value = localStorage.getItem("persist")
    if (typeof value === "string") {
        return JSON.parse(value)
    }
    return null;
}

const usePersist = () => {
    const [persist, setPersist] = useState(getToken)
    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])
    const clearPersist = () => {
        localStorage.removeItem("persist");
    }
    return [persist, setPersist, clearPersist]
}

export default usePersist;
