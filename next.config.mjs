/** @type {import('next').NextConfig} */
const nextConfig = {
	// basePath: '/app',
	images: {
		remotePatterns: [
			{
				hostname: '**',
			},
			{
				hostname: 'https://i.ibb.co/',
			},
		],
	},
};

export default nextConfig;
