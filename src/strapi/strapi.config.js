import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.API_URL || "http://5.189.183.44:1338";
export const strapi = new Strapi(apiUrl);

