<template>
    <div>
        <b-button-group class="group" vertical>
            <b-button block to="/game" variant="success">Game</b-button>
            <b-button block to="/highscore" variant="outline-primary">Highscore</b-button>
            <b-button block to="/manual" variant="outline-primary">Manual</b-button>
            <b-button block to="/settings" variant="outline-info">Settings</b-button>
            <b-button block to="/developer" variant="outline-danger">Developer</b-button>
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
    .group {
        width: 100%;
    }
</style>
