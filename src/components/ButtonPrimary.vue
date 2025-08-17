<script>
    export default {
        name: 'ButtonPrimary',
        props: {
            type: {
            type: String,
            default: 'button',
            },
    },
    }
    </script>
    
<template>
    <button :type="type" class="px-8 py-2 tracking-wide text-lg text-white duration-150 bg-purple-primary rounded-full hover:bg-purple-secondary active:bg-purple-dark"><slot /></button>
</template>