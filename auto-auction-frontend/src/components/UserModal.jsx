import {
  Dialog,
  DialogBody
} from "@material-tailwind/react";
import Register from "pages/Register";
import React from "react";

const UserModal = ({ openDialog, handleOpenDialog, setOpenDialog, fetchManagers }) => {
  return (
    <Dialog
      open={openDialog}
      handler={handleOpenDialog}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogBody>
        <Register type="add" setOpenUserModal={setOpenDialog} fetchManagers={fetchManagers}/>
      </DialogBody>
    </Dialog>
  );
};

export default UserModal;
