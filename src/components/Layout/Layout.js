import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
const Layout = () => {
    return (React.createElement(Suspense, { fallback: React.createElement(Loader, null) },
        React.createElement(Outlet, null)));
};
export default Layout;
