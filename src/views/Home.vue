<template>
  <div class="home">
    <Menu />
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";

export default {
  name: "home",
  data() {
    return {
      showDismissibleAlert: false
    };
  },
  components: {
    Menu
  }
};
</script>
