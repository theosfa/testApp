// // ~/server/customMiddleware.js
// import { join } from 'path';
// import { readFile, writeFile } from 'fs/promises';
// import lowdb from 'lowdb';
// import FileAsync from 'lowdb/adapters/FileAsync';

// const categoriesFilePath = join(process.cwd(), 'data', 'categories.json');
// const productsFilePath = join(process.cwd(), 'data', 'products.json');

// const initializeDatabase = async (filePath) => {
//   const adapter = new FileAsync(filePath);
//   const db = await lowdb(adapter);
//   await db.read();
//   return db;
// };

// export default async function (req, res, next) {
//   const categoriesDb = await initializeDatabase(categoriesFilePath);
//   const productsDb = await initializeDatabase(productsFilePath);

//   if (req.method === 'POST') {
//     if (req.url === '/api/addCategory') {
//       try {
//         const body = JSON.parse(req.body);
//         const newCategory = { name: body.name };
//         categoriesDb.get('categories').push(newCategory).write();
//         res.statusCode = 200;
//         return res.json(newCategory);
//       } catch (error) {
//         console.error('Error adding category:', error);
//         res.statusCode = 500;
//         return res.json({ error: 'Internal server error' });
//       }
//     } else if (req.url === '/api/addProduct') {
//       try {
//         const body = JSON.parse(req.body);
//         const newProduct = { ...body };
//         productsDb.get('products').push(newProduct).write();
//         res.statusCode = 200;
//         return res.json({ message: 'Product added successfully' });
//       } catch (error) {
//         console.error('Error adding product:', error);
//         res.statusCode = 500;
//         return res.json({ error: 'Internal server error' });
//       }
//     }
//   }

//   if (req.method === 'GET' && req.url === '/api/categories') {
//     const categories = categoriesDb.get('categories').value();
//     console.log(1);
//     res.statusCode = 200;
//     return res.json(categories);
//   }

//   if (req.method === 'GET' && req.url === '/api/products') {
//     const products = productsDb.get('products').value();
//     onsole.log(2);
//     res.statusCode = 200;
//     return res.json(products);
//   }

//   // If the request is not handled here, pass it to the next middleware
//   return next();
// }
