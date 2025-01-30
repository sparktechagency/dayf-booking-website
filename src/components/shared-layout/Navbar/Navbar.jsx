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
import messageIcon from "/public/images/navbar/message-icon.svg";
import userAvatar from "/public/images/navbar/dummy-user.jpg";
import CustomAvatar from "@/components/CustomAvatar/CustomAvatar";
import { MessageCircleIcon } from "@/utils/svgLibrary";

export default function Navbar() {
  // Navbar dropdown states: Currency & Language
  const [selectedCurrency, setSelectedCurrency] = useState(
    supportedCurrencies[1],
  ); // euro
  const [selectedLanguage, setSelectedLanguage] = useState(
    supportedLanguages[1],
  ); // es

  // TODO: Use actual user data
  const userId = true;

  return (
    <header className="sticky top-0 z-50 w-full bg-light-sky-blue dark:bg-gray-950">
      <ResponsiveContainer className="flex-center-between h-[85px]">
        <div className="flex-center-start gap-x-16">
          <div className="flex-center-start gap-x-3">
            {/* Mobile Navbar */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  // variant="outline"
                  size="icon"
                  className="size-8 border border-p1 bg-light-sky-blue text-p1 shadow-none md:hidden"
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
            className="group h-10 gap-x-2 rounded-full border border-[#A5D3F1] bg-transparent px-4 text-p1 shadow-none transition-all duration-300 ease-in-out hover:bg-p1 hover:text-white"
          >
            <span className="hidden xl:flex xl:items-center xl:gap-x-2">
              List your property <AnimatedArrow variant="vertical" />
            </span>

            <House className="block xl:hidden" />
          </Button>

          {!userId ? (
            <Button variant="primary" className="h-10 rounded-full px-5">
              Log In
            </Button>
          ) : (
            <>
              <Link
                href="/messages"
                className="flex-center aspect-square h-10 rounded-full bg-white/50"
              >
                <MessageCircleIcon />
              </Link>

              <Link
                href="/user/profile"
                className="flex-center h-10 gap-x-2 rounded-full bg-white/50 pl-2 pr-3 text-p1 hover:text-p1/80"
              >
                <CustomAvatar
                  img={userAvatar?.src}
                  name="Uzzal Bhowmik"
                  className="size-8"
                />
                <h5 className="text-base">Uzzal</h5>
              </Link>
            </>
          )}
        </div>
      </ResponsiveContainer>
    </header>
  );
}
