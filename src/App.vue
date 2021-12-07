<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Corinthia&family=Meow+Script&family=Roboto:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Corinthia&family=Meow+Script&family=Poiret+One&family=Roboto:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Corinthia&family=Meow+Script&family=Roboto:ital,wght@0,100;1,900&display=swap');

#app {
  font-family: 'Poiret One', cursive;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #6aa84f;
}

</style>
