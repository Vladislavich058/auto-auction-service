import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import LotNewItem from "./LotNewItem";

const LotNewList = ({ lots }) => {
  const router = useNavigate();
  return (
    <div>
      <div className="flex flex-wrap justify-around">
        {lots.map((lot) => (
          <LotNewItem key={lot.id} lot={lot}></LotNewItem>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Button
          variant="outlined"
          className="font-semibold text-sm"
          size="sm"
          onClick={() => router("/lots")}
        >
          Просмотреть все авто
        </Button>
      </div>
    </div>
  );
};

export default LotNewList;
