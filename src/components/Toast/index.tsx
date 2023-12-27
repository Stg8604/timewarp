import { notifications } from "@mantine/notifications";
import { IconX, IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { TOAST_SUCCESS, TOAST_INFO } from "@utils/ToastStatus";

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
		autoClose: 3000,
	});
};

export default Toast;
