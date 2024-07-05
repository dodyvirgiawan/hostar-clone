/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,

	images: {
		// ? This ensures that only images from the official TMDB website can be served on the website.
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
