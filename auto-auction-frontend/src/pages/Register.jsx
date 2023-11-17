import {
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import AuthService from "API/AuthService";
import MyAlert from "components/UI/Alert/MyAlert";
import { useAuth } from "hooks/useAuth";
import { useFetching } from "hooks/useFetching";
import { useUser } from "hooks/useUser";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ type, setOpenUserModal = null, fetchManagers = null }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    lastname: "",
    phone: "",
    passportNumber: "",
  });
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const { authUser } = useAuth();
  const { addAuthUser } = useUser();
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const {
    fetching: fetchUser,
    isLaoding: isUserLoading,
    error: userError,
    errorOpen: userErrorOpen,
    setErrorOpen: setUserErrorOpen,
  } = useFetching(async () => {
    const response = await AuthService.getCurrentUser();
    setUser(response);
    reset();
  });

  const {
    fetching: fetchRegister,
    isLaoding: isRegisterLoading,
    error: registerError,
    errorOpen: registerErrorOpen,
    setErrorOpen: setRegisterErrorOpen,
  } = useFetching(async () => {
    await AuthService.register({ user });
    setOpenSuccessAlert(true);
    setTimeout(() => router("/login"), 4000);
  });

  const {
    fetching: fetchUpdate,
    isLaoding: isUpdateLoading,
    error: updateError,
    errorOpen: updateErrorOpen,
    setErrorOpen: setUpdateErrorOpen,
  } = useFetching(async () => {
    const response = await AuthService.updateCurrentUser({ user });
    addAuthUser(response);
    fetchUser();
    reset();
  });

  const {
    fetching: fetchAdd,
    isLaoding: isAddLoading,
    error: addError,
    errorOpen: addErrorOpen,
    setErrorOpen: setAddErrorOpen,
  } = useFetching(async () => {
    await AdminService.addManager({ user });
    setOpenUserModal(false);
    fetchManagers();
  });

  useEffect(() => {
    if (authUser && type === "info") {
      fetchUser();
    }
  }, []);

  const handleRegister = async (event) => {
    fetchRegister();
  };

  const handleUpdate = async (event) => {
    fetchUpdate();
  };

  const handleAdd = async (event) => {
    fetchAdd();
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div
      className={`flex ${
        type === "register"
          ? "justify-center py-10 min-h-[75vh]"
          : type === "add"
          ? "justify-center"
          : "py-10 min-h-[75vh]"
      }`}
    >
      {isRegisterLoading || isUserLoading || isUpdateLoading || isAddLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-lg">
          <Card
            color={type === "register" ? "transparent" : "white"}
            shadow={type === "register" ? false : true}
            className={`p-10 w-80 sm:w-96 ${
              type === "info" ? "lg:w-[600px]" : "lg:w-[500px]"
            }`}
          >
            <Typography
              variant="h4"
              color="blue-gray"
              className={`${
                type === "register" || "add" ? "text-center" : "mb-5"
              }`}
            >
              {type === "register"
                ? "Регистрация"
                : type === "add"
                ? "Добавление менеджера"
                : "Личная информация"}
            </Typography>
            <form
              className="mt-4 mb-2"
              onSubmit={(e) => {
                type === "register"
                  ? handleSubmit(handleRegister)(e)
                  : type === "add"
                  ? handleSubmit(handleAdd)(e)
                  : handleSubmit(handleUpdate)(e);
              }}
            >
              <div className="mb-1 flex flex-col gap-3.5">
                <Input
                  size="lg"
                  label="Ваш email*"
                  value={user.email}
                  {...register("email", {
                    required: "Поле обязательно к заполнению",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Неверный формат email!",
                    },
                  })}
                  error={errors?.email ? true : false}
                  crossOrigin={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <div className=" text-red-500 font-raleway -mt-2">
                  {errors?.email && (
                    <p>
                      {errors?.email?.message.toString() || "Ошибка ввода!"}
                    </p>
                  )}
                </div>
                <Input
                  size="lg"
                  label="Ваше имя*"
                  value={user.name}
                  {...register("name", {
                    required: "Поле обязательно к заполнению",
                    pattern: {
                      value: /^[A-Za-zА-Яа-яЁё]+$/,
                      message: "Имя должно содержать буквы!",
                    },
                  })}
                  error={errors?.name ? true : false}
                  crossOrigin={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <div className="text-red-500 font-raleway -mt-2">
                  {errors?.name && (
                    <p>{errors?.name?.message.toString() || "Ошибка ввода!"}</p>
                  )}
                </div>
                <Input
                  size="lg"
                  label="Ваша фамилия*"
                  value={user.surname}
                  {...register("surname", {
                    required: "Поле обязательно к заполнению",
                    pattern: {
                      value: /^[A-Za-zА-Яа-яЁё]+$/,
                      message: "Фамилия должна содержать буквы!",
                    },
                  })}
                  error={errors?.surname ? true : false}
                  crossOrigin={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <div className="text-red-500 font-raleway -mt-2">
                  {errors?.surname && (
                    <p>
                      {errors?.surname?.message.toString() || "Ошибка ввода!"}
                    </p>
                  )}
                </div>
                <Input
                  size="lg"
                  label="Ваше отчество"
                  value={user.lastname}
                  {...register("lastname", {
                    pattern: {
                      value: /^[A-Za-zА-Яа-яЁё]*$/,
                      message: "Отчество должна содержать буквы!",
                    },
                  })}
                  error={errors?.lastname ? true : false}
                  crossOrigin={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <div className="text-red-500 font-raleway -mt-2">
                  {errors?.lastname && (
                    <p>
                      {errors?.lastname?.message.toString() || "Ошибка ввода!"}
                    </p>
                  )}
                </div>
                <Input
                  size="lg"
                  label="Ваш номер телефона*"
                  value={user.phone}
                  {...register("phone", {
                    required: "Поле обязательно к заполнению",
                    pattern: {
                      value: /^(80|\+375)(\(?(29|44|25|33)\)?)[\d]{7}$/,
                      message: "Неверный формат номера телефона!",
                    },
                  })}
                  error={errors?.phone ? true : false}
                  crossOrigin={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <div className="text-red-500 font-raleway -mt-2">
                  {errors?.phone && (
                    <p>
                      {errors?.phone?.message.toString() || "Ошибка ввода!"}
                    </p>
                  )}
                </div>
                <Input
                  size="lg"
                  label="Ваш номер паспорта*"
                  value={user.passportNumber}
                  {...register("passportNumber", {
                    required: "Поле обязательно к заполнению",
                    pattern: {
                      value: /^(AB|BM|HB|KH|MP|MC|KB|PP|SP|DP)[\d]{7}$/,
                      message:
                        "Неверный формат номера паспорта! Используйте латиницу!",
                    },
                  })}
                  error={errors?.passportNumber ? true : false}
                  crossOrigin={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <div className="text-red-500 font-raleway -mt-2">
                  {errors?.passportNumber && (
                    <p>
                      {errors?.passportNumber?.message.toString() ||
                        "Ошибка ввода!"}
                    </p>
                  )}
                </div>
                <Input
                  type="password"
                  size="lg"
                  label="Ваш пароль*"
                  {...register("password", {
                    required: "Поле обязательно к заполнению",
                    minLength: {
                      value: 5,
                      message: "Минимум 5 символов!",
                    },
                  })}
                  error={errors?.password ? true : false}
                  crossOrigin={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <div className="text-red-500 font-raleway -mt-2">
                  {errors?.password && (
                    <p>
                      {errors?.password?.message.toString() || "Ошибка ввода!"}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="filled"
                size="sm"
                className="mt-6 font-raleway font-semibold hidden lg:inline-block"
                fullWidth
                type="submit"
                disabled={!isValid}
              >
                {type === "register"
                  ? "Регистрация"
                  : type === "add"
                  ? "Добавить"
                  : "Сохранить"}
              </Button>
              {type === "register" ? (
                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal font-raleway"
                >
                  Аккаунт уже существует?{" "}
                  <Link to="/login" className=" text-gray-800 font-semibold">
                    Вход
                  </Link>
                </Typography>
              ) : (
                ""
              )}
            </form>
          </Card>
          <MyAlert
            type="error"
            open={
              type === "info" && authUser
                ? updateErrorOpen || userErrorOpen
                : type === "add"
                ? addErrorOpen
                : registerErrorOpen
            }
            onClose={
              type === "info" && authUser
                ? updateErrorOpen
                  ? () => setUpdateErrorOpen(false)
                  : userErrorOpen
                  ? () => setUserErrorOpen(false)
                  : addErrorOpen
                  ? () => setAddErrorOpen(false)
                  : () => setRegisterErrorOpen(false)
                : () => setRegisterErrorOpen(false)
            }
          >
            {type === "info" && authUser
              ? updateError || userError
              : type === "add"
              ? addError
              : registerError}
          </MyAlert>
          <MyAlert type="info" open={openSuccessAlert}>
            Вы успешно зарегистрировались!
          </MyAlert>
        </div>
      )}
    </div>
  );
};

export default Register;
