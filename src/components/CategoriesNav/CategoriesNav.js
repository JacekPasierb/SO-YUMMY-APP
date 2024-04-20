import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../../API/categoriesAPI";
import { useNavigate, useParams } from "react-router-dom";
const CategoriesNav = () => {
    const navigate = useNavigate();
    const { categoryName } = useParams();
    const [value, setValue] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const handleChange = (event, newValue) => {
        navigate(`/categories/${categoriesList[newValue]}`);
        setValue(newValue);
    };
    useEffect(() => {
        console.log("RLO");
        const getAllCategories = async () => {
            try {
                const { data } = await fetchAllCategories();
                console.log("data", data);
                await setCategoriesList(data.catArr);
                console.log("S", categoriesList);
            }
            catch (error) {
                console.log(error);
            }
        };
        getAllCategories();
    }, [categoryName]);
    useEffect(() => {
        if (categoryName && categoriesList) {
            console.log("catName", categoryName);
            console.log("categortLis1", categoriesList);
            const idxActivCat = categoriesList.indexOf(categoryName);
            console.log("idx", idxActivCat);
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
