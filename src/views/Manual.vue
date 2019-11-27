<template>
    <div>
        <b-container class="bv-example-row text-center">
            <b-row class="border border-dark">
                <b-col><h4>Here are the Rules</h4></b-col>
            </b-row>
            <b-row>
                <b-col
                >
                    <p>
                        To find One Set you have to select
                        <b-badge variant="primary" pill>3</b-badge>
                        Cards on the Board
                    </p>
                </b-col
                >
            </b-row>
            <b-row>
                <b-col
                >Every Card has
                    <b-badge variant="primary" pill>4</b-badge>
                    properties.
                </b-col
                >
            </b-row>
            <b-row>
                <b-col class="border border-dark">Color</b-col>
                <b-col class="border border-dark">Form</b-col>
            </b-row>
            <b-row>
                <b-col class="border border-dark">Filling</b-col>
                <b-col class="border border-dark">Shape</b-col>
            </b-row>
            <b-row>
                <b-col
                >Each of these properties must be Same or completely different. The
                    next three Cards is an Example set
                </b-col
                >
            </b-row>
            <b-row>
                <b-col class="border border-dark"
                ><img src="@/assets/cards_svg/0001.svg" :width="canvas_width"
                /></b-col>
                <b-col class="border border-dark"
                ><img src="@/assets/cards_svg/1112.svg" :width="canvas_width"
                /></b-col>
                <b-col class="border border-dark"
                ><img src="@/assets/cards_svg/2223.svg" :width="canvas_width"
                /></b-col>
            </b-row>
            <b-row>
                <b-col
                >Here you see different Color, Shape, Filling and Amount in the
                    properties
                </b-col
                >
            </b-row>
            <b-row>
                <b-col class="border border-dark">Points</b-col>
            </b-row>
            <b-row>
                <b-col
                >When you start a game or have found a Set you will get
                    <b-badge variant="success" pill>100</b-badge>
                    Points. But every Second
                    you do not find a Set you will lose One Point and for each wrong Set
                    you lose another 5 Points to the Points you will get for the next
                    Set.
                </b-col
                >
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "Manual",
        data() {
            return {
                canvas_height: window.innerHeight / 2,
                canvas_width: window.innerWidth / 7
            };
        },
        mounted() {
            let _this = this;
            window.addEventListener("resize", function () {
                _this.canvas_width = window.innerWidth / 7;
                _this.canvas_height = window.innerHeight / 2;
            });
        },
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
