import React from "react";
import { Carousel } from "flowbite-react";
const CarouselSale: React.FC = () => {
  return (
    <>
      <div className="mx-auto rounded-md grid lg:grid-cols-5 md:grid-cols-1 gap-2 bg-white p-2">
        <div className="col-span-2 rounded-lg overflow-hidden row-span-2 h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
            <img
              src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/0a/e0/f6/351e1b794bbd0cdfa9eeae0bc3666da0.jpg.webp"
              alt=""
              className="object-center object-fill"
            />
            <img
              src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/1f/34/69/e7bd9c98ebc1acf58920f6be9c586d41.jpg.webp"
              alt=""
              className="object-fill object-center w-full h-full"
            />
          </Carousel>
        </div>
        <div className="col-span-2 rounded-lg overflow-hidden row-span-2 h-56 sm:h-64 xl:h-80 2xl:h-96">
            <img
              src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/1c/dd/63/fbc1285a64df45f44bb0472242b0b11f.png.webp"
              alt=""
              className="object-center object-fill"
            />
        </div>
        <div className="col-span-1 row-span-2">
          <div className="rounded-lg overflow-hidden  h-24 sm:h-32 xl:h-40 2xl:h-48">
            <img
              src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/dd/d9/57/1ff16147cb7476768e64a314e4aa2dbf.jpg.webp"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="rounded-lg overflow-hidden  h-24 sm:h-32 xl:h-40 2xl:h-48">
            <img
              src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/98/96/88/5ef11e31ccc1eebebf589ec5836e9d09.jpg.webp"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CarouselSale;
