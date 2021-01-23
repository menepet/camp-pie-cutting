<template>
  <div class="container">
    <h1 class="font-bold text-2xl">Το κοπή τη Πίτα </h1>

    <img
      alt="RamaLogo"
      width="130"
      height="130"
      class="mx-auto my-5 md:my-10 logo"
      style="border-radius: 100px;"
      src="../assets/rama-logo.png"
    />

    <h2 class="font-bold text-xl">Rama Camp 2021</h2>

    <form v-on:submit.prevent="submit" class="mt-10">
     <input 
        type='text' 
        placeholder='Por Rama' 
        class="border-black"
        v-model='name'
      />
      <button class="border-black ml-3" @click='submit'>&#43;</button>
    </form>

    <button
      v-if="allNames.length"
      class="border-black block mx-auto my-6 text-lg md:text-xl font-bold"
      @click='cutPie'>
        Για πάμε να δούμε<br>τον υπερτυχερό!
      </button>
    
    <div v-if="allNames.length" class="rama-campers">
      <ul>
        <li v-for="(name, index) in allNames" :key="index">
          <span style="float: left; color: #c7aa28;">{{ allNames.length - index }}.</span>
          <span class="font-bold">{{ name }}</span>
        </li>
      </ul>
    </div>
    <button v-if="allNames.length" class="border-black block mx-auto mt-5 text-xs" @click='deleteFirst'>Σβήσιμο Τελευταίου</button>
  </div>
  <img class="thai-bottom r" src="/thai-bottom-r.png" alt="thai-bottom-r">
  <img class="thai-bottom l" src="/garuda.png" alt="thai-bottom-r">
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '../store'

  export default {
    name: 'FillParticipants',
    setup () {
      const router = useRouter()

      const name = ref('')
      const allNames = ref([])

      const deleteFirst = () => { // because array.unshift and not push
        allNames.value = allNames.value.filter((name, i) => i !== 0)
      }

      const cutPie = () => {
        store.state.names = allNames.value
        router.push('/pie')
      }

      const submit = () => {
        if (name.value) {
          allNames.value.unshift(name.value)
          name.value = ''
        }
      }

      return {
        submit,
        deleteFirst,
        cutPie,
        allNames,
        name
      }
    },
    created () {

    }
  }
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;

  input[type='text'] {
    margin-bottom: 20px;
    padding: 10px;
  }
  ul {
    list-style: none;
    margin-left: 0;
  }
  .rama-campers {
    max-width: 300px;
    max-height: 200px;
    position: relative;
    z-index: 1;
    background-color: var(--bg-color);
    padding: 0 5px;
    margin: auto;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: black var(--gold);
  }
  .rama-campers::-webkit-scrollbar {
    width: 11px;
  }
  .rama-campers::-webkit-scrollbar-track {
    background: var(--gold);
  }
  .rama-campers::-webkit-scrollbar-thumb {
    background-color: black ;
    border-radius: 6px;
    border: 3px solid var(--gold);
  }
}
img.thai-bottom {
  display: none;
  position: absolute;
  bottom: 0;
  &.r{right: 0;}
  &.l{left: 30px;}
}

@media screen and (min-width: 768px) {
  img.logo {
    width: 200px;
    height: 200px;
  }
  img.thai-bottom { display: block; }
}
</style>