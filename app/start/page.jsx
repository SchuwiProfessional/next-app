"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/navbar";  

export default function startPage() {
    return (
      <>
        <Navbar/>
        <div className="index-page-body flex flex-col items-center justify-center bg-cover bg-center">        
          <div className="flex flex-col items-center justify-center h-screen bg-white-100">
            <div className="lg:text-center flex flex-wrap items-center justify-center">
              <div className="w-full md:w-1/2 lg:w-1/3 text-center lg:text-left">
                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                  <span className="block xl:inline text-black-20">LA CASA EL FRENO HUANCAYO E.I.R.L <b></b></span>
                  <span className="block xl:inline text-orange-500">
                    FRENOSA
                  </span>
                </h1>
                <p className="mt-3 max-w-md mx-auto lg:mx-0 text-base text-black-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Tenemos Venta y Reparacion de sistema de frenos y embrague en general.
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-2/3 lg:ml-8">
                <a href="">
                  <img className="mx-auto w-64" src="https://i.pinimg.com/564x/08/69/d1/0869d15820debdbbfa601d0794a64ee6.jpg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </>      
    );
  }
  