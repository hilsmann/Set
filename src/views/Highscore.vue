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
    import { Settings } from '../assets/settings/settings.js';

    const settings = new Settings();
    const LOCAL_STORAGE_DATA_SET_GAME = "set_game";

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
                allScores: settings.get(LOCAL_STORAGE_DATA_SET_GAME) ? settings.get(LOCAL_STORAGE_DATA_SET_GAME) : [],
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
