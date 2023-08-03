import { join } from 'path';
import { readFile } from 'fs/promises';

const categoriesFilePath = join(process.cwd(), 'server', 'data', 'categories.json');

export default defineEventHandler( async (event) => {
  try {
    // Read the categories data from the JSON file
    const categoriesData = await readFile(categoriesFilePath, 'utf-8');
    const categories = JSON.parse(categoriesData);
    console.log(categories)
    return {
      categories
    };
  } catch (error) {
    console.error('Error reading categories data:', error);
    return {
      error: 'Internal server error'
    };
  }
})