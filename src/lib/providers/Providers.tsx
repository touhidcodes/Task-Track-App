"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <Provider store={store}>{children}</Provider>
      </SessionProvider>
    </>
  );
};

export default Providers;
