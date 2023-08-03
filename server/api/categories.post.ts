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
    // const requestBody = JSON.parse(body);

    // Read the current categories data from the JSON file
    const categoriesData = await readFile(categoriesFilePath, 'utf-8');
    const categories = JSON.parse(categoriesData);
    body.id = categories[categories.length-1].id+1;
    console.log(body)
    // Add the new category to the categories array
    categories.push(body);
    // Write the updated categories data back to the JSON file
    await writeFile(categoriesFilePath, JSON.stringify(categories, null, 2), 'utf-8');

    return {
      message: 'Category added successfully'
    };
  } catch (error) {
    console.error('Error adding category:', error);
    return {
      error: 'Internal server error'
    };
  }
})
