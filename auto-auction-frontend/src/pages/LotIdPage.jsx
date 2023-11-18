import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import ClientService from "API/ClientService";
import LotService from "API/LotService";
import ManagerService from "API/ManagerService";
import MyAlert from "components/UI/Alert/MyAlert";
import { useAuth } from "hooks/useAuth";
import { useFetching } from "hooks/useFetching";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageGallery from "react-image-gallery";
import { useNavigate, useParams } from "react-router-dom";
import { getBidIncrement, getLastBid, getMinBid } from "utils/bids";

const LotIdPage = ({ type = "" }) => {
  const params = useParams();
  const [lot, setLot] = useState({
    car: {},
    id: "",
    maxBid: "",
    bids: {},
    status: {},
    manager: {},
    client: {},
    createDateTime: "",
  });

  const [images, setImages] = useState();
  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [bid, setBid] = useState({ value: 0 });
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(!openDialog);
  const router = useNavigate();
  const { authUser } = useAuth();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const fillImages = (data) => {
    const images = data.car.files.map((file) => ({
      original: file.uri,
      thumbnail: file.uri,
    }));
    setImages(images);
  };

  const handleChange = (event) => {
    setBid({ value: event.target.value });
  };

  const handleAddBid = () => {
    addBid(lot.id, bid);
  };

  const {
    fetching: fetchLot,
    isLoading: isLotLoading,
    error: lotError,
    errorOpen: lotErrorOpen,
    setErrorOpen: setLotErrorOpen,
  } = useFetching(async () => {
    let response = {};
    if (type === "admin") {
      response = await AdminService.getLotById(params.id);
    } else if (type === "manager") {
      response = await ManagerService.getLotById(params.id);
    } else if (type === "client") {
      response = await ClientService.getLotById(params.id);
      setBid({ value: getMinBid(response.data) });
      reset();
    } else {
      response = await LotService.getLotById(params.id);
      setBid({ value: getMinBid(response.data) });
      reset();
    }
    fillImages(response.data);
    setLot(response.data);
  });

  const vehicleDetails = [
    {
      label: "Лот",
      value: lot.id,
      info: "",
    },
    {
      label: "VIN",
      value: lot.car.vinNumber,
      info: "",
    },
    {
      label: "Пробег",
      value: lot.car.odometer,
      info: "км",
    },
    {
      label: "Цвет",
      value: lot.car.color,
      info: "",
    },
    {
      label: "Привод",
      value: lot.car.drive,
      info: "",
    },
    {
      label: "Мощность",
      value: lot.car.power,
      info: "л.с.",
    },
    {
      label: "Запас хода",
      value: lot.car.powerReserve,
      info: "км",
    },
    {
      label: "Емкость батареи",
      value: lot.car.batteryCapacity,
      info: "кВтч",
    },
    {
      label: "Тип повреждения",
      value: lot.car.primaryDamage,
      info: "",
    },
    {
      label: "Наличие ключей",
      value: lot.car.hasKeys ? "Есть" : "Отсутствуют",
      info: "",
    },
    {
      label: "Стоимость до повреждений",
      value: lot.car.preAccidentValue,
      info: "$",
    },
    {
      label: "Заметки",
      value: lot.car.highlights,
      info: "",
    },
  ];

  const bidDetails = [
    {
      label: "Стоимость выкупа без аукциона",
      value: lot.maxBid,
      info: "$",
    },
    {
      label: "Текущая ставка",
      value: lot.bids && getLastBid(lot),
      info: "$",
    },
  ];

  const userDetails = [
    {
      label: "ФИО",
      value:
        type === "manager"
          ? lot.client &&
            lot.client.surname +
              " " +
              lot.client.name +
              " " +
              lot.client.lastname
          : lot.manager &&
            lot.manager.surname +
              " " +
              lot.manager.name +
              " " +
              lot.manager.lastname,
    },
    {
      label: "Телефон",
      value:
        type === "manager"
          ? lot.client && lot.client.phone
          : lot.manager && lot.manager.phone,
    },
    {
      label: "Email",
      value:
        type === "manager"
          ? lot.client && lot.client.email
          : lot.manager && lot.manager.email,
    },
  ];

  useEffect(() => {
    fetchLot();
  }, []);

  const approveLot = async (id) => {
    try {
      await AdminService.approveLotById(id);
      fetchLot();
    } catch (e) {
      setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    }
  };

  const refuseLot = async (id) => {
    try {
      await AdminService.refuseLotById(id);
      fetchLot();
    } catch (e) {
      setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    }
  };

  const addBid = async (id, bid) => {
    try {
      await ClientService.addBid(id, { bid });
      fetchLot();
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
    <div className="py-10">
      <MyAlert
        type="error"
        open={lotErrorOpen || errorOpen}
        onClose={
          lotErrorOpen
            ? () => setLotErrorOpen(false)
            : () => setErrorOpen(false)
        }
      >
        {lotError || error}
      </MyAlert>
      {isLotLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : lotError ? (
        ""
      ) : (
        <div>
          <Card className="p-5">
            <Typography variant="h4" color="black" className="uppercase">
              {lot.car.yearOfManufacture} {lot.car.name} {lot.car.model}
            </Typography>
          </Card>
          <div className="flex flex-wrap justify-around">
            {lot.car.files && lot.car.files.length ? (
              <div className="xl:w-[500px] lg:w-[400px] mt-5 relative">
                {type === "manager" || type === "admin" || type === "client" ? (
                  <div className="absolute z-10 top-1 left-1">
                    <Chip
                      variant="filled"
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
                ) : (
                  ""
                )}
                {type === "client" && lot.status.lotStatus === "SOLD" ? (
                  <div className="z-10 absolute right-1 top-1">
                    <Chip
                      variant="filled"
                      size="sm"
                      color={lot.client.id === authUser.id ? "green" : "red"}
                      value={
                        lot.client.id === authUser.id ? "Выигран" : "Проигран"
                      }
                    />

                    {/* <div className="text-red-500 text-opacity-70 flex justify-center "></div> */}
                  </div>
                ) : (
                  ""
                )}
                <ImageGallery
                  items={images}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  renderRightNav={(onClick, disabled) => (
                    <IconButton
                      variant="text"
                      color="gray"
                      size="lg"
                      onClick={onClick}
                      disabled={disabled}
                      className="!absolute top-2/4 !right-4 -translate-y-2/4 z-10 opacity-70"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </IconButton>
                  )}
                  renderLeftNav={(onClick, disabled) => (
                    <IconButton
                      variant="text"
                      color="gray"
                      size="lg"
                      onClick={onClick}
                      disabled={disabled}
                      className="!absolute top-2/4 left-4 -translate-y-2/4 z-10 opacity-70"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>
                    </IconButton>
                  )}
                />
              </div>
            ) : (
              <div>Нет фото</div>
            )}
            <div>
              <Card className="xl:w-[500px] lg:w-[400px] mt-5 pb-2">
                <div className="py-2 px-5 border-b-[1px] border-gray-300">
                  <Typography variant="h6" color="black" className="uppercase">
                    Информация об автомобиле
                  </Typography>
                </div>
                {vehicleDetails.map(({ label, value, info }, index) => (
                  <div
                    key={label}
                    className={`py-2 px-5 flex items-center ${
                      index === vehicleDetails.length - 1
                        ? ""
                        : "border-b-[1px] border-gray-100"
                    }`}
                  >
                    <div className="w-[50%] text-sm">{label}:</div>
                    <div className="font-medium text-black text-sm">
                      <span className="uppercase">{value}</span> {info}
                    </div>
                  </div>
                ))}
                <div className="mt-3 flex justify-end px-5 text-gray-400">
                  {new Date(lot.createDateTime).toLocaleDateString("en-US")}
                </div>
                {type === "admin" &&
                lot.status.lotStatus === "IN_PROCESSING" ? (
                  <div className="p-3 w-full flex flex-wrap justify-around">
                    <Button color="red" onClick={() => refuseLot(lot.id)}>
                      Отклонить
                    </Button>
                    <Button color="green" onClick={() => approveLot(lot.id)}>
                      Подвтердить
                    </Button>
                  </div>
                ) : type === "admin" && lot.status.lotStatus === "REFUSED" ? (
                  <div className="p-3 w-full flex flex-wrap justify-around">
                    <Button color="green" onClick={() => approveLot(lot.id)}>
                      Подвтердить
                    </Button>
                  </div>
                ) : type === "admin" && lot.status.lotStatus === "VALIDATED" ? (
                  <div className="p-3 w-full flex flex-wrap justify-around">
                    <Button color="red" onClick={() => refuseLot(lot.id)}>
                      Отклонить
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </Card>
              {(type === "manager" && lot.status.lotStatus === "SOLD") ||
              (type === "client" &&
                lot.client &&
                lot.client.id === authUser.id) ? (
                <Button
                  className="mt-5"
                  fullWidth
                  onClick={() => setOpenDialog(true)}
                >
                  Показать {type === "manager" ? "клиента" : "менеджера"}
                </Button>
              ) : (
                ""
              )}
            </div>

            {(type === "" || type === "client") &&
            lot.status.lotStatus === "VALIDATED" ? (
              <Card className="xl:w-[350px] lg:w-[250px] mt-5 h-full pb-2">
                <div className="py-2 px-5 border-b-[1px] border-gray-300">
                  <Typography variant="h6" color="black" className="uppercase">
                    Информация о торгах
                  </Typography>
                </div>
                {bidDetails.map(({ label, value, info }, index) => (
                  <div
                    key={label}
                    className={`py-2 px-5 flex items-center ${
                      index === bidDetails.length - 1
                        ? ""
                        : "border-b-[1px] border-gray-100"
                    }`}
                  >
                    <div className="w-[70%] text-sm">{label}:</div>
                    <div className="font-medium text-black text-sm">
                      <span className="uppercase">{value}</span> {info}
                    </div>
                  </div>
                ))}
                <form
                  className="py-5 px-5"
                  onSubmit={
                    authUser
                      ? handleSubmit(handleAddBid)
                      : () => router("/login")
                  }
                >
                  <div className="mb-1 flex flex-col gap-3.5">
                    <Input
                      size="lg"
                      label="Ставка (USD)*"
                      type="number"
                      {...register("bid", {
                        required: "Поле обязательно к заполнению",
                        pattern: {
                          value: /^[\d]+([.][\d]{1,2})?$/,
                          message: "Неверная ставка!",
                        },
                        min: {
                          value: lot.bids && getMinBid(lot),
                          message: `Неверная ставка! Минимальное значение ${
                            lot.bids && getMinBid(lot)
                          }`,
                        },
                        max: {
                          value: lot.maxBid,
                          message: `Неверная ставка! Максимальное значение ${lot.maxBid}`,
                        },
                      })}
                      value={bid.value}
                      min={lot.bids && getMinBid(lot)}
                      step={lot.bids && getBidIncrement(getLastBid(lot))}
                      max={lot.maxBid}
                      error={errors?.bid ? true : false}
                      crossOrigin={undefined}
                      onChange={(e) => handleChange(e)}
                    />
                    <div className=" text-red-500 font-raleway -mt-2">
                      {errors?.bid && (
                        <p>
                          {errors?.bid?.message.toString() || "Ошибка ввода!"}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="filled"
                    size="sm"
                    className="mt-2 font-raleway font-semibold flex justify-center items-center relative"
                    type="submit"
                    fullWidth
                    disabled={!isValid}
                  >
                    Сделать ставку
                    <ArrowSmallRightIcon className="w-6 absolute right-2" />
                  </Button>
                </form>
              </Card>
            ) : (
              ""
            )}
            <Dialog
              open={openDialog}
              handler={handleOpenDialog}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
              size="sm"
            >
              <DialogHeader>
                Информация о {type === "manager" ? "клиенте" : "менеджере"}
              </DialogHeader>
              <DialogBody>
                {userDetails.map(({ label, value }, index) => (
                  <div
                    key={label}
                    className={`py-2 flex items-center ${
                      index === userDetails.length - 1
                        ? ""
                        : "border-b-[1px] border-gray-100"
                    }`}
                  >
                    <div className="w-[30%] text-base">{label}:</div>
                    <div className="font-medium text-black text-base">
                      <span className="uppercase">{value}</span>
                    </div>
                  </div>
                ))}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={handleOpenDialog}
                >
                  <span>OK</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotIdPage;
