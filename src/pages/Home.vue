<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import ButtonPrimary from '../components/ButtonPrimary.vue';
import ButtonSecondary from '../components/ButtonSecondary.vue';
import BaseFaq from '../components/BaseFaq.vue';

export default {
    name: 'Home',
    components: { BaseHeading1, ButtonPrimary, ButtonSecondary, BaseFaq }
}
</script>

<template>
    <section class="max-w-screen-xl mx-auto px-4 py-28 gap-12 overflow-hidden md:px-8 md:flex">
              <article class='flex-none space-y-5 max-w-xl'>
                  <h1 class="text-4xl font-extrabold sm:text-5xl text-pretty">
                      La red social <span class="text-purple-primary">para vos<br></span> y <span class="text-orange-dark">tu mascota</span>
                  </h1>
                  <p class="text-gray-dark">
                      Una de las redes sociales para mascotas <strong>número uno en Argentina</strong>, crea el perfil tuyo junto al de tu mascota, personaliza, postea sobre tu compañero e interactúa junto a otros amantes de las mascotas. 
                  </p>
                  <p class="text-gray-dark">
                    Si aún no tienes cuenta, puedes registrarte o si ya tienes una, <strong>¡ingresa a la red!</strong>
                  </p>
                  <div class='flex flex-wrap items-center gap-3 sm:text-sm'>
                      <router-link to="/registro" class="flex items-center justify-center gap-x-1 px-8 py-2 tracking-wide text-lg text-white duration-150 bg-purple-primary rounded-full hover:bg-purple-secondary active:bg-purple-dark">
                          Registrarse
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                      </router-link>
                      <router-link to="/iniciar-sesion" class="flex items-center justify-center gap-x-1 px-8 py-2 tracking-wide text-lg text-purple-primary duration-150 bg-white rounded-full hover:text-purple-dark hover:bg-purple-light/75 active:bg-purple-secondary active:text-white border border-purple-primary">
                          Iniciar sesión
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                      </router-link>
                  </div>
              </article>
              <aside class='flex-1 hidden md:block'>
                  <img src="/img/home/perro-home.png" class="max-w-xl" alt="Imagen de perro sacando la lengua, ilustración">
              </aside>
      </section>

    <BaseFaq class="mb-5" />

</template>