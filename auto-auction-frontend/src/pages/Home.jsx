import { Typography } from "@material-tailwind/react";
import React from "react";
import LotsNew from "../components/LotsNew";

const Home = () => {
  return (
    <div>
      <div className="my-16 bg-origin-border w-full h-[60vh] bg-center bg-cover bg-[url('images/bgcar1.jpg')]"></div>
      <Typography variant="h2" className="font-medium text-center">
        Выгодные слоты
      </Typography>
      <LotsNew />
    </div>
  );
};

export default Home;
