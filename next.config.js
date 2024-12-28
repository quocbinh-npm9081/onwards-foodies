/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol : 'https',
                hostname : 'binhquoc-nextjs-15-dummy-data.s3.ap-southeast-2.amazonaws.com',
                port : '',
                pathname: '/**'
            }
        ]
    },
}

module.exports = nextConfig
