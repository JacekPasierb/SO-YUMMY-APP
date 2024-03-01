export const getPageFromQueryString = () => {
  const searchParams = new URLSearchParams(location.search);
  return parseInt(searchParams.get("page")) || 1;
};
