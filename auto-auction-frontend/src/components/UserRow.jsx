import {
  TrashIcon,
  NoSymbolIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const UserRow = ({ user, classes, deleteUser, changeUserStatus }) => {
  return (
    <tr>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {user.surname} {user.name} {user.lastname}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {user.email}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {user.passportNumber}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {user.phone}
        </Typography>
      </td>
      <td className={classes}>
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={user.status ? "активен" : "заблокирован"}
            color={user.status ? "green" : "blue-gray"}
          />
        </div>
      </td>
      <td className={classes}>
        <div className="flex items-center justify-around">
          <Tooltip content={user.status ? "Заблокировать" : "Разблокировать"}>
            <IconButton variant="text" onClick={() => changeUserStatus(user.id)}>
              {user.status ? (
                <NoSymbolIcon className="h-5 w-5" />
              ) : (
                <CheckCircleIcon className="h-5 w-5" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip content="Удалить">
            <IconButton variant="text" onClick={() => deleteUser(user.id)}>
              <TrashIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
