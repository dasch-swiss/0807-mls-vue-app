<template>
    <table>
        <tr><th v-on:click="sortit('longname')">Longname</th><th v-on:click="sortit('id')">IRI</th><th>Description</th></tr>
        <tr
            v-for="project in projects"
            v-bind:key="project.id">
            <td>{{ project.longname }}</td>
            <td>{{ project.id }}</td>
            <td v-html="project.description"></td>
        </tr>
    </table>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Projects',
    data: function() {
        return {
            projects: [{longname: "bb", id: "aa"}],
        }
    },
    methods: {
        sortit: function(element) {
            this.projects = this.projects.sort(function (a, b) {
                return a[element].localeCompare(b[element]);
            })
        }
    },
    mounted: function() {
        axios
            .get('https://api.dasch.swiss/v1/projects')
            .then(response => (this.projects = response.data.projects))
    }
}
</script>