<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import CustomInput from '../components/CustomInput.vue';
import CustomLabel from '../components/CustomLabel.vue';
import CustomTextarea from '../components/CustomTextarea.vue';
import ButtonPrimary from '../components/ButtonPrimary.vue';
import { editMyProfile, subscribeToAuthState } from '../services/auth';

let unsubscribeAuth = () => {};

export default {
    name: 'MyProfileEdit',
    components: { BaseHeading1, CustomInput, CustomLabel, CustomTextarea, ButtonPrimary },
    data() {
        return {
            editData: {
                displayName: '',
                bio: '',
                location: '',
                petName: '',
                petSpecies: '',
                petAge: '',
                petDescription: '',
                petInterests: '',
                petIcon: '',
            },
            availableIcons: ['fa-dog', 'fa-cat', 'fa-fish', 'fa-crow','fa-paw'],
            editing: false,
            showAlert: false,
        };
    },
    methods: {
        async handleSubmit() {
            this.editing = true;

            try {
                await editMyProfile({...this.editData});

                this.showAlert = true;
                setTimeout(() => {

                this.showAlert = false;
                this.$router.push('/mi-perfil');

                }, 1500); 

            } catch (error) {
                console.error("No se pudo actualizar el perfil", error);
            }

            this.editing = false;
        },
        selectIcon(icon) {
            this.editData.petIcon = icon;
        }
    },
    mounted() {
        unsubscribeAuth = subscribeToAuthState(userData => this.editData = { 
            displayName: userData.displayName || '',
            bio: userData.bio || '',
            location: userData.location || '',
            petName: userData.petName || '',
            petSpecies: userData.petSpecies || '',
            petAge: userData.petAge || '',
            petDescription: userData.petDescription || '',
            petInterests: userData.petInterests || '',
            petIcon: userData.petIcon || '',
        });
    },
    unmounted() {
        unsubscribeAuth();
    }
}
</script>

<template>
    <section class="max-w-screen-xl mx-auto px-4 py-12 gap-12 overflow-hidden md:px-8">
        <BaseHeading1>Editar mi perfil</BaseHeading1>

        <form 
            action="#"
            @submit.prevent="handleSubmit"
            class="space-y-6"
        >

            <div>
                <CustomLabel for="bio">Biografía</CustomLabel>
                <CustomTextarea
                    id="bio"
                    v-model="editData.bio"
                    class="resize-none"
                ></CustomTextarea>
            </div>
            <div>
                <CustomLabel for="displayName">Nombre de usuario</CustomLabel>
                <CustomInput
                    type="text"
                    id="displayName"
                    v-model="editData.displayName"
                    class="w-full"
                ></CustomInput>
            </div>
            <div>
                <CustomLabel for="location">Ubicación</CustomLabel>
                <CustomInput 
                    type="text" 
                    id="location" 
                    v-model="editData.location" 
                    class="w-full"
                ></CustomInput>
            </div>
            <div>
                <CustomLabel for="petName">Nombre de tu mascota</CustomLabel>
                <CustomInput 
                    type="text" 
                    id="petName" 
                    v-model="editData.petName" 
                    class="w-full"
                ></CustomInput>
            </div>
            <div>
                <CustomLabel for="petSpecies">Especie de tu mascota</CustomLabel>
                <CustomInput 
                    type="text" 
                    id="petSpecies" 
                    v-model="editData.petSpecies" 
                    class="w-full"
                ></CustomInput>
            </div>
            <div>
                <CustomLabel for="petAge">Edad de tu mascota</CustomLabel>
                <CustomInput 
                    type="text" 
                    id="petAge" 
                    v-model="editData.petAge" 
                    class="w-full"
                ></CustomInput>
            </div>
            <div>
                <CustomLabel for="petDescription">Descripción física de tu mascota</CustomLabel>
                <CustomTextarea
                    id="petDescription"
                    v-model="editData.petDescription"
                    class="resize-none"
                ></CustomTextarea>
            </div>
            <div>
                <CustomLabel for="petInterests">Intereses de tu mascota</CustomLabel>
                <CustomTextarea
                    id="petInterests"
                    v-model="editData.petInterests"
                    class="resize-none"
                ></CustomTextarea>
            </div>

                        <div>
                <p>Selecciona un ícono para tu mascota</p>
                <div class="flex flex-wrap justify-start space-x-2 mt-4">
                    <button 
                        v-for="icon in availableIcons" 
                        :key="icon" 
                        type="button"
                        @click="selectIcon(icon)"
                        :class="{'bg-purple-light text-purple-dark': editData.petIcon === icon}" 
                        class="p-2 rounded-full"
                    ><span class="sr-only">Botón de animal</span>
                        <i :class="['fa', icon, 'text-2xl']"></i>
                    </button>
                </div>
            </div>

            <div v-if="showAlert" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                <span class="font-medium">¡Purrfecto!</span> Tu perfil ha sido actualizado con éxito.
            </div>

            <ButtonPrimary type="submit">Actualizar mi perfil</ButtonPrimary>
        </form>
    </section>
</template>
