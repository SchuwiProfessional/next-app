"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Fragment, useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react';
import './navbar.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header>
      <nav className="bg-gradient-to-r from-orange-300 to-orange-800 p-3 shadow-md">
        <ul className="flex justify-center space-x-14 text-white text-base font-medium">
          <li className="hover:text-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-100">
            <Link href="/start">Inicio</Link>
          </li>
          <li className="hover:text-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-100">
            <Link href="/products">Productos</Link>
          </li>
          <li className="hover:text-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-100">
            <Link href="/notification">Notificaciones</Link>
          </li>
          <li className="hover:text-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-100">
            <Link href="/salesRecord">Registro de Ventas</Link>
          </li>
          <div className="menu-container">            
            <Menu as="div" className="relative ml-3 inline-block text-left">
              <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/register" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                          Registrar
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={handleLogout} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'w-full text-left block px-4 py-2 text-sm')}>
                          Cerrar SesiÃ³n
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>            
          </div>
        </ul>
      </nav>
    </header>
  );
}