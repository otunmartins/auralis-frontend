"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import AppWrapper from "@/components/AppWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppWrapper />
      {children}
    </Provider>
  );
}
