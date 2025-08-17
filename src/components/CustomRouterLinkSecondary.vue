<script>
    export default {
        name: 'CustomRouterLinkSecondary',
          props: {
             to: {
                type: String,
                required: true
            },
        },
    }
    </script>
    
<template>
    <router-link :to="to" class="tracking-wide text-md text-indigo-800 rounded-full"><slot /></router-link>
</template>