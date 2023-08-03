<template>
    <div>
      <input v-model="category" type="text" placeholder="Category" />
      <button class="add" @click="handleAddCategory">Add Category</button>
    </div>
  </template>
  
  <script>
  import { ref, getCurrentInstance } from 'vue';
  
  export default {
    setup() {
      const category = ref('');
      const instance = getCurrentInstance();
  
      const handleAddCategory = () => {
        if (category.value.trim()) {
          instance.emit('category-added', category.value.trim());
          category.value = '';
        }
      };
      return {
        category,
        handleAddCategory,
      };
    },
  };
  </script>
  
  