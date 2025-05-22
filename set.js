const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME5vZjR3Z3Q5bXBWRXRMZHBJeUR4YmdVTUVuci9mMmNsdi82WkN0Z3lHZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU4wTWNPejdHN0pzSkxQeTE5VWtjTVIzem0xTk05d1FLRUZOQzNKOTR6TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHUHZyTFM3dVVOQWlsTWx6ZEJFVDJBNFNucmg1anVCaUVickdCZFRvYUU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHVVFqR1BOYmEzaGdZTXJTby9JSDUrQXhESW5mMkg2eEtGUlo3akRJYUJVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1Ed2x4cW15S1JWNDZ1UEJhTFEvOFZZbFRlYWQ0djZnWllCVWRUWldKRTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9IWEswVXdRRkY4OThidXZsMU5EKysxZW1FRDl2KzRRM0pENVlOcWpDRGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEpoL29xL2x3T0MrRFRpMmorNFNCc3pJMnpUK2cyeXA4UGgrT1NOME5Fcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZkRQOVUzNFh5L3RIS0VpVW4xNGREWjVKV2pOekt3eFdteGdzTnBhMGFXST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhqcDJvelRCRXpjcUhGRWk0V1lxMWlFVjdpbEloc2lpWlMzYi9VMkFXamRwWWQ3V0xFK1pHOTcrdXkzVlJtVVVMYkVnSks3Z29FT3BYQlNKVXIvWmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODcsImFkdlNlY3JldEtleSI6IklHYU8rZUl5dlpHSVpDTmUxbnlhenF6QitlN2Y2dXZDckFXUi9XSUk2TU09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3Njk1MDczNDc3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBNkFERDFBRTA2RDI1NURGMzk4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc4OTQ2MzF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNzY5NTA3MzQ3N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUZCMzU2QUMyREJFQ0Q3RDA1QyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3ODk0NjM0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzc2OTUwNzM0NzdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0E5MTMxNjAwODAyNkJFMTEzMEMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0Nzg5NDY0NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3Njk1MDczNDc3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBNzEwQ0MwNTI2NkU3M0FCOEYwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc4OTQ2NTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNzY5NTA3MzQ3N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUE2NDU4REQ3MUUzRjI3OTdENiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3ODk0NjYwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxMjNMT1RVUyIsIm1lIjp7ImlkIjoiMjM3Njk1MDczNDc3OjMyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjQxMjEwNTY0MzIxMzA6MzJAbGlkIiwibmFtZSI6IkNhbGViIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQWHYxT29ERU5HQ3U4RUdHQm9nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJNMzBqWkYxUDgwZGM1MUYrMzFKVnJtdjVKdXgvMjZTNGFlRE1HY0plQlNRPSIsImFjY291bnRTaWduYXR1cmUiOiJOL2s2bnA5ZUVJTHU2dklBbmx0S3BIcXQrRnNhNUVoNnFFMmk2SjdkWjFTMmNWMDAyZ0UrbkFqcEFIc2toNFFTSUxBbFVGODdOZk5JK3d5MHRHVG1BUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoidS9QVG84dFpEZkJ1VjdpeGthMXNDV3dDTUpGaXhhZ2hiczNYTkNUdWVzek1aOTBTblYvVjM4Zk9mSVRMK0xIM2pLN1VvZ2VWUjgzcHpEdldDMmd1amc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzc2OTUwNzM0Nzc6MzJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVE45STJSZFQvTkhYT2RSZnQ5U1ZhNXIrU2JzZjl1a3VHbmd6Qm5DWGdVayJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDc4OTQ2MjMsImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFWVYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Charles ke",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Charles ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

