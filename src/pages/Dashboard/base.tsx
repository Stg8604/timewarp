const Base = () => {
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
					height: "auto",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						height: "auto",
					}}
				>
					<img
						src="assets/Dashboard/base.svg"
						alt=""
						style={{ width: "100%", scale: "1.4" }}
					/>
					<img
						src="assets/Dashboard/timewarp.png"
						alt=""
						style={{
							width: "70%",
							position: "relative",
							top: "-80%",
							left: "1%",
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default Base;
