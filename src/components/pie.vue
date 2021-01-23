<template>
  <div class="container-fluid">
    <div class = "flex items-center justify-center">
      <div class="circle-div flex items-center justify-center" id="outerCirlceId">
        <div class="center-div" id="centerDivId"></div>
      </div>
    </div>
  </div>
  <div v-if="winner" class="absolute p-10 md:p-20 w-10/12 md:w-7/12 winner">
    <span class="absolute top-5 right-10 cursor-pointer text-lg" @click="winner=''">&#10005;</span>
    <h1 class="text-2xl font-bold mb-1">สวัสดีปีใหม่ 2021</h1>
    <h1 class="text-2xl font-bold mb-10">{{ winner }}</h1>
    <img src="/thai-baht.png" class="m-auto" height="400" width="400" alt="winner">
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '../store'

export default {
    setup() {
        const router = useRouter()

        const participants = ref([])
        const luckyStrikeNumber = ref(0)
        const winner = ref('')

        const names = store.state.names
        if (!names.length) { router.push('/') }  // if no names go to home page
        for (const name of names.values()) {
          participants.value.push(name)
        }

        const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
        const maxValue = participants.value.length

        luckyStrikeNumber.value = randomIntFromInterval(2 , maxValue + 1)

        onMounted(() => {
          // https://github.com/visheshmishra/circle_division
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

            for(var i = 0; i < maxValue; i++){ 
              var cordObj = {}; 
              var x = x0 + r * Math.cos(2 * Math.PI * i / maxValue); 
              var y = y0 + r * Math.sin(2 * Math.PI * i / maxValue);
              
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
            var childIndex = 1;

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
              var htmlLine = "<div id='name" + cordinateArr.length + "' class='line' style='height:"
              + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:"
              + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate("
              + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate("
              + angle + "deg);' data-index=" + (childIndex + 1) + " data-name=" + participants.value[(childIndex - 1)]
              + " /> <style>.line:nth-child(" + (childIndex + 1) + ")::before{content: '"
              + participants.value[childIndex - 1] + "'}</style>";

              childIndex++

              document.getElementById("outerCirlceId").innerHTML += htmlLine;

              cordinateArr.splice(0,1)
            }
          }

          getCenter();

          // Global Listener for cake pieces
          document.addEventListener('click', (e) => {
            if (e.target.getAttribute("data-index")) { // has one of the data attribute above
              e.target.classList.add("disable")
            }

            if (parseInt(e.target.getAttribute("data-index")) === luckyStrikeNumber.value) {
              winner.value = e.target.getAttribute("data-name")
            }
          });
        })  // onMounted

        return {
          winner,
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
.winner {
  top: 10%;
  left: 13%;
  background: white;
  border-radius: 50px;
  box-shadow: 15px 16px 40px -15px #0000009e;
  animation: winnerFade 1s ease-in-out forwards;
}
@screen md {
  .winner {
    left: 25%;
  }
}
@keyframes winnerFade {
    0% {
      opacity:0;
      transform:  translate(80px, -80px)  ;
    }
    100% {
      opacity:1;
      transform:  translate(0px, 0px)  ;
    }
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
}
.circle-div::before {
  content: 'Rama Camp 2021';
  width: 215px;
  white-space: pre-wrap;
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

@screen md {
  .circle-div {
    width: 400px;
    height: 400px;
  }
  .circle-div .line::before {
    left: 5px;
  }
  .winner {
    left: 28%;
  }
}
</style>