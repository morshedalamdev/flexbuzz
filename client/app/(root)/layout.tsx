import Header from "@/components/header";
import React, { Fragment } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Header />
      <main className="flex w-full min-h-[calc(100dvh-48px)] max-w-3xl p-3 mx-auto flex-col items-center bg-white dark:bg-black">
        {children}
      </main>
    </Fragment>
  );
}
