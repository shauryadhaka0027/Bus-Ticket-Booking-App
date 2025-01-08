export interface Environment {
    production: boolean;
    API_URL: string;
  }
export const environment = {
    production: true,
    API_URL: 'http://localhost:3000/api',
};
