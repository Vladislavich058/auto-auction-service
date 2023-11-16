import { useMemo } from "react";

export const useSortedUsers = (users, sort) => {
  const sortedUsers = useMemo(() => {
    if (sort) {
      return [...users].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return users;
  }, [sort, users]);

  return sortedUsers;
};

export const useSortedAndSerachUsers = (users, sort, query) => {
  const sortedUsers = useSortedUsers(users, sort);
  const sortedAndSearchUsers = useMemo(() => {
    if (query) {
      return sortedUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.surname.toLowerCase().includes(query.toLowerCase()) ||
          user.lastname.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.phone.toLowerCase().includes(query.toLowerCase()) ||
          user.passportNumber.toLowerCase().includes(query.toLowerCase())
      );
    }
    return sortedUsers;
  }, [query, sortedUsers]);

  return sortedAndSearchUsers;
};

export const useUsers = (users, sort, query, filter) => {
  const sortedAndSearchUsers = useSortedAndSerachUsers(users, sort, query);
  const sortedAndSearchAndFilterUsers = useMemo(() => {
    if (filter) {
      return sortedAndSearchUsers.filter(
        (user) => user.status.toString().toLowerCase() === filter
      );
    }
    return sortedAndSearchUsers;
  }, [filter, sortedAndSearchUsers]);
  return sortedAndSearchAndFilterUsers;
};
