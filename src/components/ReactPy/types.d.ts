interface IReactPy {
	seederParams: {
		moduleName: string;
		className: string;
		params: { [key: string]: string | number };
		file: string;
		dispatch: (params: { [key: string]: string | number }) => UnknownAction;
	}[];
	defaultInput: string;
}
