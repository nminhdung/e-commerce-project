import { useMemo } from "react";
import { generateArr } from "../utils/helpers";
const usePaginate = (totalCountProduct, currentPage, sibling = 1) => {
  const paginationArray = useMemo(() => {
    const itemPerpage = process.env.REACT_APP_ITEMPERPAGE || 10;
    const totalPage = Math.ceil(totalCountProduct / itemPerpage);
    const totalPaginationItem = sibling + 5;

    if (totalPage <= totalPaginationItem) return generateArr(1, totalPage);

    const isShowLeft = currentPage - sibling > 2;
    const isShowRight = currentPage + sibling < totalPage - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = totalPage - 4;
      const rightRange = generateArr(rightStart, totalPage);

      return [1, "...", ...rightRange];
    }
    if (!isShowLeft && isShowRight) {
      const leftRange = generateArr(1, 5);
      return [1, ...leftRange, "...", totalPage];
    }
    if (isShowLeft && isShowRight) {
      const middleRange = generateArr(
        currentPage - sibling || 1,
        currentPage + sibling || totalPage
      );
      return [1, "...", ...middleRange, "...", totalPage];
    }
  }, [totalCountProduct, sibling, currentPage]);
  return paginationArray;
};

export default usePaginate;
