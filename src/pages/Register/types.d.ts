interface IRegister {
	username: string;
	email: string;
	password: string;
	confirm: string;
	token: string;
	college: string;
	phonenumber: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}
