import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import ManagerService from "API/ManagerService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LotRow from "./LotRow";
import MyAlert from "./UI/Alert/MyAlert";

const LotTable = ({
  sortedAndSearchAndFilterLots,
  filter,
  setFilter,
  type,
  fetchLots,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(!openDialog);
  const [openLot, setOpenLot] = useState({ id: "", bids: [], status: {} });
  const [error, setError] = useState();
  const [errorOpen, setErrorOpen] = useState(false);

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

  const saleLot = async (id, clientId, bid) => {
    try {
      await ManagerService.saleLot(id, { clientId: clientId, bid: bid });
      fetchLots();
      setOpenDialog(false);
    } catch (e) {
      setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none px-6 pt-6"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <Typography variant="h4" color="blue-gray">
            Лоты
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
                <LotRow
                  key={lot.id}
                  classes={classes}
                  lot={lot}
                  type={type}
                  setOpenLot={setOpenLot}
                  setOpenDialog={setOpenDialog}
                />
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <Dialog open={openDialog} handler={handleOpenDialog} size="sm">
        <DialogHeader>История ставок</DialogHeader>
        <DialogBody>
          <MyAlert
            type="error"
            open={errorOpen}
            onClose={() => setErrorOpen(false)}
          >
            {error}
          </MyAlert>
          <table className="mt-4 w-full min-w-max table-auto text-left">
            {openLot.bids
              .slice()
              .reverse()
              .map(({ bidDateTime, bidCost, client }, index) => {
                const isLast =
                  index === sortedAndSearchAndFilterLots.length - 1;
                const classes = isLast
                  ? "p-2"
                  : "p-2 border-b border-blue-gray-50";

                return (
                  <tr
                    key={index}
                    className={`p-2 ${
                      index === openLot.bids.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`}
                  >
                    {type === "manager" ? (
                      <th className={classes}>{client.email}</th>
                    ) : (
                      ""
                    )}
                    <th className={classes}>
                      {new Date(bidDateTime).getDay()}.
                      {new Date(bidDateTime).getMonth()}.
                      {new Date(bidDateTime).getFullYear()}
                    </th>
                    <th className={classes}>
                      {new Date(bidDateTime).getHours()}:
                      {new Date(bidDateTime).getMinutes()}
                    </th>
                    <th className={classes + " text-green-500"}>{bidCost} $</th>
                    {type === "manager" &&
                    openLot.status.lotStatus === "VALIDATED" ? (
                      <th className={classes}>
                        {" "}
                        <Button
                          variant="outlined"
                          className="flex justify-center"
                          size="sm"
                          onClick={() =>
                            saleLot(openLot.id, client.id, bidCost)
                          }
                        >
                          Продать
                        </Button>
                      </th>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
          </table>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpenDialog}>
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default LotTable;
