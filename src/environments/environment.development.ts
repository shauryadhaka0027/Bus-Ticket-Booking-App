export interface Environment {
    production: boolean;
    API_URL: string;
  }
export const environment = {
    production: true,
    API_URL: 'https://bus-ticket-booking-server.onrender.com/api',
};
