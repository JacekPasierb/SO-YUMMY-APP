import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
const Layout = () => {
    return (_jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsx(Outlet, {}) }));
};
export default Layout;
