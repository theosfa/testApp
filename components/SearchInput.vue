<template>
    <div>
      <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" placeholder="Search products..." />
      <button @click="search">Search</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: String,
    },
    methods: {
      search() {
        // Emit the input event to update the searchQuery in the parent component
        this.$emit('update:modelValue', this.modelValue);
      },
    },
  };
  </script>
  