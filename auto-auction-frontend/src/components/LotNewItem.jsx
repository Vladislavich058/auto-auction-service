import Typography from "@mui/material/Typography";
import React from "react";
// import ImageGallery from "react-image-gallery";
import {
  Button,
  Card,
  CardBody,
  Carousel,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getLastBid } from "utils/bids";

const LotNewItem = ({ lot }) => {
  //   const images = car.files.map((file) => ({
  //     original: file.fileUri,
  //   }));
  const router = useNavigate();
  return (
    <Card className="w-[400px] my-5">
      {lot.car.files.length ? (
        // <ImageGallery
        //   items={images}
        //   showPlayButton={false}
        //   showFullscreenButton={false}
        //   renderRightNav={(onClick, disabled) => (
        //     <button
        //       onClick={onClick}
        //       disabled={disabled}
        //       className="text-white z-10 absolute right-1 top-[40%]"
        //     >
        //       <svg
        //         xmlns="http://www.w3.org/2000/svg"
        //         fill="none"
        //         viewBox="0 0 24 24"
        //         strokeWidth={1.5}
        //         stroke="currentColor"
        //         className="w-6 h-6"
        //       >
        //         <path
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //           d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        //         />
        //       </svg>
        //     </button>
        //   )}
        //   renderLeftNav={(onClick, disabled) => (
        //     <button
        //       onClick={onClick}
        //       disabled={disabled}
        //       className="text-white z-10 absolute left-1 top-[40%]"
        //     >
        //       <svg
        //         xmlns="http://www.w3.org/2000/svg"
        //         fill="none"
        //         viewBox="0 0 24 24"
        //         strokeWidth={1.5}
        //         stroke="currentColor"
        //         className="w-6 h-6"
        //       >
        //         <path
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //           d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        //         />
        //       </svg>
        //     </button>
        //   )}
        // />
        <Carousel
          className="rounded-t-xl"
          navigation={() => ""}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-4 -translate-y-2/4"
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
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-4 -translate-y-2/4"
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
        >
          {lot.car.files.map((file) => (
            <img
              key={file.name}
              src={file.uri}
              alt={file.name}
              className="h-[300px] w-[400px] object-cover overflow-hidden object-center"
            />
          ))}
        </Carousel>
      ) : (
        <h1 style={{ padding: 16, height: 200 }}>Нет фото</h1>
      )}
      <CardBody>
        <Typography variant="h6" className="!font-raleway uppercase">
          {lot.car.yearOfManufacture} {lot.car.name} {lot.car.model}
        </Typography>
        <Typography className="!font-raleway">Лот # {lot.id}</Typography>
        <Typography className="!font-raleway">
          Текущая ставка:{" "}
          <span className="text-2xl uppercase text-green-400">
            $ {getLastBid(lot)}
          </span>
        </Typography>
        <div className="mt-5">
          <Button
            variant="filled"
            size="sm"
            className="font-raleway font-semibold hidden lg:inline-block"
            onClick={() => router(`/lots/${lot.id}`)}
          >
            Просмотреть
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default LotNewItem;
