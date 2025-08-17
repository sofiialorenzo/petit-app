<script>
import CustomRouterLink from '../components/CustomRouterLink.vue';

export default {
    name: 'CardPost',
    components: { CustomRouterLink },
    props: {
        post: {
            type: Object,
            required: true
        },
        getDateAndTime: {
            type: Function,
            required: true
        }
    }
}
</script>

<template>
    <article class="max-w-xs w-full bg-purple-light rounded-3xl shadow mb-6 flex flex-col">
        
        <img 
            v-if="post.picture !== ''" 
            :src="post.picture" 
            :alt="post.content" 
            class="rounded-t-3xl"
        >
        <img 
            v-else 
            src="https://placehold.co/400" 
            alt="No hay una imagen disponible"
            class="rounded-t-3xl"
        >

        <div class="p-5 flex-1">
            <div>
                <div class="flex flex-wrap items-center gap-2"> 
                    <span class="font-bold tracking-wider">{{ post.email }}</span> 

                    <span v-if="post.petName" class="flex items-center font-medium gap-1 ">
                        
                        <i class="fa-solid fa-paw" title="Icon Mascota"></i> 
                        {{ post.petName }}
                    </span>
                </div>

                    <p class="mb-3 mt-1 text-base font-normal tracking-wide">{{ post.content }}</p>
            
            </div>
        
            <slot name="action"></slot>

            <p class="mt-3 text-sm font-light">{{ getDateAndTime(post.created_at) }}</p>
            
        </div>
    </article>

</template>