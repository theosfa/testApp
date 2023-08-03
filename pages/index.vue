<template>
    <div class="menu">
        <NuxtLink to="/add" class="menu-button">Adding page</NuxtLink>
        <NuxtLink to="/admin" class="menu-button">Admin panel</NuxtLink>
    </div>
    <div>
      <h2>Categories</h2>
      <table class="categories">
      <thead>
          <tr>
            <th>
              Category
            </th>
        </tr>
    </thead>
    <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
          </tr>
        </tbody>
    </table>
      <h2>Products</h2>
      <SearchForm v-model="searchTerm" />
      <table>
        <thead>
          <tr>
            <th @click="sort('name')">
              Name
              <span v-if="sortKey !== 'name'"> ↑↓</span>
              <span v-if="sortKey === 'name'"> {{ sortOrder === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="sort('category')">
              Category
              <span v-if="sortKey !== 'category'"> ↑↓</span>
              <span v-if="sortKey === 'category'"> {{ sortOrder === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="sort('price')">
              Price
              <span v-if="sortKey !== 'price'"> ↑↓</span>
              <span v-if="sortKey === 'price'"> {{ sortOrder === 1 ? '↑' : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="product in searchAndSortProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ getCategoryName(product.categoryId) }}</td>
            <td>{{ product.price }} PLN </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import SearchForm from '~/components/SearchForm.vue';
  import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
  export default {
    props: {
      searchQuery: String, // Receive search query as a prop
    },
    setup(props) {
        const categories = ref([]);
        const products = ref([]);
        const sortKey = ref(null);
        const sortOrder = ref(1);
        const searchTerm = ref('');
  
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories", {
                    method: "GET",
                });
                if (response.ok) {
                    const responseData = await response.json();
                    categories.value = responseData.categories;
                    // console.log(categories.value);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
  
        const fetchProducts = async () => {
            try {
            const response = await fetch("/api/products");
            if (response.ok) {
                const responseData = await response.json();
                products.value = responseData.products;
                // console.log(products.value)
            }
            //   console.log(products.value);
            } catch (error) {
            console.error("Error fetching products:", error);
            }
        };

        const getCategoryName = (categoryId) => {
            const category = categories.value.find((cat) => cat.id === categoryId);
            return category ? category.name : 'Unknown';
        };

        const sort = (key) => {
            if (sortKey.value === key) {
                sortOrder.value = sortOrder.value === 1 ? -1 : 1;
            } else {
                sortKey.value = key;
                sortOrder.value = 1;
            }
        };

    

        const searchAndSortProducts = computed(() => {
            const searchWords = searchTerm.value.trim().toLowerCase().split(/\s+/);

            let filteredProducts = products.value;
            if (searchWords.length > 0) {
                filteredProducts = filteredProducts.filter((product) => {
                    const productName = product.name.toLowerCase();
                    return searchWords.every((word) => productName.includes(word));
                });
            }

            if (sortKey.value) {
            return filteredProducts.slice().sort((a, b) => {
                const aValue = a[sortKey.value];
                const bValue = b[sortKey.value];

                if (sortKey.value === 'category') {
                const aCategoryName = getCategoryName(a.categoryId).toLowerCase();
                const bCategoryName = getCategoryName(b.categoryId).toLowerCase();
                return sortOrder.value === 1 ? aCategoryName.localeCompare(bCategoryName) : bCategoryName.localeCompare(aCategoryName);
                }

                if (sortOrder.value === 1) {
                return aValue > bValue ? 1 : -1;
                } else {
                return aValue < bValue ? 1 : -1;
                }
            });
            }

            return filteredProducts;
        });
  
        onMounted(() => {
            fetchCategories();
            fetchProducts();
        });
  
        return {
            categories,
            products,
            getCategoryName,
            sort,
            sortKey,
            sortOrder,
            searchTerm,
            searchAndSortProducts,
        };
    },
    components: { SearchForm },
  };
  </script>
  <style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #ccc;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  cursor: pointer;
}

input[type="text"],
input[type="number"] {
  margin-right: 8px;
}

.fa {
  padding-left: 5px;
}
button{
    width : 30%;
}
.categories{
    width: 30%;
}
</style>