import React from "react";
export default function IndexPage() {
  return (
    <div className="index-page-body flex flex-col items-center justify-center bg-cover bg-center">
      <div className="flex flex-col items-center justify-center h-screen bg-white-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Repuestos para carros</span>
              <span className="block text-indigo-600 xl:inline">
                de todas las marcas
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Tenemos una amplia selección de repuestos para todo tipo de
              carros, desde motores hasta neumáticos.
            </p>
          </div>

          <div className="mt-10">
            <ul className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <li>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      {/* Icono de pieza de repuesto */}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      Motores
                    </h4>
                    <p className="mt-1 text-base text-gray-500">
                      Tenemos motores de todo tipo, desde los más pequeños hasta
                      los más grandes y potentes.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      {/* Icono de llanta */}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      Neumáticos
                    </h4>
                    <p className="mt-1 text-base text-gray-500">
                      Contamos con una gran variedad de neumáticos para todo
                      tipo de carros y necesidades.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      {/* Icono de sistema de frenos */}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      Sistemas de frenos
                    </h4>
                    <p className="mt-1 text-base text-gray-500">
                      Ofrecemos una amplia selección de sistemas de frenos de
                      alta calidad para mantener tu carro seguro en la
                      carretera.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      {/* Icono de transmisión */}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      Transmisiones
                    </h4>
                    <p className="mt-1 text-base text-gray-500">
                      Tenemos transmisiones de alta calidad para todos los
                      modelos de carros, desde los más antiguos hasta los más
                      nuevos.
                    </p>
                  </div>
                </div>
              </li>

              {/* Agrega más categorías aquí */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
