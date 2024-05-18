import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./MainRecipesPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnRecipes, } from "../../redux/ownRecipes/operations";
import { selectIsLoading, selectOwnRecipes, selectTotalOwnRecipes, } from "../../redux/ownRecipes/selectors";
import Header from "../../components/Header/Header";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import BasicPagination from "../../components/Pagination/BasicPagination";
import { useNavigate } from "react-router";
import MainTitle from "../../components/MainTitle/MainTitle";
import { selectUser } from "../../redux/auth/selectors";
const MyRecipesPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const currentPage = getPageFromQueryString();
    const ownRecipes = useSelector(selectOwnRecipes);
    const totalOwnRecipes = useSelector(selectTotalOwnRecipes);
    const isLoading = useSelector(selectIsLoading);
    const navigate = useNavigate();
    useEffect(() => {
        if (user && user.userId) {
            const userId = user.userId;
            const request = { userId, page: currentPage };
            dispatch(getOwnRecipes(request));
        }
    }, [dispatch, currentPage]);
    const handlePageChange = (page) => {
        navigate(`?page=${page}`);
        window.scrollTo(0, 0);
    };
    return (_jsxs("main", { className: css.background, children: [_jsx(Header, {}), _jsxs("div", { className: `${css.container} ${css.flex}`, children: [_jsx(MainTitle, { title: "My recipes" }), isLoading ? (_jsx("p", { children: " Loading.." })) : (_jsx(MyRecipesList, { recipes: ownRecipes })), _jsx(BasicPagination, { count: Math.ceil(totalOwnRecipes / 4), page: currentPage, onPageChange: handlePageChange })] })] }));
};
export default MyRecipesPage;
