<template>
  <div>
    <header class="main ribs-container-fluid">
      <h1><nuxt-link to="/">Agri Gestion</nuxt-link></h1>
    </header>

    <nuxt />

    <footer class="main ribs-container-fluid">
      <nav>
        <ul class="row middle-xs">
          <li class="cxs"><nuxt-link class="row center-xs" to="/"><i class="fas fa-home fa-2x"></i></nuxt-link></li>
          <li class="cxs"><nuxt-link class="row center-xs" to="/add-cows"><i class="fas fa-plus fa-2x"></i></nuxt-link></li>
          <li class="cxs"><nuxt-link class="row center-xs" to="/add-haystack"><i class="fas fa-tractor fa-2x"></i></nuxt-link></li>
          <li class="cxs"><nuxt-link class="row center-xs" to="/parcel-list"><i class="fas fa-map-marked fa-2x"></i></nuxt-link></li>
        </ul>
      </nav>
    </footer>
  </div>
</template>
