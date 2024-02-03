import { Reguser, Regpassword } from "@components/index";
import { Button } from "@mantine/core";
import { Text } from "@mantine/core";
import cta from "/assets/signup.svg";
// import reglogin from "/assets/reglogin.svg";
import { FC, MouseEvent } from "react";
type MyComponentProps = RegProps & {
	onButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
	onButtonClick2: (event: MouseEvent<HTMLButtonElement>) => void;
};
const regprops: FC<MyComponentProps> = ({
	input,
	onButtonClick,
	onButtonClick2,
}) => {
	return (
		<>
			<Reguser field="username" save={input} title="USERNAME" />
			<Reguser field="email" save={input} title="EMAIL" />
			<Regpassword field="password" save={input} title="PASSWORD" />
			<Regpassword field="confirm" save={input} title="CONFIRM PASSWORD" />
			<Reguser field="college" save={input} title="COLLEGE" />
			<Reguser field="phonenumber" save={input} title="PHONE NUMBER" />

			<div className="flex flex-col mt-8">
				<Button
					className="w-fit mx-auto h-10 sm:h-10 xl:h-10 object-cover transition-transform transform hover:scale-110 "
					onClick={onButtonClick}
				>
					<img src={cta} className="w-full h-full" />
				</Button>
				<Button
					className="flex justify-start -left-8 sm:-left-0 sm:mx-auto w-fit mt-2"
					onClick={onButtonClick2}
				>
					<Text
						className=""
						styles={(theme) => ({
							root: {
								fontSize: theme.fontSizes.md,
								backgroundColor: "transparent",
								fontFamily: "pixelifySans",
								color: theme.colors.blue[0],
							},
						})}
					>
						have an account? login!
					</Text>
				</Button>
			</div>
		</>
	);
};
export default regprops;
