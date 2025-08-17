<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import ButtonPrimary from '../components/ButtonPrimary.vue';
import CustomRouterLinkSecondary from '../components/CustomRouterLinkSecondary.vue';
import CustomInput from '../components/CustomInput.vue';
import CustomLabel from '../components/CustomLabel.vue';
import { register } from '../services/auth';

export default {
    name: 'Register',
    components: { BaseHeading1, CustomInput, ButtonPrimary, CustomLabel, CustomRouterLinkSecondary },
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            loading: false,
            showAlert: false,
            showAlertDanger: false,
        }
    },
    methods: {
        async handleSubmit() {
            this.loading = true;

            try {
                await register({...this.user});

                console.log("Usuario registrado con éxito :D");

                this.showAlert = true;

                setTimeout(() => {
                    this.showAlert = false;
                    this.$router.push('/mi-perfil');
                }, 1500);
            } catch (error) {
                console.error("[Register.vue] Error al registrarse: ", error);
                this.showAlertDanger = true;

                setTimeout(() => {
                    this.showAlertDanger = false;
                }, 5000);
                this.loading = false;
                throw error;
            }

            
        }
    }
}
</script>

<template>
    <section class="max-w-screen-xl mx-auto px-4 py-12 gap-12 overflow-hidden md:px-8 md:flex">
        <article class='flex-none space-y-5 max-w-xl'>
            <BaseHeading1>Crear una <span class="text-orange-dark">cuenta</span></BaseHeading1>

            <form 
                action="#"
                @submit.prevent="handleSubmit"
            >
            <div class="mb-4">
                    <CustomLabel for="email">Correo electrónico</CustomLabel>
                        <CustomInput 
                            type="email" 
                            id="email" 
                            v-model="user.email"
                            :required="true"/>
                    </div>
                    <div class="mb-4">
                        <label 
                            for="password"
                            class="block mb-2"
                        >Contraseña</label>
                        <CustomInput 
                            type="password" 
                            id="password" 
                            v-model="user.password"
                            :required="true"/>
                    </div>

                    <div v-if="loading" class="flex items-center rounded-lg mb-3">
                    <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 rounded-full animate-pulse">Cargando...</div>
                    </div>



                <div v-if="showAlert" class="p-4 mb-4 text-sm rounded-lg bg-green-primary" role="alert">
                    <span class="font-medium">¡Purrfecto!</span> Te has registrado con éxito.
                </div>
                <div v-if="showAlertDanger" class="p-4 mb-4 text-sm rounded-lg bg-red-secondary" role="alert">
                    <span><strong>Hubo un error</strong>, intenta de nuevo por favor.</span>
                </div>

                <ButtonPrimary type="submit">Registrar</ButtonPrimary>

                <p class="mt-5">¿Ya tenés una cuenta? <CustomRouterLinkSecondary to="/iniciar-sesion">Ingresá acá</CustomRouterLinkSecondary></p>
            </form>
        </article>
        <aside class='flex-1 hidden md:block'>
            <img src="/img/register/perro-registro.png" class="max-w-xl" alt="Perro ilustración con un corazón encima.">
        </aside>
    </section>
    
</template>