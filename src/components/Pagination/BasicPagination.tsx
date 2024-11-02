import React, { FC } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styles from "./BasicPagination.module.css";

interface BasicPaginationProps {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
}

const paginationStyles = {
  ".MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "var(--color-bg-pagination-select)",
  },
  ".MuiPaginationItem-root.Mui-selected:hover": {
    backgroundColor: "var(--color-bg-pagination-select)",
  },
  ".MuiPaginationItem-root:hover": {
    backgroundColor: "var(--color-bg-pagination-hover)",
  },
  ".MuiButtonBase-root:focus": {
    outline: "2px solid var(--color-focus-ring)",
    outlineOffset: "2px",
  },
  ".MuiPaginationItem-root": {
    fontSize: "var(--font-size-pagination)",
    color: "var(--color-text-pagination)",
  },
  ".MuiSvgIcon-root": {
    color: "var(--color-icon-pagination)",
  },
};

const BasicPagination: FC<BasicPaginationProps> = ({
  count,
  page,
  onPageChange,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    onPageChange(page);
  };
  return (
    <>
      <Stack spacing={1} className={styles.pagination__center}>
        <Pagination
          count={count}
          page={page}
          onChange={handlePageChange}
          className={styles.pagination}
          sx={paginationStyles}
          aria-label="Page navigation"
        />
      </Stack>
    </>
  );
};

export default BasicPagination;
