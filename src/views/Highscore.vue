<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="rows"
      aria-controls="my-table"
    ></b-pagination>
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
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Highscore",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: "scroe", sortable: true },
        { key: "name", sortable: false }
      ],
      allScores: JSON.parse(localStorage.getItem("set_game")),
      sortBy: "scroe",
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
