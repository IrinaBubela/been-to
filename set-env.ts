// Read environment variables from process.env
const environment = process.env['NODE_ENV'];
const apiKey = process.env['GOOGLE_MAPS_API_KEY'];

// Determine the target environment file based on the environment variable
const targetPath = environment === 'production' ? './src/environments/environment.prod.ts' : './src/environments/environment.ts';

// Define the content of the environment file
const envConfigFile = `
export const environment = {
  production: ${environment === 'production'},
  googleMapsApiKey: '${apiKey}'
};
`;