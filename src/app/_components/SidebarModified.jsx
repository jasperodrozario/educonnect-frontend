"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";

import {
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconLogin,
  IconLogout,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function SidebarModified({
  children,
  loginStatus = false,
  animate = true,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Links that appear without authentication
  const baseLinks = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  // Links that appear only when logged in
  const authenticatedLinks = [
    {
      label: "Profile",
      href: "/profile", // Updated href to route to the profile page
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  // Login and logout links
  const loginLink = {
    label: "Login",
    href: "/login",
    icon: (
      <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    onClick: () => setIsLoggedIn(true),
  };

  const logoutLink = {
    label: "Logout",
    href: "#",
    icon: (
      <IconLogin className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    onClick: () => setIsLoggedIn(loginStatus),
  };

  // Combine links based on authentication state
  const links = [
    ...baseLinks,
    ...(isLoggedIn ? authenticatedLinks : []),
    isLoggedIn ? logoutLink : loginLink,
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={animate}>
        <SidebarBody className="justify-between gap-2">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={link.onClick}>
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          <div>
            {isLoggedIn ? (
              <SidebarLink
                link={{
                  label: "John Doe",
                  href: "/profile",
                  icon: (
                    <img
                      src="/avatars/mantaka.jpg"
                      className="h-8 w-8
                       rounded-full"
                      alt="Avatar"
                    />
                  ),
                }}
              />
            ) : (
              <div className=""></div>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 px-[1rem] flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-orange-400" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        <h1 className="font-bold text-[18px]">EduConnect</h1>
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 px-[1rem] flex items-center space-x-2 py-[0.42rem] pt-[0.45rem] text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-orange-400 dark:bg-white" />
    </Link>
  );
};
