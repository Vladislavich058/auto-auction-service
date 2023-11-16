import { Typography } from "@material-tailwind/react";
import React from "react";
import ElectricIcon from "images/electric.png";

const Footer = () => {
  return (
    <footer className="w-full sticky bg-[#ff8a00] py-8 text-white">
      <div className="flex flex-row flex-wrap items-center justify-center px-5 gap-y-6 gap-x-12 bg-[#ff8a00] text-center md:justify-between">
        <Typography
          as="a"
          href="/"
          className="mr-4 flex cursor-pointer uppercase py-1.5 text-2xl font-gruppo font-semibold"
        >
          <img src={ElectricIcon} alt="electric icon" className="mr-1" />
          <span>Ecarbargain</span>
        </Typography>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              className="font-normal transition-colors hover:text-gray-600 hover:text-opacity-50"
            >
              О нас
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              className="font-normal transition-colors hover:text-gray-600 hover:text-opacity-50"
            >
              Лицензии
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              className="font-normal transition-colors hover:text-gray-600 hover:text-opacity-50"
            >
              Сотрудничество
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              className="font-normal transition-colors hover:text-gray-600 hover:text-opacity-50"
            >
              Связаться с нами
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography className="text-center font-normal">
        &copy; 2023 Ecarbargain
      </Typography>
    </footer>
  );
};

export default Footer;
