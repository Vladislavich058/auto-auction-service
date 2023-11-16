import { Spinner } from "@material-tailwind/react";
import AdminService from "API/AdminService";
import MyAlert from "components/UI/Alert/MyAlert";
import UserModal from "components/UserModal";
import UserTable from "components/UserTable";
import { useFetching } from "hooks/useFetching";
import { useUsers } from "hooks/useUsers";
import React, { useEffect, useState } from "react";
// import { getPageCount } from "utils/pages";

const Users = ({ type }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "", filter: "" });
  const [error, setError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(!openDialog);
  //   const [totalPages, setTotalPages] = useState(0);
  //   const [limit, setLimit] = useState(10);
  //   const [page, setPage] = useState(1);
  const sortedAndSearchAndFilterUsers = useUsers(
    users,
    filter.sort,
    filter.query,
    filter.filter
  );

  const [
    fetchManagers,
    isManagersLoading,
    managersError,
    managersErrorOpen,
    setManagersErrorOpen,
  ] = useFetching(async () => {
    if (type === "managers") {
      const response = await AdminService.getAllManagers();
      setUsers(response.data);
    } else {
      const response = await AdminService.getAllClients();
      setUsers(response.data);
    }
    // const totalCount = response.totalPages;
    // setTotalPages(getPageCount(totalCount, limit));
  });

  const deleteUser = async (id) => {
    try {
      await AdminService.deleteUserById(id);
      fetchManagers();
    } catch (e) {
      setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    }
  };

  const changeUserStatus = async (id) => {
    try {
      await AdminService.changeUserStatusById(id);
      fetchManagers();
    } catch (e) {
      setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    }
  };

  //   const changePage = (page) => {
  //     setPage(page);
  //   };

  useEffect(() => {
    fetchManagers();
  }, [
    /*page*/
    type,
  ]);

  return (
    <div className="py-10">
      <MyAlert
        type="error"
        open={managersErrorOpen || errorOpen}
        onClose={
          error ? () => setErrorOpen(false) : () => setManagersErrorOpen(false)
        }
      >
        {managersError || error}
      </MyAlert>
      {isManagersLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div>
          <UserTable
            sortedAndSearchAndFilterUsers={sortedAndSearchAndFilterUsers}
            filter={filter}
            setFilter={setFilter}
            deleteUser={deleteUser}
            changeUserStatus={changeUserStatus}
            setOpenDialog={setOpenDialog}
            type={type}
            //   totalPages={totalPages}
            //   page={page}
            //   changePage={changePage}
          />
          <UserModal
            openDialog={openDialog}
            handleOpenDialog={handleOpenDialog}
            setOpenDialog={setOpenDialog}
            fetchManagers={fetchManagers}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
