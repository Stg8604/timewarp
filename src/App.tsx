import "./App.css";

import Router from "@router/index";
import { useEffect } from "react";
import { store } from "@stores/index.ts";
import { Provider } from "react-redux";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { ErrorBoundary } from "react-error-boundary";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Fallback } from "@components/index";
import { PythonProvider } from "react-py";
import { theme } from "@utils/index.ts";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReCAPTCHA_SITE_KEY } from "@config/config";

function App() {
	useEffect(() => {
		navigator.serviceWorker
			.register("./react-py-sw.js")
			.then((registration) =>
				console.log(
					"Service Worker registration successful with scope: ",
					registration.scope
				)
			)
			.catch((err) => console.log("Service Worker registration failed: ", err));
	}, []);

	return (
		<>
			<ErrorBoundary fallbackRender={Fallback}>
				<PythonProvider>
					<MantineProvider theme={theme}>
						<GoogleReCaptchaProvider reCaptchaKey={ReCAPTCHA_SITE_KEY}>
							<Notifications
								position="bottom-right"
								zIndex={1000}
								autoClose={5000}
							/>
							<Provider store={store}>
								<Router />
							</Provider>
						</GoogleReCaptchaProvider>
					</MantineProvider>
				</PythonProvider>
			</ErrorBoundary>
		</>
	);
}

export default App;
