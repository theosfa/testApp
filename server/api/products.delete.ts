// ~/server/api/categories.post.ts
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

const productsFilePath = join(process.cwd(), 'server', 'data', 'products.json');

export default defineEventHandler( async (event) => {
  try {
    // if (!event.body) {
    //     throw new Error('Request body is empty');
    //   }
    const body = await readBody(event)
    console.log(body)
    // const requestBody = JSON.parse(body);
    
    // Read the current products data from the JSON file
    const productsData = await readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData);

    const productIndex = products.findIndex((product) => product.id === body.id);
    products.splice(productIndex, 1);

    // Write the updated categories data back to the JSON file
    await writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');

    return {
      message: 'Product deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      error: 'Internal server error'
    };
  }
})
