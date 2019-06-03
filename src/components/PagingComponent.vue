<template>
<div>
    Seiten:
    <button v-for="n in npages" v-bind:key="n" v-on:click="doSelect(character, n)">{{ n }}</button>
</div>
</template>

<script>
export default {
    name: 'paging',
    data: function() {
        return {
            key: 0
        }
    },
    props: {
        nitems: Number,
        pagesize: Number,
        character: String,
        select_page: Function
    },
    computed: {
        npages: function() {
            return Math.ceil(this.nitems / this.pagesize);
        }
    },
    methods: {
        doSelect: function(character, n) {
            this.select_page(character, n - 1);
            this.$emit('page_selected', n - 1);
        }
    }
}
</script>
