import { useMemo } from "react";

export const usePagination = (totalPages, sortedAndSearchedAndFilterUsers) => {
  const pagesArr = useMemo(() => {
    let pagesArray = [];
    for (let i = 0; i < totalPages; i++) {
      pagesArray.push(i + 1);
    }
    return pagesArray;
  }, [sortedAndSearchedAndFilterUsers]);
  return pagesArr;
};
