import axios from 'axios';
import { toast } from 'react-toastify';
import { PREFIX_AUTH } from 'utils/constants';

export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
});

export const configApi = () => {
    const token = JSON.parse(localStorage.getItem(`${PREFIX_AUTH}:token`) || '')

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

const responseHandler = (response: any) => {
    return response;
};

const errorHandler = (error: any) => {
    if (axios.isAxiosError(error)) {
        if (error?.message === 'Network Error') {
            toast.error('Verifique sua conexão com a internet', {
                toastId: 'network-error'
            });
        }
    }
    return Promise.reject(error);
};

// Intercerpetor de requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(`${PREFIX_AUTH}:token`);

    if (token !== null) {
        config['headers'] = {
            'Authorization': `${JSON.parse(token)}`,
        }
    }

    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(responseHandler, errorHandler);
