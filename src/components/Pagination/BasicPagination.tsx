import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import css from "./BasicPagination.module.css";
import { FC } from "react";

interface BasicPaginationProps {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
}

const BasicPagination: FC<BasicPaginationProps> = ({
  count,
  page,
  onPageChange,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };
  return (
    <>
      <Stack spacing={1} className={css.center}>
        <Pagination
          count={count}
          onChange={handlePageChange}
          className={css.pagination}
          page={page}
          sx={{
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
          }}
        />
      </Stack>
    </>
  );
};

export default BasicPagination;
