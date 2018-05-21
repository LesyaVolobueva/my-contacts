export const getMaxPages = (itemsPerPage, size) => (
    Math.ceil(size / itemsPerPage)
);