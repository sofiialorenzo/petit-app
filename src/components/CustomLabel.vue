<script>
    export default {
        name: 'CustomLabel',
        props: {
            htmlFor: {
                type: String,
                default: '',
            }
        }
    }
    </script>
    
<template>
    <label 
    :for="htmlFor"
    class="block mb-2"><slot /></label>
</template>