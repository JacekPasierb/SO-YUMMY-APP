import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllCategories } from "../../API/categoriesAPI";
import { toast } from "react-toastify";
const CategoriesNav = () => {
    const navigate = useNavigate();
    const { categoryName } = useParams();
    const [value, setValue] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleChange = (event, newValue) => {
        navigate(`/categories/${categoriesList[newValue]}`);
        setValue(newValue);
    };
    useEffect(() => {
        const getAllCategories = async () => {
            try {
                setIsLoading(true);
                const { data } = await fetchAllCategories();
                await setCategoriesList(data.catArr);
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                    toast.error("Something went wrong. Plese try again...");
                }
            }
            finally {
                setIsLoading(false);
            }
        };
        getAllCategories();
    }, [categoryName]);
    useEffect(() => {
        if (categoryName && categoriesList) {
            const idxActivCat = categoriesList.indexOf(categoryName);
            if (idxActivCat === -1) {
                return setValue(0);
            }
            else {
                return setValue(idxActivCat);
            }
        }
    }, [categoryName, categoriesList]);
    return (_jsx(_Fragment, { children: _jsx(Tabs, { value: value, onChange: handleChange, variant: "scrollable", scrollButtons: false, allowScrollButtonsMobile: true, "aria-label": "scrollable force tabs example", sx: {
                marginTop: `20px`,
                borderBottom: "1px solid #E0E0E0",
                "& .MuiTabs-indicator": {
                    backgroundColor: `#8BAA36`,
                    marginTop: `100`,
                },
                "& .MuiTab-root": {
                    outline: `none`,
                },
                "& .MuiButtonBase-root": {
                    padding: "10px 10px 32px 10px",
                },
                "& .MuiTabs-flexContainer": {
                    gap: "28px",
                },
            }, children: categoriesList &&
                categoriesList.map((cat, idx) => {
                    return (_jsx(Tab, { label: cat, sx: {
                            padding: "0",
                            fontSize: "14px",
                            lineHeight: "14px",
                            color: "#E0E0E0",
                            "&.Mui-selected": {
                                color: "#8BAA36",
                            },
                        } }, idx));
                }) }) }));
};
export default CategoriesNav;
