<template>
  <div class="centeredButtons">
    <div class="mt-2">Your Playername is: {{ username }}</div>
    <b-form-input v-model="username" placeholder="Enter your name"></b-form-input>
    <b-form-checkbox v-model="checked" name="check-button" switch size="lg">
        switch game mode<b> {{ gameMode() }}</b>
    </b-form-checkbox>
    <b-button pill class="saveButton" @click="saveSettings" variant="outline-primary">Save Settings</b-button>
  </div>
</template>

<script>
    import { Settings } from '../assets/settings/settings.js';

    const settings = new Settings();
    const LOCAL_STORAGE_DATA_SETTINGS = 'settings';

    export default {
        name: "Settings",
        data() {
            return {
                username: settings.getUserName(LOCAL_STORAGE_DATA_SETTINGS),
                checked: settings.getHardmodeFlag(LOCAL_STORAGE_DATA_SETTINGS),
            }
        },
        methods: {
            saveSettings() {
                settings.set(this.username, this.gameMode(), this.checked, LOCAL_STORAGE_DATA_SETTINGS);
                this.$bvToast.toast('Successfully saved', {
                    title: 'Settings',
                    toaster: 'b-toaster-bottom-full',
                    autoHideDelay: 3000,
                    solid: true
                });
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
