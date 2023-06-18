import axios from "axios";
import { useToggle } from "hooks/useToggle";
import React, { useState, useEffect, useContext, createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "services/api";
import { PREFIX_AUTH } from "utils/constants";
import { toast } from 'react-toastify';

type PropsProvider = {
    children?: React.ReactNode;
};

export type SignInCredentials = {
    email: string;
    password: string;
};

export type User = {
    user: UserModel;
    token: string;
}

export interface UserModel {
    id:                 number;
    email:              string;
    nft_id:             number;
}

export type AuthContextData = {
    user: UserModel;
    token: string;
    loading: boolean;
    signIn(credentials: SignInCredentials): Promise<any>;
    signOut(): void;
    resetUser(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: PropsProvider) => {
    const [data, setData] = useState<User>({
        user: JSON.parse(localStorage.getItem(`${PREFIX_AUTH}:user`) || 'null'),
        token: JSON.parse(localStorage.getItem(`${PREFIX_AUTH}:token`) || 'null'),
    });

    const [loading, setLoading] = useToggle(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(`${PREFIX_AUTH}:token`)
        const user = localStorage.getItem(`${PREFIX_AUTH}:user`)

        if (token && user) {
            setData({
                user: JSON.parse(user),
                token: JSON.parse(token),
            });
        }
    }, []);

    const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
        setLoading(true);

        try {
            const response = await api
                .post('login', {
                    email,
                    password,
                })

            const { token, user } = response.data;

            if (token && user)
            {
                localStorage.setItem(`${PREFIX_AUTH}:token`, JSON.stringify(token))
                localStorage.setItem(`${PREFIX_AUTH}:user`, JSON.stringify(user))

                setData({ token, user });
                setLoading(false);

                navigate('/', { replace: true });
            }
            else
            {
                throw new Error('Unauthorized');
            }
        }
        catch (error)
        {
            setLoading(false);

            if (axios.isAxiosError(error))
            {
                if (error.response?.status === 405)
                {
                    return toast.error(error?.response?.data?.message);
                }

                return false;
            }
            else
            {
                return false;
            }
        }
    }, []);

    const resetUser = () => {
        localStorage.clear();
        setData({} as User);
        navigate('/', { replace: true });
    }

    const signOut = useCallback(async () => {
        resetUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                loading,
                signIn,
                signOut,
                token: data.token,
                resetUser,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};
