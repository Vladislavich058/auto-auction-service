import {
  Button,
  Card,
  Checkbox,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import ManagerService from "API/ManagerService";
import { useFetching } from "hooks/useFetching";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MyAlert from "../components/UI/Alert/MyAlert";

const LotForm = () => {
  const [lot, setLot] = useState({
    car: {
      name: "BYD",
      model: "",
      vinNumber: "",
      odometer: null,
      yearOfManufacture: "2023",
      primaryDamage: "Без повреждений",
      preAccidentValue: null,
      color: "Белый",
      drive: "Передний привод",
      hasKeys: false,
      highlights: "Заводится и едет",
      power: null,
      batteryCapacity: null,
      powerReserve: null,
    },
    minBid: null,
    maxBid: null,
  });
  const [files, setFiles] = useState();

  const router = useNavigate();

  const handleChangeCar = (event) => {
    const car = { ...lot.car, [event.target.name]: event.target.value };
    setLot({ ...lot, car });
  };

  const handleChangeCarFiles = (event) => {
    setFiles(event.target.files);
  };

  const handleChangeCarName = (value) => {
    const car = { ...lot.car, name: value };
    setLot({ ...lot, car });
  };

  const handleChangeCarYear = (value) => {
    const car = { ...lot.car, yearOfManufacture: value };
    setLot({ ...lot, car });
  };

  const handleChangeCarDamage = (value) => {
    const car = { ...lot.car, primaryDamage: value };
    setLot({ ...lot, car });
  };

  const handleChangeCarColor = (value) => {
    const car = { ...lot.car, color: value };
    setLot({ ...lot, car });
  };

  const handleChangeCarDrive = (value) => {
    const car = { ...lot.car, drive: value };
    setLot({ ...lot, car });
  };

  const handleChangeCarHighlights = (value) => {
    const car = { ...lot.car, highlights: value };
    setLot({ ...lot, car });
  };

  const handleChangeCarKeys = (event) => {
    const car = event.target.checked
      ? { ...lot.car, hasKeys: true }
      : { ...lot.car, hasKeys: false };
    setLot({ ...lot, car });
  };

  const handleChangeLot = (event) => {
    setLot({ ...lot, [event.target.name]: event.target.value });
  };

  console.log(lot.car.VIN);

  const [fetchAdd, isAddLoading, addError, addErrorOpen, setAddErrorOpen] =
    useFetching(async () => {
      console.log(lot);
      let formData = new FormData();
      formData.append(
        "lot",
        new Blob([JSON.stringify(lot)], {
          type: "application/json",
        })
      );
      for (const key of Object.keys(files)) {
        formData.append("files", files[key]);
      }
      await ManagerService.addLot(formData);
      router("/profile/lots");
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const cars = [
    "BYD",
    "ZEEKR",
    "LIXIANG",
    "EVOLUTE",
    "JAC",
    "GEELY",
    "DONGEFNG",
    "HAIMA",
    "GAC",
    "MAPLE",
    "JETOUR",
    "BELGEE",
    "EXEED",
  ];

  const damages = [
    "Без повреждений",
    "Минималльные повреждения",
    "Серьезные повреждения",
  ];

  const drives = ["Передний привод", "Задний привод", "Полный привод"];

  const highlights = ["Заводится и едет", "Заводится", "Не заводится"];

  const colors = [
    "Белый",
    "Черный",
    "Серый",
    "Красный",
    "Розовый",
    "Фиолетовый",
    "Синий",
    "Голубой",
    "Зеленый",
    "Желтый",
    "Оранжевый",
    "Коричневый",
  ];

  const years = () => {
    let years = [];
    for (let i = 1970; i < 2050; i++) {
      years.push(i);
    }
    return years;
  };

  const handleAdd = async (event) => {
    fetchAdd();
  };

  return (
    <div className="py-10">
      {isAddLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <Card className="p-10">
          <Typography variant="h4" color="blue-gray">
            Добавление лота
          </Typography>
          <form className="mt-5" onSubmit={(e) => handleSubmit(handleAdd)(e)}>
            <div className="flex flex-wrap justify-between">
              <div className="flex flex-col gap-2 flex-grow-1 sm:w-[250px] lg:min-w-[300px]">
                <div className="mb-3">
                  <Select
                    label="Выберите марку*"
                    size="lg"
                    name="name"
                    value={lot.car.name}
                    error={errors?.name ? true : false}
                    onChange={handleChangeCarName}
                  >
                    {cars.map((car) => (
                      <Option key={car} value={car}>
                        {car}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    size="lg"
                    label="Модель автомобиля*"
                    {...register("model", {
                      required: "Поле обязательно к заполнению",
                    })}
                    error={errors?.model ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChangeCar(e)}
                  />
                  <div className=" text-red-500 font-raleway -mt-2">
                    {errors?.model && (
                      <p>
                        {errors?.model?.message.toString() || "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                      crossOrigin={undefined} size="lg"
                      label="ВИН кузова*"
                      {...register("vinNumber", {
                        required: "Поле обязательно к заполнению",
                        pattern: {
                          value: /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/,
                          message: "Неверный формат ВИН номера!"
                        }
                      })}
                      error={errors?.vinNumber ? true : false}
                      onChange={(e) => handleChangeCar(e)}                  />
                  <div className=" text-red-500 font-raleway -mt-2">
                    {errors?.vinNumber && (
                      <p>
                        {errors?.vinNumber?.message.toString() ||
                          "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    size="lg"
                    label="Пробег (км)*"
                    {...register("odometer", {
                      required: "Поле обязательно к заполнению",
                      pattern: {
                        value: /^[\d]+$/,
                        message:
                          "Пробег должен состоять из цифр и быть неотрицательным!",
                      },
                    })}
                    error={errors?.odometer ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChangeCar(e)}
                  />
                  <div className=" text-red-500 font-raleway -mt-2">
                    {errors?.odometer && (
                      <p>
                        {errors?.odometer?.message.toString() ||
                          "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <Select
                    label="Выберите год выпуска*"
                    size="lg"
                    name="yearOfManufacture"
                    value={lot.car.yearOfManufacture}
                    error={errors?.yearOfManufacture ? true : false}
                    onChange={handleChangeCarYear}
                  >
                    {years().map((year) => (
                      <Option key={year} value={year.toString()}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    size="lg"
                    label="Емкость батареи (кВтч)*"
                    {...register("batteryCapacity", {
                      required: "Поле обязательно к заполнению",
                      pattern: {
                        value: /^[\d]+$/,
                        message:
                          "Емкость должна состоять из цифр и быть неотрицательным!",
                      },
                    })}
                    error={errors?.batteryCapacity ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChangeCar(e)}
                  />
                  <div className=" text-red-500 font-raleway -mt-2">
                    {errors?.batteryCapacity && (
                      <p>
                        {errors?.batteryCapacity?.message.toString() ||
                          "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-grow-1 sm:w-[250px] lg:min-w-[300px]">
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    size="lg"
                    label="Запас хода (км)*"
                    {...register("powerReserve", {
                      required: "Поле обязательно к заполнению",
                      pattern: {
                        value: /^[\d]+$/,
                        message:
                          "Запас хода должен состоять из цифр и быть неотрицательным!",
                      },
                    })}
                    error={errors?.powerReserve ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChangeCar(e)}
                  />
                  <div className=" text-red-500 font-raleway -mt-2">
                    {errors?.powerReserve && (
                      <p>
                        {errors?.powerReserve?.message.toString() ||
                          "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    size="lg"
                    label="Мощность (л.с.)*"
                    {...register("power", {
                      required: "Поле обязательно к заполнению",
                      pattern: {
                        value: /^[\d]+$/,
                        message:
                          "Мощность должна состоять из цифр и быть неотрицательным!",
                      },
                    })}
                    error={errors?.power ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChangeCar(e)}
                  />
                  <div className=" text-red-500 font-raleway -mt-2">
                    {errors?.power && (
                      <p>
                        {errors?.power?.message.toString() || "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <Select
                    label="Выберите состояние автомобиля*"
                    size="lg"
                    name="primaryDamage"
                    value={lot.car.primaryDamage}
                    error={errors?.primaryDamage ? true : false}
                    onChange={handleChangeCarDamage}
                  >
                    {damages.map((damage) => (
                      <Option key={damage} value={damage}>
                        {damage}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    size="lg"
                    label="Стоимость до повреждений (USD)*"
                    {...register("preAccidentValue", {
                      required: "Поле обязательно к заполнению",
                      pattern: {
                        value: /^[\d]+([.][\d]{1,2})?$/,
                        message: "Неверная стоимость!",
                      },
                    })}
                    error={errors?.preAccidentValue ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChangeCar(e)}
                  />
                  <div className=" text-red-500 font-raleway -mt-2">
                    {errors?.preAccidentValue && (
                      <p>
                        {errors?.preAccidentValue?.message.toString() ||
                          "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <Select
                    label="Выберите цвет*"
                    size="lg"
                    name="color"
                    value={lot.car.color}
                    error={errors?.color ? true : false}
                    onChange={handleChangeCarColor}
                  >
                    {colors.map((color) => (
                      <Option key={color} value={color}>
                        {color}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-3">
                  <Select
                    label="Выберите привод*"
                    size="lg"
                    name="drive"
                    value={lot.car.drive}
                    error={errors?.drive ? true : false}
                    onChange={handleChangeCarDrive}
                  >
                    {drives.map((drive) => (
                      <Option key={drive} value={drive}>
                        {drive}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-grow-1 sm:w-[250px] lg:min-w-[300px]">
                <div className="mb-3">
                  <Select
                    label="Уточнение*"
                    size="lg"
                    name="highlights"
                    value={lot.car.highlights}
                    error={errors?.highlights ? true : false}
                    onChange={handleChangeCarHighlights}
                  >
                    {highlights.map((highlight) => (
                      <Option key={highlight} value={highlight}>
                        {highlight}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-3">
                  <Checkbox
                    label="Наличие ключей"
                    name="hasKeys"
                    onChange={handleChangeCarKeys}
                    crossOrigin={undefined}
                  />
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    size="lg"
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    multiple
                    label="Фото автомобиля*"
                    {...register("files", {
                      required: "Поле обязательно к заполнению",
                    })}
                    error={errors?.files ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChangeCarFiles(e)}
                  />
                  <div className=" text-red-500 font-raleway -mt-2">
                    {errors?.files && (
                      <p>
                        {errors?.files?.message.toString() || "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    size="lg"
                    label="Минимальная ставка (USD)*"
                    {...register("minBid", {
                      required: "Поле обязательно к заполнению",
                      pattern: {
                        value: /^[\d]+([.][\d]{1,2})?$/,
                        message: "Неверная стоимость!",
                      },
                    })}
                    error={errors?.minBid ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChangeLot(e)}
                  />
                  <div className=" text-red-500 font-raleway -mt-2">
                    {errors?.minBid && (
                      <p>
                        {errors?.minBid?.message.toString() || "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    size="lg"
                    label="Ставка выкупа (USD)*"
                    {...register("maxBid", {
                      required: "Поле обязательно к заполнению",
                      pattern: {
                        value: /^[\d]+([.][\d]{1,2})?$/,
                        message: "Неверная стоимость!",
                      },
                    })}
                    error={errors?.maxBid ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChangeLot(e)}
                  />
                  <div className=" text-red-500 font-raleway -mt-2">
                    {errors?.maxBid && (
                      <p>
                        {errors?.maxBid?.message.toString() || "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="filled"
              size="sm"
              className="mt-6 font-raleway font-semibold"
              type="submit"
              disabled={!isValid}
            >
              Добавить
            </Button>
            <MyAlert
              type="error"
              open={addErrorOpen}
              onClose={() => setAddErrorOpen(false)}
            >
              {addError}
            </MyAlert>
          </form>
        </Card>
      )}
    </div>
  );
};

export default LotForm;
