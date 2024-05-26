/** @type {import('next').NextConfig} */
const nextConfig = {
	// basePath: '/app',
	images: {
		remotePatterns: [
			{
				hostname: 'img.freepik.com',
			},
			{
				hostname: 'imgbb.com',
			},
		],
	},
};

export default nextConfig;
