import { join } from 'path';
import { readFile } from 'fs/promises';

const productsFilePath = join(process.cwd(), 'server', 'data', 'products.json');

export default defineEventHandler( async (event) => {
  try {
    // Read the categories data from the JSON file
    const productsData = await readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData);
    console.log(products)
    return {
      products
    };
  } catch (error) {
    console.error('Error reading products data:', error);
    return {
      error: 'Internal server error'
    };
  }
})