<template>
  <div class="menu">
        <NuxtLink to="/add" class="menu-button">Adding page</NuxtLink>
        <NuxtLink to="/" class="menu-button">Main page</NuxtLink>
    </div>
    <div>
      <h2>Categories</h2>
      <table>
        <thead>
          <th>ID</th>
          <th>Catgories</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td v-if="editingCategory === 'false' || categoryEditing !== category.id"> {{ category.id }}</td>
            <td v-if="editingCategory === 'true' && categoryEditing === category.id"> {{ category.id }}</td>

            <td v-if="editingCategory === 'false' || categoryEditing !== category.id">{{ category.name }}</td>
            <td v-if="editingCategory === 'true' && categoryEditing === category.id"><input v-model="categoryName" type="text" :placeholder="category.name" /></td>
            <td>
              <button v-if="editingCategory === 'false' || categoryEditing !== category.id" @click="editCategory(category)">Edit</button>
              <button v-if="editingCategory === 'true' && categoryEditing === category.id" @click="updateCategory(category)">Submit</button>
              <button v-if="editingCategory === 'true' && categoryEditing === category.id" @click="cancelEditingCategory()">Cancel</button>
              <button class="delete" @click="deleteCategory(category.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Products</h2>
      <div>
        <SearchForm v-model="searchTerm" />
      </div>
      <br>
      <table>
        <thead>
          <tr>
            <th @click="sort('id')">
              ID
              <span v-if="sortKey !== 'id'"> ↑↓</span>
              <span v-if="sortKey === 'id'"> {{ sortOrder === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="sort('name')">
              Name
              <span v-if="sortKey !== 'name'"> ↑↓</span>
              <span v-if="sortKey === 'name'"> {{ sortOrder === 1 ? '↑' : '↓' }}</span>
            </th>
            <th @click="sort('categoryId')">
              Category ID
              <span v-if="sortKey !== 'categoryId'"> ↑↓</span>
              <span v-if="sortKey === 'categoryId'"> {{ sortOrder === 1 ? '↑' : '↓' }}</span>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in searchAndSortProducts" :key="product.id">
            <td v-if="editingProduct === 'false' || productEditing !== product.id">{{ product.id }}</td>
            <td v-if="editingProduct === 'true' && productEditing === product.id">{{ product.id }}</td>
            <td v-if="editingProduct === 'false' || productEditing !== product.id">{{ product.name }}</td>
            <td v-if="editingProduct === 'true' && productEditing === product.id"><input v-model="name" type="text" :placeholder="product.name" /></td>
            <td v-if="editingProduct === 'false' || productEditing !== product.id">{{ product.categoryId }}</td>
            <td v-if="editingProduct === 'true' && productEditing === product.id">{{ product.categoryId }}</td>
            <td v-if="editingProduct === 'false' || productEditing !== product.id">{{ getCategoryName(product.categoryId) }}</td>
            <td v-if="editingProduct === 'true' && productEditing === product.id">
                <select v-model="selectedCategory">
                    <option value="" disabled selected>{{ getCategoryName(product.categoryId) }}</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </td>
            <td v-if="editingProduct === 'false' || productEditing !== product.id">{{ product.price }} PLN </td>
            <td v-if="editingProduct === 'true' && productEditing === product.id"><input v-model="price" type="number" :placeholder="product.price" /> PLN</td>
            <td>
              <button v-if="editingProduct === 'false' || productEditing !== product.id" @click="editProduct(product)">Edit</button>
              <button v-if="editingProduct === 'true' && productEditing === product.id" @click="updateProduct(product)">Submit</button>
              <button v-if="editingProduct === 'true' && productEditing === product.id" @click="cancelEditingProduct()">Cancel</button>
              <button class="delete" @click="deleteProduct(product.id)">Delete</button>
            </td>
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
      const editingProduct = ref('false');
      const editingCategory = ref('false');
      const productEditing = ref(null);
      const categoryEditing = ref(null);
      const selectedCategory = ref('');
      const name = ref('');
      const categoryName = ref('');
      const price = ref('');
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

      const deleteProduct = async (id) => {
        try {
            // console.log(id);
            const response = await fetch('/api/products', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id: id,
            }),
            });

            if (response.ok) {
            // Parse the response data as JSON
            const responseData = await response.json();
            // console.log(responseData); // This will log the response data
            } else {
            console.error('Error deleting product:', response.status);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
        fetchProducts();
      };

      const deleteCategory = async (id) => {
        try {
            // console.log(id);
            const response = await fetch('/api/categories', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id: id,
            }),
            });

            if (response.ok) {
            // Parse the response data as JSON
            const responseData = await response.json();
            // console.log(responseData); // This will log the response data
            } else {
            console.error('Error deleting category:', response.status);
            }
        } catch (error) {
            console.error('Error deleting categoy:', error);
        }
        fetchProducts();
        fetchCategories();
      };

      const updateProduct = async (product) => {
        try {
            const response = await fetch('/api/products', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id: product.id,
                name: name.value,
                price: price.value,
                categoryId: selectedCategory.value,
            }),
            });

            if (response.ok) {
            // Parse the response data as JSON
            const responseData = await response.json();
            // console.log(responseData); // This will log the response data
            } else {
            console.error('Error adding product:', response.status);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
        editingProduct.value = 'false';
        productEditing.value = null;
        name.value = '';
        price.value = '';
        fetchProducts();
        fetchCategories();
      };

      const updateCategory = async (category) => {
        try {
            const response = await fetch('/api/categories', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id: category.id,
                name: categoryName.value,
            }),
            });

            if (response.ok) {
            // Parse the response data as JSON
            const responseData = await response.json();
            // console.log(responseData); // This will log the response data
            } else {
            console.error('Error adding product:', response.status);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
        editingCategory.value = 'false';
        categoryEditing.value = null;
        categoryName.value = '';
        fetchProducts();
        fetchCategories();
      };

      const getCategoryName = (categoryId) => {
        const category = categories.value.find((cat) => cat.id === categoryId);
        return category ? category.name : 'Unknown';
      };

      const filteredProducts = computed(() => {
        if (!props.searchQuery) return products.value;

        const searchWords = props.searchQuery.trim().toLowerCase().split(/\s+/);
        return products.value.filter((product) => {
          const productName = product.name.toLowerCase();
          return searchWords.every((word) => productName.includes(word));
        });
      });

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
      const similarProducts = computed(() => searchSimilarProducts());
      console.log(similarProducts)
      const sortedProducts = computed(() => {
        if (!sortKey.value) return filteredProducts.value;

        return filteredProducts.value.slice().sort((a, b) => {
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
      });

      const editProduct = (product) => {
        editingProduct.value = 'true';
        productEditing.value = product.id;
        name.value = product.name;
        price.value = product.price;
        selectedCategory.value = product.categoryId;
      }

      const cancelEditingProduct = () => {
        editingProduct.value = 'false';
        productEditing.value = null;
        name.value = '';
        price.value = '';
      }
    
      const editCategory = (category) => {
        editingCategory.value = 'true';
        categoryEditing.value = category.id;
        categoryName.value = category.name;
      }

      const cancelEditingCategory = () => {
        editingCategory.value = 'false';
        categoryEditing.value = null;
      }
  
      onMounted(() => {
        fetchCategories();
        fetchProducts();
      });
  
      return {
        categories,
        products,

        getCategoryName,
        deleteProduct,
        sort,
        editProduct,
        cancelEditingProduct,
        updateProduct,
        editCategory,
        updateCategory,
        deleteCategory,
        cancelEditingCategory,

        sortedProducts,
        sortKey,
        sortOrder,
        searchTerm,
        searchAndSortProducts,

        editingCategory,
        categoryEditing,

        editingProduct,
        productEditing,
        selectedCategory,
        name,
        categoryName,
        price,
        
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
  /* padding: 8px; */
  padding-left: 8px;
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
        background-color:  rgb(61, 142, 24);
        color: white;
        border: 1px;
        border-color: #16161e;
        border-style: inherit;
        margin-right: 10px;
        cursor : pointer;
        border-radius: 5px;
        height: 30px;
        margin-top: 0px;
        margin-bottom: 0px;
        width : 30%;
        transition: 0.5s;
    }

    button:hover{
        background-color:  rgb(39, 99, 11);
        border-radius: 8px;
    }

    .delete:hover{
      background-color:  rgb(150, 14, 14);
        border-radius: 8px;
    }
</style>