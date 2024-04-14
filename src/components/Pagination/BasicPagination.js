import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import css from "./BasicPagination.module.css";
const BasicPagination = ({ count, page, onPageChange, }) => {
    const handlePageChange = (event, page) => {
        if (onPageChange) {
            onPageChange(page);
        }
    };
    return (_jsx(_Fragment, { children: _jsx(Stack, { spacing: 1, className: css.center, children: _jsx(Pagination, { count: count, onChange: handlePageChange, className: css.pagination, page: page, sx: {
                    ".MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "#EBF3D4",
                    },
                    ".Mui-selected:hover ": {
                        backgroundColor: "#EBF3D4",
                    },
                    ".MuiPaginationItem-root:hover": {
                        backgroundColor: "#EBF3D4",
                    },
                    ".MuiButtonBase-root:focus": {
                        outline: "none",
                    },
                    ".MuiPaginationItem-root": {
                        fontSize: "12px",
                        color: "#22252A",
                    },
                    ".MuiSvgIcon-root": {
                        color: "#A9A9A9",
                    },
                } }) }) }));
};
export default BasicPagination;
