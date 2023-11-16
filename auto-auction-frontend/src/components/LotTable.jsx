import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import LotRow from "./LotRow";

const LotTable = ({
  sortedAndSearchAndFilterLots,
  filter,
  setFilter,
  setOpenDialog,
  type,
}) => {
  const TABS = [
    {
      label: "Все",
      value: "",
    },
    {
      label: "Без повреждений",
      value: "Без повреждений",
    },
    {
      label: "Минимальные повреждения",
      value: "Минимальные повреждения",
    },
    {
      label: "Серьезные повреждения",
      value: "Серьезные повреждения",
    },
  ];

  const TABLE_HEAD = [
    "Фото",
    "Информация лота",
    "Информация автомобиля",
    "Состояние",
    type === "admin" || type === "manager" ? "Cтатус" : "",
    "Ставки",
  ];

  const router = useNavigate();

  return (
    <Card className="h-full w-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none px-6 pt-6"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <Typography variant="h4" color="blue-gray">
            {type === "manager" ? "Мои лоты" : "Лоты"}
          </Typography>
          {type === "manager" ? (
            <Button size="sm" onClick={() => router("/profile/addLot")}>
              Разместить лот
            </Button>
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
              {TABLE_HEAD.map((label, index) =>
                label ? (
                  <th
                    key={label}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {label}
                    </Typography>
                  </th>
                ) : (
                  ""
                )
              )}
            </tr>
          </thead>
          <tbody>
            {sortedAndSearchAndFilterLots.map((lot, index) => {
              const isLast = index === sortedAndSearchAndFilterLots.length - 1;
              const classes = isLast
                ? "p-2"
                : "p-2 border-b border-blue-gray-50";

              return (
                <LotRow key={lot.id} classes={classes} lot={lot} type={type} />
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default LotTable;
