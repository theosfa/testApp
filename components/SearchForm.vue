<template>
    <div class="input-wrapper">
      <input type="text" v-model="searchTerm" placeholder="Search"/>
      <button class="clear-button" @click="clearInput">X</button>
    </div>
  </template>
  
  <script>
  import { ref, watch, computed } from 'vue';
  
  export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const searchTerm = ref(props.modelValue);
  
      const clearInput = () => {
        searchTerm.value = '';
      };
  
      // Watch the searchTerm and update the parent modelValue when it changes
      watch(
        () => searchTerm.value,
        (newValue) => {
          emit('update:modelValue', newValue);
        }
      );
  
      // Create a computed property to keep searchTerm in sync with the v-model
      const modelValue = computed({
        get: () => searchTerm.value,
        set: (newValue) => {
          searchTerm.value = newValue;
        },
      });
  
      return {
        searchTerm,
        clearInput,
        modelValue,
      };
    },
  };
  </script>
  <style>
    
    .input-wrapper {
        position: relative;
        display: inline-block;
    }

    .input-wrapper input {
        padding-right: 30px; /* Add some padding to the right to make space for the button */
    }

    .input-wrapper .clear-button {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        color: #555;
        outline: none;
    }
</style>