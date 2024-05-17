import React, { FC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "../store";
import type { Store } from "redux";

const WrappedApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store = {store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};
// const WrappedApp:FC<AppProps>=({Component
//     <Component {...pageProps} />
// );

export default wrapper.withRedux(WrappedApp);
