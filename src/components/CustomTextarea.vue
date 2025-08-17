<script>
    export default {
        name: 'CustomTextarea',
        props: {
            modelValue: {
                type: String,
                default: '',
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
    <textarea 
    :value="modelValue"
    :required="required"
    @input="updateValue"
    class="outline-none bg-white border border-purple-light text-sm rounded-full focus:ring-2 focus:ring-purple-secondary block w-full p-2.5 px-4"></textarea>
</template>