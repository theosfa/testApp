<!-- ~/components/AddProductForm.vue -->
<template>
    <div>
        <input v-model="name" type="text" placeholder="Name" />
        <input v-model="price" type="number" placeholder="Price" />
        <select v-model="selectedCategory">
            <option value="" disabled selected>Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
            </option>
        </select>
        <button class="add" @click="handleAddProduct">Add Product</button>
    </div>
  </template>
  
  <script>
  import { ref, inject } from 'vue';
  
  export default {
    props: {
      categories: Array,
    },
    setup() {
        const name = ref('');
        const price = ref('');
        const addProduct = inject('addProduct'); // Inject the addCategory function
        // const categories = inject('categories')
        // const categories = ref([]);
        const selectedCategory = ref('');
      
  
        // const fetchCategories = async () => {
        //     try {
        //     //   const response = await fetch('/api/categories');
        //     const response = await fetch('/api/categories', {
        //         method: 'GET',
        //     });
        //     if (response.ok) {
        //         const responseData = await response.json();
        //         categories.value = responseData.categories;
        //     }
        //     } catch (error) {
        //     console.error('Error fetching categories:', error);
        //     }
        // };
        const handleAddProduct = () => {
            console.log(selectedCategory.value)
            if (name.value.trim() && price.value && price.value > 0 && selectedCategory.value) {
                addProduct({ name: name.value.trim(), price: Number(price.value), categoryId: Number(selectedCategory.value) });
                name.value = '';
                price.value = '';
                selectedCategory.value = '';
            }
        };
        // onMounted(() => {
        //     fetchCategories();
        // });

        return {
            name,
            price,
            // categories,
            selectedCategory,
            handleAddProduct,
        };
    },
  };
  </script>
  