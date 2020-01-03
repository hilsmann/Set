<template>
  <div class="centeredButtons">
    <div class="mt-2">Your Playername is: {{ playername }}</div>
    <b-form-input v-model="playername" placeholder="Enter your name"></b-form-input>
    <b-form-checkbox v-model="checked" name="check-button" switch size="lg">
        switch game mode<b> {{ gameMode() }}</b>
    </b-form-checkbox>
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
                playername: ls.get('settings') ? ls.get('settings')['playername'] : '',
                checked: ls.get('settings') ? ls.get('settings')['hardMode'] : false,
            }
        },
        methods: {
            saveSettings() {
                ls.set("settings", {playername: this.playername, gameMode: this.gameMode(), hardMode: this.checked});
            },
            gameMode(){
                return (this.checked ? 'HardMode' : 'NormalMode');
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
