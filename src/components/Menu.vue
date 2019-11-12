<template>
  <div>
    <b-button-group vertical>
      <b-button block to="/game" variant="info">Game</b-button>
      <b-button block variant="primary">Settings</b-button>
    </b-button-group>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
