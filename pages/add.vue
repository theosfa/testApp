<template>
    <div class="menu">
        <NuxtLink to="/" class="menu-button">Main page</NuxtLink>
        <NuxtLink to="/admin" class="menu-button">Admin panel</NuxtLink>
    </div>
    <div>
      <h1>Add Categories and Products</h1>
      <h2>Add Category</h2>
      <AddCategoryForm @category-added="handleAddCategory" />
      <h2>Add Product</h2>
      <AddProductForm :categories="categories" />
    </div>
  </template>
  
  <script>
  import { provide, inject } from 'vue';
  import AddCategoryForm from '~/components/AddCategoryForm.vue';
  import AddProductForm from '~/components/AddProductForm.vue';
  import axios from 'axios';
  import eventBus from '~/eventBus'; // Import the eventBus
  
  export default {
    components: {
      AddCategoryForm,
      AddProductForm,
    },
    setup() {
        const categories = ref([]);
        const fetchCategories = async () => {
            try {
            //   const response = await fetch('/api/categories');
            const response = await fetch('/api/categories', {
                method: 'GET',
            });
            if (response.ok) {
                const responseData = await response.json();
                categories.value = responseData.categories;
            }
            } catch (error) {
            console.error('Error fetching categories:', error);
            }
        };
        const handleAddCategory = async (category) => {
        try {
            const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: category }),
            });

            if (response.ok) {
            // Parse the response data as JSON
            const responseData = await response.json();
            console.log(responseData); // This will log the response data
            } else {
            console.error('Error adding category:', response.status);
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
        try {
            const response = await fetch('/api/categories', {
                method: 'GET',
            });
            if (response.ok) {
                const responseData = await response.json();
                categories.value = responseData.categories;
            }
            } catch (error) {
            console.error('Error fetching categories:', error);
            }
    };

    const addProduct = async (product) => {
        try {
            console.log(product);
            const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: product.name, 
                price: product.price,
                categoryId: product.categoryId,
            }),
            });

            if (response.ok) {
            // Parse the response data as JSON
            const responseData = await response.json();
            console.log(responseData); // This will log the response data
            } else {
            console.error('Error adding product:', response.status);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    onMounted(() => {
            fetchCategories();
        });
      provide('addProduct', addProduct);
      return {
        categories,
        handleAddCategory,
      };
    },
  };
  </script>

  <style>
.add{
        background-color:  rgb(61, 142, 24);
        color: white;
        border: 1px;
        border-color: #16161e;
        border-style: inherit;
        margin-right: 10px;
        cursor : pointer;
        border-radius: 5px;
        /* height: 30px; */
        padding: 5px;
        margin: 10px;
        transition: 0.5s;
    }

    .add:hover{
        background-color:  rgb(39, 99, 11);
        border-radius: 8px;
    }</style>
  