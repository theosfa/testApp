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
    body.id = products[products.length-1].id+1;
    // const categoryIdToFind = 2; // ID of the category to find

    // // Use Array.find() to find the category object with the specified ID
    // const foundCategory = categories.find(category => category.name === categoryIdToFind);

    // Add the new category to the categories array
    products.push(body);
    // Write the updated categories data back to the JSON file
    await writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');

    return {
      message: 'Product added successfully'
    };
  } catch (error) {
    console.error('Error adding product:', error);
    return {
      error: 'Internal server error'
    };
  }
})
