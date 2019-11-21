<template>
  <div>
    <h4>Here you will learn How to find a Set!</h4>
    <h5>Cards</h5>
    Every Card has <b-badge variant="primary" pill>4</b-badge> properties.
    <b-container class="bv-example-row">
      <b-row>
        <b-col>Color</b-col>
        <b-col>Form</b-col>
      </b-row>
      <b-row>
        <b-col>Filling</b-col>
        <b-col>Shape</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Manual",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.group {
  width: 100%;
  text-align: center;
}
</style>
