import { REFRESH_API } from "constants/urls";

const getNewAccessToken = async () => {
    const response = await fetch(REFRESH_API, {
        method: 'GET',
        credentials: 'include'
    })
    const result = await response.json();
    if (response.status === 401) {
        return result;
    } else if (response.status === 200) {
        return result;
    }
}

export default getNewAccessToken;