import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

 const BasicPagination = ({count , onPageChange}) => {
  const handlePageChange = (event, page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };
  return (
    <>
      <Stack spacing={2}>
        <Pagination count={count} onChange={handlePageChange}/>
      </Stack>
    </>
  );
};

export default BasicPagination;