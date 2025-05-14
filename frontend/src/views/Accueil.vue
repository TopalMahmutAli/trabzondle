<template>
    <div class="accueil">
      <h1>Bienvenue sur Trabzondle ⚽</h1>
      <p>Choisissez un mode de jeu :</p>
  
      <ul>
        <li><a href="#">🎯 Mode Classique</a></li>
        <li><a href="#">🏆 Mode Palmarès</a></li>
        <li><a href="#">🔍 Mode Club</a></li>
        <li><a href="#">🖼️ Photo Mode</a></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Accueil'
  }
  </script>
  
  <style scoped>
  .accueil {
    max-width: 600px;
    margin: auto;
    text-align: center;
    padding-top: 2rem;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 1rem 0;
  }
  a {
    text-decoration: none;
    color: #0077cc;
    font-weight: bold;
  }
  </style>
  