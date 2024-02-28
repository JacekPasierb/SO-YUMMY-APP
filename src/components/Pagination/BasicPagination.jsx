import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import css from "./BasicPagination.module.css";

const BasicPagination = ({ count, onPageChange }) => {
  const handlePageChange = (event, page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };
  return (
    <>
      <Stack spacing={2} className={css.center}>
        <Pagination
          count={count}
          onChange={handlePageChange}
          className={css.pagination}
          sx={{
            ".Mui-selected": {
              backgroundColor: "#EBF3D4",
            },
            ".MuiPagination-root .Mui-selected ":{
              backgroundColor: "#EBF3D4",
            },
            ".MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":{
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
          }}
        />
      </Stack>
    </>
  );
};

export default BasicPagination;
