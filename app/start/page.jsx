"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/navbar";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function StartPage() {
  return (
    <>
      <Navbar />
      <div className="index-page-body flex flex-col items-center justify-center bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mt-8">
            <Image src="https://i.postimg.cc/B6Zw1wCd/logo1.jpg " alt="Logo" className="ml-2 h-8" />
            <h1 className="text-3xl font-bold">La casa del Freno Huancayo</h1>
          </div>
          <div className="lg:text-center mt-8">
            <Carousel
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              dynamicHeight={false}
              width="100%"
              className="overflow-hidden"
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 p-2 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 p-2 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                )
              }
            >
              <CarouselSlide
                imageSrc="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_640,h_236/https://www.elmegatop.com/wp-content/uploads/17-portada-facebook-aston-martin-dbc-concept-2013-1.jpg"
                className="w-full h-auto object-cover"
              />
              <CarouselSlide
                imageSrc="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_640,h_236/https://www.elmegatop.com/wp-content/uploads/17-portada-facebook-aston-martin-dbc-concept-2013-1.jpg"
                className="w-full h-auto object-cover"
              />
              <CarouselSlide
                imageSrc="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_640,h_236/https://www.elmegatop.com/wp-content/uploads/17-portada-facebook-aston-martin-dbc-concept-2013-1.jpg"
                className="w-full h-auto object-cover"
              />
            </Carousel>
          </div>

          {/* Cuadros de productos populares */}
          <div className="flex justify-center mt-8">
            <div className="w-1/3 px-4">
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://http2.mlstatic.com/D_NQ_NP_610664-MLM42558926239_072020-O.webp"
                  alt="Producto 1"
                  className="w-full h-auto object-cover mb-4"
                />
                <h2 className="text-lg font-bold mb-2">Patillas de Freno</h2>
                <p className="text-gray-700">Fritec</p>
              </div>
            </div>

            <div className="w-1/3 px-4">
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://images-na.ssl-images-amazon.com/images/I/81dCbCz8PYL._AC_UL600_SR600,600_.jpg"
                  alt="Producto 2"
                  className="w-full h-auto object-cover mb-4" 
                />
                <h2 className="text-lg font-bold mb-2">Blue Hi-Temp</h2>
                <p className="text-gray-700">Grasa</p>
              </div>
            </div>

            <div className="w-1/3 px-4">
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://www.frenosa.com/wp-content/uploads/2019/06/pastillas-ceramik-ex.png"
                  alt="Producto 3"
                  className="w-full h-auto object-cover mb-4"
                />
                <h2 className="text-lg font-bold mb-2">Pastillas de freno</h2>
                <p className="text-gray-700">Frenosa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

function CarouselSlide({ imageSrc, captionTitle, captionText }) {
  return (
    <div className="relative">
      <Image className="w-full" src={imageSrc} alt="" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">{captionTitle}</h3>
        <p className="text-lg">{captionText}</p>
      </div>
    </div>
  );
}
