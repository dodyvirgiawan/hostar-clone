/* eslint-disable @next/next/no-page-custom-font */

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
					rel="stylesheet"
				/>
			</head>

			<body>
				<main>{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
