import nextConfig from 'eslint-config-next/core-web-vitals';

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'dist/**']
  },
  ...nextConfig
];

export default config;
