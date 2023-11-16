import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  Chip,
  IconButton,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import LotService from "API/LotService";
import MyAlert from "components/UI/Alert/MyAlert";
import { useAuth } from "hooks/useAuth";
import { useFetching } from "hooks/useFetching";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageGallery from "react-image-gallery";
import { useNavigate, useParams } from "react-router-dom";
import { getBidIncrement } from "utils/bidIncrement";

const LotIdPage = ({ type = "" }) => {
  const params = useParams();
  const [lot, setLot] = useState({
    car: {},
    id: "",
    maxBid: "",
    bids: {},
    status: {},
  });
  const [images, setImages] = useState();
  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [bid, setBid] = useState("");
  const { authUser } = useAuth();
  const router = useNavigate();

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

  const getLastBid = (data) => {
    if (!data.bids.length) {
      return 0;
    } else {
      const currentBid = data.bids[data.bids.length - 1];
      const minBid = currentBid + getBidIncrement(currentBid);
      return minBid;
    }
  };

  const getMinBid = (data) => {
    const lastBid = getLastBid(data);
    if (lastBid === 0) {
      return data.minBid;
    }
    const minBid = lastBid + getBidIncrement(lastBid);
    return minBid;
  };

  const [fetchLot, isLotLoading, lotError, lotErrorOpen, setLotErrorOpen] =
    useFetching(async () => {
      const response = await LotService.getLotById(params.id);
      fillImages(response.data);
      if (type === "" || type === "client") {
        setBid(getMinBid(response.data));
        reset();
      }
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
      value: 0,
      info: "$",
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
                {type === "manager" || type === "admin" ? (
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
            <Card className="xl:w-[500px] lg:w-[400px] mt-5">
              <div className="py-2 px-5 border-b-[1px] border-gray-300">
                <Typography variant="h6" color="black" className="uppercase">
                  Информация об автомобиле
                </Typography>
              </div>
              {vehicleDetails.map(({ label, value, info }, index) => (
                <div
                  key={label}
                  className={`py-2 px-5 flex ${
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
              {type === "admin" && lot.status.lotStatus === "IN_PROCESSING" ? (
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
            {type === "" || type === "client" ? (
              <Card className="xl:w-[350px] lg:w-[250px] mt-5 h-full">
                <div className="py-2 px-5 border-b-[1px] border-gray-300">
                  <Typography variant="h6" color="black" className="uppercase">
                    Информация о торгах
                  </Typography>
                </div>
                {bidDetails.map(({ label, value, info }, index) => (
                  <div
                    key={label}
                    className={`py-2 px-5 flex ${
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
                  onSubmit={authUser ? () => {} : () => {router("/login")}}
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
                      value={bid}
                      min={lot.bids && getMinBid(lot)}
                      step={lot.bids && getBidIncrement(getLastBid(lot))}
                      max={lot.maxBid}
                      error={errors?.bid ? true : false}
                      crossOrigin={undefined}
                      onChange={(e) => setBid(e.target.value)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default LotIdPage;
