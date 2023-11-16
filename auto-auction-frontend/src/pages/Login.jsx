import {
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import AuthService from "API/AuthService";
import MyAlert from "components/UI/Alert/MyAlert";
import { useAuth } from "hooks/useAuth";
import { useFetching } from "hooks/useFetching";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const router = useNavigate();

  const [
    fetchLogin,
    isLoginLoading,
    loginError,
    loginErrorOpen,
    setLoginErrorOpen,
  ] = useFetching(async () => {
    const response = await AuthService.login({ user });
    login(response);
    router("/profile");
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const handleLogin = async () => {
    fetchLogin();
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div className="min-h-[75vh] flex py-32 justify-center">
      {isLoginLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div>
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray" className="text-center">
              Вход
            </Typography>
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={(e) => handleSubmit(handleLogin)(e)}
            >
              <div className="mb-1 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Ваш email*"
                  name="email"
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
                <div className="text-red-500 font-raleway -mt-5">
                  {errors?.email && (
                    <p>
                      {errors?.email?.message.toString() || "Ошибка ввода!"}
                    </p>
                  )}
                </div>
                <Input
                  type="password"
                  size="lg"
                  label="Ваш пароль*"
                  name="password"
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
                <div className="text-red-500 font-raleway -mt-5">
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
                className="mt-6 font-raleway font-semibold"
                fullWidth
                type="submit"
                disabled={!isValid}
              >
                Вход
              </Button>
              <Typography
                color="gray"
                className="mt-4 text-center font-normal font-raleway"
              >
                Нет аккаунта?{" "}
                <Link to="/register" className="font-semibold text-gray-800">
                  Регистрация
                </Link>
              </Typography>
            </form>
          </Card>
          <MyAlert
            type="error"
            open={loginErrorOpen}
            onClose={() => setLoginErrorOpen(false)}
          >
            {loginError}
          </MyAlert>
        </div>
      )}
    </div>
  );
};

export default Login;
