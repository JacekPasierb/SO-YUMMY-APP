import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styles from "./BasicPagination.module.css";
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
      <Stack spacing={1} className={styles.pagination__center}>
        <Pagination
          count={count}
          page={page}
          onChange={handlePageChange}
          className={styles.pagination}
          sx={{
            ".MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "var(--color-bg-pagination-select)",
            },
            ".Mui-selected:hover ": {
             
              
            },
            ".MuiPaginationItem-root:hover": {
              backgroundColor: "var(--color-bg-pagination-hover)",
            },
            ".MuiButtonBase-root:focus": {
              outline: "none",
            },
            ".MuiPaginationItem-root": {
              fontSize: "12px",
              color: "var(--color-text-pagination)",
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
