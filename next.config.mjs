/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	// When serving the Next.js dashboard under a sub-path (e.g. /dashboard)
	// set `basePath`. You'll then deploy the monorepo with routing so
	// the dashboard is available at example.com/dashboard.
	// Ensure assets are referenced correctly; assetPrefix can be adjusted
	// if you serve assets from a CDN or different prefix.
	assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
	
	// Add security headers and allow cross-origin requests
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Content-Security-Policy",
						value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://apiv2.offersmeta.in https://click.creditsdeal.com; frame-ancestors 'none';",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
				],
			},
		];
	},
	
};

export default nextConfig;
