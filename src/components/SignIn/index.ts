// const PORT = 4361;

import { config } from 'dotenv';
// import { providers } from 'ethers';
// import Express from 'express';
// import Session from 'express-session';
// import fs from 'fs';
// import Helmet from 'helmet';
// import Morgan from 'morgan';
// import Path from 'path';
// import FileStore from 'session-file-store';
// import { ErrorTypes, SiweMessage, generateNonce } from 'siwe';
// const FileStoreStore = FileStore(Session);

config();
// const PROD = process.env.ENVIRONMENT === 'production';
// const STAGING = process.env.ENVIRONMENT === 'staging';

// if (!process.env.SESSION_COOKIE_NAME || !process.env.SECRET) {
//     setTimeout(
//         () =>
//             console.log(
//                 '\n\n\n\nProject running with default values!\n\n\n\n',
//                 'To get rid of this message please define SESSION_COOKIE_NAME and SECRET in a .env file.\n\n',
//             ),
//         5000,
//     );
// }
// declare module 'express-session' {
//     interface SessionData {
//         siwe: SiweMessage;
//         nonce: string;
//         ens: string;
//     }
// }

// const app =Express();








// app.use(
//     Helmet({
//         contentSecurityPolicy: false,
//     }),
// );
// app.use(Express.json({ limit: 43610 }));
// app.use(Express.urlencoded({ extended: true }));
// app.use(Morgan('combined'));
