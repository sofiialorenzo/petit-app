<script>
export default {
  props: {
    loggedUser: {
      type: Object,
      required: true,
      default: () => ({ id: null, email: '' }),
    },
  },
  data() {
    return {
      showNav: false,
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
    handleLogout() {
      this.$emit('logout');
    },
    isCurrentRoute(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<template>
  <nav class="flex justify-between items-center p-4 px-6 w-full bg-white filter drop-shadow-lg">
    <router-link to="/" class="text-xl font-bold text-purple-primary">Petit</router-link>

    <ul class="gap-2 items-center hidden md:flex">
      <li>
        <router-link
          to="/"
          class="transition-all block p-3 text-lg hover:text-purple-primary"
          v-bind:aria-current="isCurrentRoute('/') ? 'page' : undefined"
        >
          Home
        </router-link>
      </li>

      <li>
        <router-link
          to="/nosotros"
          class="transition-all block p-3 text-lg hover:text-purple-primary"
          v-bind:aria-current="isCurrentRoute('/nosotros') ? 'page' : undefined"
        >
          Nosotros
        </router-link>
      </li>

      <li>
        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="text-lg text-black flex items-center justify-between w-full transition-all p-3 hover:text-purple-primary">
          Perfil 
          <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow max-w-55 py-2">
            <ul class="text-sm text-gray-700 divide-y divide-gray-100" aria-labelledby="dropdownNavbarLink" v-if="!loggedUser.id">
                <li>
                    <p class="text-xs block text-gray-dark items-center justify-between w-full transition-all px-3 hover:text-purple-primary pt-3">Regístrate y mejora aún más tu experiencia.</p>
                    <router-link to="/registro" class="block text-black items-center justify-between w-full transition-all px-3 hover:text-purple-primary pt-2 pb-3">Registrarse</router-link>
                </li>
                <li>
                    <p class="text-xs block text-gray-dark items-center justify-between w-full transition-all px-3 hover:text-purple-primary pt-3">¿Ya eres usuario? Ingresa a tu cuenta.</p>
                    <router-link to="/iniciar-sesion" class="block text-black items-center justify-between w-full transition-all px-3 hover:text-purple-primary pt-2 pb-3">Iniciar sesión</router-link>
                </li>
            </ul>
            <ul class="text-sm text-gray-700" aria-labelledby="dropdownNavbarLink" v-if="loggedUser.id">
                <li>
                    <p class="text-xs block text-gray-dark items-center justify-between w-full transition-all px-3 hover:text-purple-primary pt-3">Hola, <strong>{{ loggedUser.email }}</strong></p>
                    <router-link to="/mi-perfil" class="block text-black items-center justify-between w-full transition-all px-3 hover:text-purple-primary pt-2 pb-3">Tu perfil</router-link>
                </li>
                <li>
                    <router-link to="/feed" class="block text-black items-center justify-between w-full transition-all px-3 hover:text-purple-primary pt-2 py-3">Feed</router-link>
                </li>
            </ul>
            <div class="py-1" v-if="loggedUser.id">
                <button @click="handleLogout" class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Cerrar sesión
                </button>
            </div>
        </div>
      </li>
    </ul>

    <button class="md:hidden" @click="toggleNav"><span class="sr-only">Abrir nav</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>

    <ul v-if="showNav" class="flex flex-col items-center gap-2 absolute top-16 left-0 w-full bg-purple-primary md:hidden py-3">
      <li class="w-full">
        <router-link
          to="/"
          class="block p-3 py-5 text-center rounded-full hover:bg-purple-secondary text-white text-lg"
          v-bind:aria-current="isCurrentRoute('/') ? 'page' : undefined"
        >
          Home
        </router-link>
      </li>

      <li class="w-full">
        <router-link
          to="/nosotros"
          class="block p-3 py-5 text-center rounded-full hover:bg-purple-secondary text-white text-lg"
          v-bind:aria-current="isCurrentRoute('/nosotros') ? 'page' : undefined"
        >
          Nosotros
        </router-link>
      </li>

        <li class="w-full" v-if="!loggedUser.id">
            <p class="text-xs text-center block text-white w-full transition-all px-3 pt-3 ">Regístrate y mejora aún más tu experiencia.</p>
            <router-link to="/registro" class="block p-3 text-center rounded-full hover:bg-purple-secondary text-white text-lg">Registrarse</router-link>
        </li>
        <li class="w-full" v-if="!loggedUser.id">
            <p class="text-xs text-center block text-white w-full transition-all px-3 pt-3">¿Ya eres usuario? Ingresa a tu cuenta.</p>
            <router-link to="/iniciar-sesion" class="block p-3 text-center rounded-full hover:bg-purple-secondary text-white text-lg">Iniciar sesión</router-link>
        </li>


      <li class="w-full" v-if="loggedUser.id">
            <p class="text-xs text-center block text-white w-full transition-all px-3 pt-3 tracking-wide">Hola, <strong class="text-semibold tracking-wider">{{loggedUser.email}}</strong></p>
            <router-link to="/mi-perfil" class="block p-3 text-center rounded-full hover:bg-purple-secondary text-white text-lg">Tu perfil</router-link>
        </li>
    <li class="w-full" v-if="loggedUser.id">
        <router-link to="/feed" class="block p-3 text-center rounded-full hover:bg-purple-secondary text-white text-lg">Feed</router-link>
    </li>

      <li class="w-full flex justify-center" v-if="loggedUser.id">
        <div class="py-1">
            <button @click="handleLogout" class="block p-3 rounded-full hover:bg-purple-secondary text-white text-lg">
                Cerrar sesión
            </button>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

    nav ul li a[aria-current="page"] {
        color: #5258EC;
        background-color: white;
    }
</style>