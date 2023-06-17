import { useAuth } from 'contexts/auth.context';
import { lazy, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { LoadingPage } from 'pages/LoadingPage';

const QRCode = lazy(() => import('pages/QRCodeScan').then((module) => ({ default: module.QRCodeScan })));
const Login = lazy(() => import('pages/Login').then((module) => ({ default: module.Login })));
const NFT = lazy(() => import('pages/NFT').then((module) => ({ default: module.NFT })));

export const Router = () => {
    const { user } = useAuth();

    console.log(user);
    
    if (!user) {
        return (
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="/nft/:nft_id" element={<NFT />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        )
    }

    return (
        <Suspense fallback={<LoadingPage />}>
            <Routes>
                <Route path='/' element={<QRCode />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}
