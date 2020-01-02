<template>
  <div class="centeredButtons">
    <div class="mt-2">Your Playername is: {{ playername }}</div>
    <b-form-input v-model="playername" placeholder="Enter your name"></b-form-input>
    <b-button pill class="saveButton" @click="saveSettings" variant="outline-primary">Save Settings</b-button>
  </div>
</template>

<script>
    import SecureLS from 'secure-ls';

    const ls = new SecureLS();
    export default {
        name: "Settings",
        data() {
            return {
                playername: ls.get('settings') ? ls.get('settings')[0]['playername'] : '',
            }
        },
        methods: {
            saveSettings() {
                ls.set("settings", [{playername: this.playername}]);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .centeredButtons{
        margin-left: 20%;
        margin-right: 20%;
        position: relative;
    }
    .saveButton{
        margin-top: 2%;
    }
</style>
