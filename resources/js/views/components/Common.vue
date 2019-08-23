<template>
    <div></div>
</template>
<script>
//    import { get } from '../helpers/api'
    export default {
        data() {
            return {
                data: []
            }
        },
        methods: {

            // common

            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('-', '');
            },

            declOfNum(number,titles) {
                let cases = [2, 0, 1, 1, 1, 2];
                return titles[(number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5]];
            },

        }
    }
</script>