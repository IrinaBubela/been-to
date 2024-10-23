// Read environment variables from process.env
const environment = 'nonprod';
const apiKey = '';

// Determine the target environment file based on the environment variable
const targetPath = './src/environments/environment.ts';

// Define the content of the environment file
const envConfigFile = `
export const environment = {
  production: false,
  googleMapsApiKey: '${apiKey}'
};
`;