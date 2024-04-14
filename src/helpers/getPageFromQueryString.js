export const getPageFromQueryString = () => {
    const searchParams = new URLSearchParams(location.search);
    const pageString = searchParams.get("page");
    return parseInt(pageString || "1", 10);
};
