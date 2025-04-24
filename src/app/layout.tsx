import type { Component, PropsWithChildren } from "#/utils/react";
import type { Metadata } from "next";
import "#/styles/tailwind.css";

export const metadata: Metadata = {
  title: "Royaume Sport",
  description: "Statistiques sportives des membres de la communauté du Royaume.",
};

const Layout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
