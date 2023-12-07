import { Button, Chip, Typography } from "@material-tailwind/react";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getLastBid } from "utils/bids";

const LotRow = ({ lot, classes, type, setOpenDialog, setOpenLot }) => {
  const router = useNavigate();
  const { authUser } = useAuth();
  return (
    <tr>
      <td className={classes}>
        <div className="flex justify-center">
          <img
            className="w-36 object-cover overflow-hidden object-center h-28"
            src={lot.car.files[0].uri}
            alt={lot.car.files[0].name}
          />
        </div>
      </td>
      <td className={classes}>
        <div className="flex flex-col">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal uppercase"
          >
            {lot.car.name} {lot.car.model}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70"
          >
            Лот #{lot.id}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              Пробег
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal uppercase"
            >
              {lot.car.odometer} км
            </Typography>
          </div>
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              Стоимость до повреждений
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal uppercase"
            >
              {lot.car.preAccidentValue} $
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <div className="flex flex-col gap-1">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal uppercase"
          >
            {lot.car.primaryDamage}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal uppercase"
          >
            {lot.car.hasKeys ? "Ключи в наличии" : "Ключи отсутствуют"}
          </Typography>
        </div>
      </td>
      {type === "admin" || type === "manager" ? (
        <td className={classes}>
          <div className="w-max">
            <Chip
              variant="ghost"
              size="sm"
              value={
                lot.status.lotStatus === "IN_PROCESSING"
                  ? "На модерации"
                  : lot.status.lotStatus === "REFUSED"
                  ? "Отклонен"
                  : lot.status.lotStatus === "SOLD"
                  ? "Продан"
                  : lot.status.lotStatus === "VALIDATED"
                  ? "Актуален"
                  : ""
              }
              color={
                lot.status.lotStatus === "IN_PROCESSING"
                  ? "blue-gray"
                  : lot.status.lotStatus === "REFUSED"
                  ? "red"
                  : lot.status.lotStatus === "SOLD"
                  ? "yellow"
                  : lot.status.lotStatus === "VALIDATED"
                  ? "green"
                  : "blue-gray"
              }
            />
          </div>
        </td>
      ) : (
        ""
      )}
      <td className={classes}>
        <div className="flex flex-col gap-1">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70"
          >
            Текущая ставка
          </Typography>
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-normal uppercase"
          >
            $ {getLastBid(lot)}
          </Typography>
          <Button
            className="flex justify-center"
            size="sm"
            onClick={
              type === "admin" || type === "manager" || type === "client"
                ? () => router(`/profile/lots/${lot.id}`)
                : () => router(`/lots/${lot.id}`)
            }
          >
            Просмотреть
          </Button>
          {(type === "client" &&
            lot.bids.client &&
            lot.bids.client.id === authUser.id) ||
          (type === "manager" && lot.manager.id === authUser.id) ? (
            <Button
              className="flex justify-center"
              size="sm"
              onClick={() => {
                setOpenDialog(true);
                setOpenLot(lot);
              }}
            >
              История ставок
            </Button>
          ) : (
            ""
          )}
        </div>
      </td>
    </tr>
  );
};

export default LotRow;
