/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bit.ly',
                port: '',
            }
        ]
    }
}

module.exports = nextConfig
