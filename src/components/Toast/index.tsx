import { rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { TOAST_SUCCESS, TOAST_INFO } from "@utils/ToastStatus";
import { theme } from "@utils/index";

const Toast = (status: string, message = "") => {
	const StatusToIconMap = (status: string) => {
		switch (status) {
			case TOAST_SUCCESS:
				return <IconCheck />;
			case TOAST_INFO:
				return <IconInfoCircle />;
			default:
				return <IconX />;
		}
	};
	const StatusToTitle = (status: string) => {
		switch (status) {
			case TOAST_SUCCESS:
				return "Success";
			case TOAST_INFO:
				return "Notice";
			default:
				return "Oops";
		}
	};
	notifications.show({
		icon: StatusToIconMap(status),
		title: StatusToTitle(status),
		message: message,
		color: status,
		styles : ({
			root: {
				border: "4px solid " + "#795436",
				height: 80,
				minHeight: 80,
				borderRadius:25,
				marginTop: 0,
				color: "black",
				background:"#FEFECB",
				fontFamily: "pixelifySans",
				font: "bold",
			}
		})
	});
};

export default Toast;
