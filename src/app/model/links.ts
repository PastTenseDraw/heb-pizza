export const baseURL = 'https://pizza-api-app.herokuapp.com/api';
export const loginLink = `${baseURL}/auth`;
export const orderLink = `${baseURL}/orders`;
export const orderIdLink = (orderId: number) => `${orderLink}/${orderId}`;
