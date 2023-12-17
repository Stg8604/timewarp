import "./App.css";

import Router from "@router/index";
import { useEffect } from "react";
import { store } from "@stores/index.ts";
import { Provider } from "react-redux";
import "@mantine/core/styles.css";
import { ErrorBoundary } from "react-error-boundary";
import { MantineProvider } from "@mantine/core";
import { Fallback } from "./components/index.tsx";
import { PythonProvider } from "react-py";

function App() {
  useEffect(() => {
    navigator.serviceWorker
      .register("./react-py-sw.js")
      .then((registration) =>
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope,
        ),
      )
      .catch((err) => console.log("Service Worker registration failed: ", err));
  }, []);

  return (
    <>
      <ErrorBoundary fallbackRender={Fallback}>
        <PythonProvider>
          <MantineProvider>
            <Provider store={store}>
              <Router />
            </Provider>
          </MantineProvider>
        </PythonProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
