import { useMemo } from "react";

export const useSortedLots = (lots, sort) => {
  const sortedLots = useMemo(() => {
    if (sort.value) {
      if (sort.type === "asc") {
        return [...lots].sort((a, b) => a[sort].localeCompare(b[sort]));
      }
      return [...lots].sort((a, b) => b[sort].localeCompare(a[sort]));
    }
    return lots;
  }, [sort, lots]);

  return sortedLots;
};

export const useSortedAndSerachLots = (lots, sort, query) => {
  const sortedLots = useSortedLots(lots, sort);
  const sortedAndSearchLots = useMemo(() => {
    if (query) {
      return sortedLots.filter(
        (lot) =>
          lot.car.name.toLowerCase().includes(query.toLowerCase()) ||
          lot.car.model.toLowerCase().includes(query.toLowerCase())
      );
    }
    return sortedLots;
  }, [query, sortedLots]);

  return sortedAndSearchLots;
};

export const useLots = (lots, sort, query, filter) => {
  const sortedAndSearchLots = useSortedAndSerachLots(lots, sort, query);
  const sortedAndSearchAndFilterLots = useMemo(() => {
    if (filter) {
      return sortedAndSearchLots.filter((lot) =>
        lot.car.primaryDamage.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return sortedAndSearchLots;
  }, [filter, sortedAndSearchLots]);
  return sortedAndSearchAndFilterLots;
};
