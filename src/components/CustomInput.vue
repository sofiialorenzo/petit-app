<script>
    export default {
        name: 'CustomInput',
        props: {
            type: {
                type: String,
                default: 'text',
            },
            modelValue: {
                type: String,
                default: 'text',
            },
            required: {
                type: Boolean,
                default: false
            }
    },
        methods: {
            updateValue(e) {
                this.$emit('update:modelValue', e.target.value);
            }
        }
    }
    </script>
    
<template>
    <input 
    :type="type" 
    :value="modelValue"
    :required="required"
    @input="updateValue"
    class="outline-none bg-white border border-purple-light text-sm rounded-full focus:ring-2 focus:ring-purple-secondary block w-full p-2.5 px-4">
</template>