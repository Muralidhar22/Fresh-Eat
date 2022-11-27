import { toast } from 'react-toastify';

export const showToastInfoMessage = (message: string) => {
    toast.info(message, {
        autoClose: 2000,
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
        draggable: false
    });
};
export const showToastSuccessMessage = (message: string) => {
    toast.success(message, {
        autoClose: 2000,
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
        draggable: false
    });
};

export const showToastErrorMessage = (message: string) => {
    toast.error(message, {
        autoClose: 2000,
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
        draggable: false
    });
};


