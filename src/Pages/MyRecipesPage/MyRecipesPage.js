import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./MainRecipesPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnRecipes, } from "../../redux/recipes/operations";
import { selectIsLoading, selectOwnRecipes, selectTotalOwnRecipes, } from "../../redux/recipes/selectors";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/useAuth";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import BasicPagination from "../../components/Pagination/BasicPagination";
import { useNavigate } from "react-router";
import MainTitle from "../../components/MainTitle/MainTitle";
const MyRecipesPage = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const userId = user.userId;
    const currentPage = getPageFromQueryString();
    const ownRecipes = useSelector(selectOwnRecipes);
    const totalOwnRecipes = useSelector(selectTotalOwnRecipes);
    const isLoading = useSelector(selectIsLoading);
    const navigate = useNavigate();
    useEffect(() => {
        if (userId) {
            const request = { userId, page: currentPage };
            dispatch(getOwnRecipes(request));
        }
    }, [userId, currentPage]);
    const handlePageChange = (page) => {
        navigate(`?page=${page}`);
        window.scrollTo(0, 0);
    };
    return (_jsxs("main", { className: css.background, children: [_jsx(Header, {}), _jsxs("div", { className: `${css.container} ${css.flex}`, children: [_jsx(MainTitle, { title: "My recipes" }), isLoading ? (_jsx("p", { children: " Loading.." })) : (_jsx(MyRecipesList, { ownRecipes: ownRecipes })), _jsx(BasicPagination, { count: Math.ceil(totalOwnRecipes / 4), page: currentPage, onPageChange: handlePageChange })] })] }));
};
export default MyRecipesPage;
