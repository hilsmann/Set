<template>
    <div>
        <b-table
                striped
                hover
                :items="allScores"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :current-page="currentPage"
                :per-page="perPage"
                id="my-table"
        />
        <b-pagination
                class="group"
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="rows"
                align="fill"
                aria-controls="my-table"
        />
    </div>
</template>

<script>
    import SecureLS from 'secure-ls';

    const ls = new SecureLS();
    export default {
        name: "Highscore",
        data() {
            return {
                perPage: 5,
                currentPage: 1,
                fields: [
                    {key: "score", sortable: true},
                    {key: "name", sortable: true},
                    {key: "gameMode", sortable: true},
                ],
                allScores: ls.get('set_game') ? ls.get('set_game') : [],
                sortBy: "score",
                sortDesc: true
            };
        },
        computed: {
            rows() {
                return this.allScores.length;
            }
        },
        props: {}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .group {
        width: 100%;
    }
</style>
