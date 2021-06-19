export const environment = {
  env: 'TEST',
  production: true,
  apiBaseUrl: 'https://neutrackapi.azurewebsites.net/api/',
  apiLocalBaseUrl: 'http://localhost:5000/api/',
};
export function useTestApi() {
  environment.env = 'TEST';
}
export function getApiRoute(apiEndPoint: string): string {
  return environment.env === 'TEST' ? environment.apiBaseUrl + apiEndPoint : environment.apiLocalBaseUrl + apiEndPoint
}
