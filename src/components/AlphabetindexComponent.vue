<template>
    <v-card-actions>
        <v-btn-toggle v-model="toggle_exclusive">
            <v-btn small v-for="c in alphabet" v-on:click="char_selected(c)" v-bind:key="c">{{ c }}</v-btn>
        </v-btn-toggle>
    </v-card-actions>
</template>

<script>
    export default {
        name: "alphabetindex",
        data: function() {
            return {
                alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','M',
                    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                toggle_exclusive: 0,
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