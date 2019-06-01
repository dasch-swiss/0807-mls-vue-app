<template>
<div>
    Pages:
    <button v-for="n in npages" v-bind:key="n" v-on:click="doSelect(ch, n)">{{ n }}</button>
    <div>{{ nitems }}</div>
</div>
</template>

<script>
export default {
    data: function() {
        return {
            active_page: 1,
            npages: 1,
            key: 0
        }
    },
    props: {
        nitems: Number,
        pagesize: Number,
        ch: String,
        select_page: Function
    },
    beforeUpdate () {
        this.npages = Math.ceil(this.nitems / this.pagesize);
        this.key++;
    },
    methods: {
        doSelect: function(ch, n) {
            this.select_page(ch, n - 1);
        }
    }
}
</script>
