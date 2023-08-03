<!-- ~/components/ProductList.vue -->
<template>
    <div>
      <table>
        <thead>
          <tr>
            <th class="table-name" @click="sort('name')">Name</th>
            <th class="table-name" @click="sort('category')">Category</th>
            <th class="table-name" @click="sort('price')">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in sortedProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ getCategoryName(product.categoryId) }}</td>
            <td>{{ product.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, computed, getCurrentInstance } from 'vue';
//   import { products, categories } from '~/data/products';
  
  export default {
    props: {
      searchQuery: String, // Receive search query as a prop
    },
    setup(props) {
        const instance = getCurrentInstance();
      const getCategoryName = categoryId => {
        const category = instance.categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown';
      };
  
      const filteredProducts = computed(() => {
        if (!props.searchQuery) return instance.products;
  
        const searchWords = props.searchQuery.trim().toLowerCase().split(/\s+/);
        return instance.products.filter(product => {
          const productName = product.name.toLowerCase();
          return searchWords.every(word => productName.includes(word));
        });
      });
  
      const sortKey = ref(null);
      const sortDirection = ref(1);
  
      const sort = key => {
        if (sortKey.value === key) {
          sortDirection.value *= -1;
        } else {
          sortKey.value = key;
          sortDirection.value = 1;
        }
      };
  
      const sortedProducts = computed(() => {
        if (!sortKey.value) return filteredProducts.value;
        return filteredProducts.value.slice().sort((a, b) => {
          const fieldA = a[sortKey.value];
          const fieldB = b[sortKey.value];
          return (fieldA < fieldB ? -1 : 1) * sortDirection.value;
        });
      });
  
      return {
        getCategoryName,
        sort,
        sortedProducts,
      };
    },
  };
  </script>
  
  <style>
    .table-name{
        cursor:pointer;
    }
</style>