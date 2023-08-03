<template>
  <NuxtPage />
</template>

<style>
body{
  margin:0px;
  padding: 0px;
}

.menu{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    background: #16161e;
    margin: 0px;
    height: 10vh;
    /* max-height: 10vh; */
    padding-top: 0px;
    padding-bottom: 0px;
}

.menu-button{
    /* display: block; */
    height: 100%;
    width: 10%;
    /* padding: 24px 12px; */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    /* background: rgb(61, 142, 24); */
    background: #16161e;
    text-decoration: none;
    border-radius: 5px;
    transition: 0.5s;
    color: white;
    margin-right: 15px;
    padding-left: 5px;
    padding-right: 5px;
    font-size: large;
}

.menu-button:hover{
    /* display: block; */
    padding-top: 15px;
    padding-bottom: 15px;
    /* background: rgb(46, 106, 18); */
    background: rgb(61, 142, 24);
    text-decoration: none;
    border-radius: 12px;
    transition: 0.5s;
    color: white;
}

input{
  height: 100%;
  margin: 20px;
}
</style>