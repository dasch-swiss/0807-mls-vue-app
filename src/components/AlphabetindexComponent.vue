<template>
    <div>
        <v-btn-toggle v-model="toggle_exclusive">
        <v-btn fab small v-for="c in alphabet" v-on:click="char_selected(c)" v-bind:key="c">{{ c }}</v-btn>
        </v-btn-toggle>
    </div>
</template>

<script>
    export default {
        name: "alphabetindex",
        data: function() {
            return {
                alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','M',
                    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            }
        },
        props: {
            startchar: String,
            getData: Function
        },
        methods: {
            char_selected: function(c) {
                this.getData(c);
                this.$emit('char_selected', c)
            }
        }
    }
</script>

<style scoped>

</style>