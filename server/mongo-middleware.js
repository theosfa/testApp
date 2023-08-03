// // ~/server/mongo-middleware.js
// import mongo from '~/plugins/mongo';

// export default async function (req, res, next) {
//   try {
//     const database = await mongo();
//     req.mongo = database;
//     return next();
//   } catch (error) {
//     console.error('Error initializing MongoDB middleware:', error);
//     res.statusCode = 500;
//     return res.json({ error: 'Internal server error' });
//   }
// }
