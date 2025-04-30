<template>
    <div class="container">
      <h1>📋 Listado de Posts</h1>
      <ul class="post-list">
        <li class="post-item" v-for="post in posts" :key="post.id">
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-body">{{ post.body }}</p>
        </li>   
      </ul>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted } from 'vue';
  import PostService from '@/services/PostService';
  
  const service = new PostService();
  const posts = service.getPosts();
  
  onMounted(async () => {
    await service.fetchAll();
  });
  </script>
  
  <style scoped>


  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .post-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .post-item {
    background-color: #ffffff;
    margin-bottom: 1rem;
    padding: 1.25rem;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .post-item:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  .post-title {
    font-size: 1.5rem;
    margin: 0 0 0.5rem;
    color: #222;
  }
  
  .post-body {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
  </style>
  