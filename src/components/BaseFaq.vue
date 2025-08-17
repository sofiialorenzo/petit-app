<script>
import BaseHeading2 from '../components/BaseHeading2.vue';

export default {
    name: 'BaseFaq',
    components: {BaseHeading2},
    data() {
        return {
        selectedFaq: null,
        faqs: [
        {
                    q: "¿Qué es Petit?",
                    a: "Petit es una red social dedicada a los amantes de las mascotas en Argentina. Aquí puedes crear perfiles tanto para ti como para tu mascota, personalizarlos, compartir fotos y experiencias, y conectar con otros amantes de los animales."
                },
                {
                    q: "¿Cómo creo un perfil en Petit?",
                    a: "Para crear un perfil, necesitas ir a registro, completarlo solo con tu correo eléctronico y una nueva contraseña, y luego podrás añadir los datos de tu mascota. Es muy fácil y rápido."
                },
                {
                    q: "¿Puedo personalizar el perfil de mi mascota?",
                    a: "¡Sí! Puedes personalizar el perfil de tu mascota con fotos, una breve descripción y detalles como su especie, edad y gustos. Cuanto más personalices, más fácil será para otros usuarios conectar con ustedes."
                },
                {
                    q: "¿Cómo puedo interactuar con otros usuarios?",
                    a: "Puedes interactuar con otros amantes de las mascotas comentando en sus publicaciones, enviando mensajes directos (en proceso de construcción), y compartiendo tus propias experiencias. La comunidad es muy activa y amigable."
                },
                {
                    q: "¿Es gratis usar Petit?",
                    a: "Sí, la aplicación es completamente gratuita. Sin embargo, puede haber algunas funciones premium que ofrezcan contenido adicional o beneficios exclusivos, aún están en desarrollo."
                },
                {
                    q: "¿Dónde puedo obtener ayuda si tengo problemas con la app?",
                    a: "Si tienes algún problema, puedes contactarnos a través de la sección de soporte dentro de la app, o enviarnos un correo a nuestro equipo de atención al cliente."
                }

        ],
        };
    },
    methods: {
        toggleFaq(index) {
        this.selectedFaq = this.selectedFaq === index ? null : index;
        },
    },
};
</script>

<template>
      <section class="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
        <div class="space-y-3 text-center">
          <BaseHeading2>Preguntas <span class="text-orange-dark">más</span> frecuentes</BaseHeading2>
          <p class="text-gray-dark max-w-lg mx-auto text-lg">
            ¿Tienes una duda en específico? Puedes 
            <router-link 
            to="/nosotros#SeccionEquipo"
            class="hover:underline">contactarnos</router-link>.
          </p>
        </div>
        <div class="mt-14 max-w-2xl mx-auto">
          <div
            v-for="(item, index) in faqs"
            :key="index"
            class="space-y-3 mt-5 overflow-hidden border-b"
            @click="toggleFaq(index)"
          >
            <h3 class="cursor-pointer pb-5 flex items-center justify-between text-lg font-medium">
              {{ item.q }}
              <svg
                v-if="selectedFaq === index"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-orange-primary ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-purple-primary ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </h3>
            <div
              v-show="selectedFaq === index"
              class="transition-[max-height,opacity] overflow-hidden duration-500 ease-in-out"
              :style="{ maxHeight: selectedFaq === index ? '1000px' : '0px' }"
            >
              <div>
                <p class="text-gray-dark pb-4">{{ item.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>
  