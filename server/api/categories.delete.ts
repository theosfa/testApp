// ~/server/api/categories.post.ts
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

const categoriesFilePath = join(process.cwd(), 'server', 'data', 'categories.json');

export default defineEventHandler( async (event) => {
  try {
    // if (!event.body) {
    //     throw new Error('Request body is empty');
    //   }
    const body = await readBody(event)
    console.log(body)
    // const requestBody = JSON.parse(body);
    
    // Read the current products data from the JSON file
    const categoriesData = await readFile(categoriesFilePath, 'utf-8');
    const categories = JSON.parse(categoriesData);

    const categoryIndex = categories.findIndex((category) => category.id === body.id);
    categories.splice(categoryIndex, 1);

    // Write the updated categories data back to the JSON file
    await writeFile(categoriesFilePath, JSON.stringify(categories, null, 2), 'utf-8');

    return {
      message: 'Category deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      error: 'Internal server error'
    };
  }
})
