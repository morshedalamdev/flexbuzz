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
      {children}
    </Fragment>
  );
}
