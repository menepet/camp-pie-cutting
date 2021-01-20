<template>
  <div class="container-fluid">
    <div class = "d-flex align-items-center justify-content-center">
      <div class="circle-div d-flex align-items-center justify-content-center" id="outerCirlceId">
        <div class="center-div" id="centerDivId"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import store from '../store'

export default {
    setup(props) {
        const participants = ref([])
        const luckyStrikeNumber = ref(0)

        const names = store.state.names
        for (const name of names.values()) {
          participants.value.push(name)
        }

        luckyStrikeNumber.value = Math.floor(Math.random() * participants.value.length) + 1

        onMounted(() => {
          var cordinateArr = [];
          var x0;
          var y0;
          var centerObj = {};

          var r = 200;

          function getCenter(){
            x0 = document.getElementById("centerDivId").offsetLeft;
            y0 = document.getElementById("centerDivId").offsetTop;
            centerObj.left = x0;
            centerObj.top = y0;
            centerObj.width = 1;
            centerObj.height = 1;
            // console.log("center x,y" + x0,y0);

            for(var i = 0; i < participants.value.length; i++){ 
              var cordObj = {}; 
              var x = x0 + r * Math.cos(2 * Math.PI * i / participants.value.length); 
              var y = y0 + r * Math.sin(2 * Math.PI * i / participants.value.length);
              
              cordObj.left = x;
              cordObj.top = y;
              cordObj.width = 1;
              cordObj.height = 1;
              // console.log("x = "+x, "y = "+y);
              cordinateArr.push(cordObj);
            }
            drawLine();
          }
          
          function drawLine(){
            var thickness = 2;
            var color = "black";

            while(cordinateArr.length!=0){
              var off1 = centerObj;
              var off2 = cordinateArr[0];
              // bottom right
              var x1 = off1.left + off1.width;
              var y1 = off1.top + off1.height;
              // top right
              var x2 = off2.left + off2.width;
              var y2 = off2.top;
              // distance
              var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
              // center
              var cx = ((x1 + x2) / 2) - (length / 2);
              var cy = ((y1 + y2) / 2) - (thickness / 2);
              // angle
              var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
              // make hr
              var htmlLine = "<div class='line' style='height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' data-index=" + (cordinateArr.length) + " /> <style>.line:nth-child(" + (cordinateArr.length + 1) + ")::before{content: '" + (participants.value[cordinateArr.length - 1]) + "'}</style>";

              //document.body.innerHTML += htmlLine;
              document.getElementById("outerCirlceId").innerHTML += htmlLine;
              cordinateArr.splice(0,1);
            }
          }

          getCenter();
        })  // onMounted

        return {
          participants
        }
    }
}
</script>

<style scoped>
.container-fluid {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
    background-color: #d9d9d9;
}
.align-items-center {
    -ms-flex-align: center!important;
    align-items: center!important;
}
.justify-content-center {
    -ms-flex-pack: center!important;
    justify-content: center!important;
}
.d-flex {
    display: -ms-flexbox!important;
    display: flex!important;
}
</style>

<style>
.circle-div {
	width: 300px;
    height: 300px;
    border-radius: 50%;
    border: 3px solid black;
    position: absolute;
    top: 100px;
    overflow: hidden;
    margin: 10px;
    background: #7c473c;
    background-image: url('/sugar.png');
    background-position: center;
    white-space: pre;
}
.circle-div::before {
    content: 'Rama Camp\A 2021';
    font-size: 35px;
    font-weight: 800;
    text-align: center;
    position: absolute;
    top: 38%;
    text-shadow: 4px 15px 28px black;
}
.circle-div .line {
    padding:0px;
    margin:0px;
}
.circle-div .line::before {
    position: absolute;
    height: 22px;
    background: #000000a3;
    border-radius: 5px;
    top: 100%;
    left: 55px;
    z-index: 1;
    padding: 7px;
    color: white;
}
.circle-div .line:hover::before {
    cursor: pointer;
    color: #c8aa27;
}

@media screen and (min-width: 768px) {
    .circle-div {
        width: 400px;
        height: 400px;
    }
    .circle-div .line::before {
        left: 5px;
    }
}
</style>