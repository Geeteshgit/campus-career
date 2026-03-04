"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ReduxInitializer from "../components/ReduxInitializer";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ReduxInitializer />
      {children}
    </Provider>
  );
}
