<template>
    <div class="settings">
        <b-container>
            <b-row>
                <b-col>Developer</b-col>
                <b-col class="developer">Sven Hilsmann</b-col>
            </b-row>
            <b-row>
                <b-col>Platforms</b-col>
                <b-col><a href="https://github.com/hilsmann">Github</a></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "Developer",
        props: {}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .developer {
        font-style: italic;
    }
</style>
