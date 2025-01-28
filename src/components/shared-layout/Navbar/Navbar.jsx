"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { PhoneIcon } from "lucide-react";
import { MenuIcon } from "lucide-react";
import logo from "/public/logos/logo.svg";
import Image from "next/image";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import NavLink from "./NavLink";
import {
  navbarLinks,
  supportedCurrencies,
  supportedLanguages,
} from "./navbar.constant";
import NavDropdown from "./NavDropdown";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import { useState } from "react";
import { House } from "lucide-react";

export default function Navbar() {
  // Navbar dropdown states: Currency & Language
  const [selectedCurrency, setSelectedCurrency] = useState(
    supportedCurrencies[1],
  ); // euro
  const [selectedLanguage, setSelectedLanguage] = useState(
    supportedLanguages[1],
  ); // es

  return (
    <header className="bg-light-sky-blue sticky top-0 z-50 w-full dark:bg-gray-950">
      <ResponsiveContainer className="flex-center-between h-[85px]">
        <div className="flex-center-start gap-x-16">
          <div className="flex-center-start gap-x-3">
            {/* Mobile Navbar */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  // variant="outline"
                  size="icon"
                  className="bg-light-sky-blue size-8 border border-p1 text-p1 shadow-none md:hidden"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                <div className="grid gap-4 p-4">
                  <Link
                    href="#"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    About
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Services
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/">
              <Image
                src={logo}
                alt="Logo of DAYF Booking"
                height={110}
                width={110}
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            {navbarLinks.map((link) => (
              <NavLink key={link.id} label={link.label} href={link.route} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <NavDropdown
            values={supportedCurrencies}
            selectedValue={selectedCurrency}
            setSelectedValue={setSelectedCurrency}
          />

          <NavDropdown
            values={supportedLanguages}
            selectedValue={selectedLanguage}
            setSelectedValue={setSelectedLanguage}
          />

          <Button
            variant="outline"
            className="rounded-full ease-in-out group h-10 gap-x-2 border border-[#A5D3F1] bg-transparent px-4 text-p1 shadow-none transition-all duration-300 hover:bg-p1 hover:text-white"
          >
            <span className="hidden xl:flex xl:items-center xl:gap-x-2">
              List your property <AnimatedArrow variant="vertical" />
            </span>

            <House className="block xl:hidden" />
          </Button>

          <Button variant="primary" className="rounded-full h-10 px-5">
            Log In
          </Button>
        </div>
      </ResponsiveContainer>
    </header>
  );
}
