import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  UserPlusIcon
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody, CardHeader,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography
} from "@material-tailwind/react";
import React from "react";
import UserRow from "./UserRow";

const UserTable = ({
  sortedAndSearchAndFilterUsers,
  filter,
  setFilter,
  deleteUser,
  changeUserStatus,
  setOpenDialog,
  type,
  //   totalPages,
  //   page,
  //   changePage,
}) => {
  const TABS = [
    {
      label: "Все",
      value: "",
    },
    {
      label: "Активные",
      value: "true",
    },
    {
      label: "Заблокированные",
      value: "false",
    },
  ];

  const TABLE_HEAD = [
    {
      label: "Пользователь",
      value: "surname",
    },
    {
      label: "Номер паспорта",
      value: "passportNumber",
    },
    {
      label: "Номер телефона",
      value: "phone",
    },
    {
      label: "Статус",
      value: "",
    },
    {
      label: "",
      value: "",
    },
  ];

  //   let pagesArray = usePagination(totalPages, sortedAndSearchAndFilterUsers);

  return (
    <Card className="h-full w-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none px-6 pt-6"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <Typography variant="h4" color="blue-gray">
            {type === "managers" ? "Менеджеры" : "Клиенты"}
          </Typography>
          {type === "managers" ? (
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {/* <Button variant="outlined" size="sm">
                      Просмотреть всех
                    </Button> */}
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => setOpenDialog(true)}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Добавить
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={filter.filter} className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  key={label}
                  value={value}
                  onClick={() => setFilter({ ...filter, filter: value })}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              value={filter.query}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => setFilter({ ...filter, query: e.target.value })}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(({ label, value }, index) => (
                <th
                  key={label}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  onClick={
                    filter.sort === value
                      ? () => setFilter({ ...filter, sort: "" })
                      : () => setFilter({ ...filter, sort: value })
                  }
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {label}{" "}
                    {index !== TABLE_HEAD.length - 1 &&
                      index !== TABLE_HEAD.length - 2 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedAndSearchAndFilterUsers.map((user, index) => {
              const isLast = index === sortedAndSearchAndFilterUsers.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <UserRow
                  key={user.id}
                  classes={classes}
                  user={user}
                  deleteUser={deleteUser}
                  changeUserStatus={changeUserStatus}
                />
              );
            })}
          </tbody>
        </table>
      </CardBody>
      {/* {sortedAndSearchAndFilterUsers.length ? (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of {pagesArray.length + 1}
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      ) : (
        ""
      )} */}
    </Card>
  );
};

export default UserTable;
