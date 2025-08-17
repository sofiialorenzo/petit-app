<script>
    export default {
        name: 'ButtonSecondary',
          props: {
            type: {
            type: String,
            default: 'button',
            },
        },
    }
    </script>
    
<template>
    <button :type="type" class="px-8 py-2 tracking-wide text-lg text-purple-primary duration-150 bg-white rounded-full hover:text-purple-dark hover:bg-purple-light/75 active:bg-purple-secondary active:text-white border border-purple-primary"><slot /></button>
</template>