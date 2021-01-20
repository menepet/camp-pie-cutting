<template>
  <div class="container">
    <h1>Το κοπή τη Πίτα </h1>

    <img alt="RamaLogo" width="200" height="200" src="../assets/rama-logo.png" />

    <h2>Rama Camp 2021</h2>

    <form v-on:submit.prevent="submit">
     <input 
        type='text' 
        placeholder='RamaCamper' 
        v-model='name'
      />
    </form>
    <br>
    <button @click='submit'>Δώσε</button>
    <br>
    <br>
    
    <div class="rama-campers">
      <ul>
        <li v-for="(name, index) in allNames" :key="index">
          <span style="float: left">{{ allNames.length - index }}.</span> {{ name }}
        </li>
      </ul>
    </div>
    <br>
    <br>
    <button @click='deleteFirst'>Σβήσιμο Τελευταίου</button>

    <br>
    <br>
    <br>
    <button @click='cutPie'>Για πάμε να δούμε<br>τον τυχερό</button>
    <br>
    <br>
    <button @click='reset'>Καθαρισμός</button>
  </div>
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

      const reset = () => {
        allNames.value = [] // clears the allNames
      }

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
        reset,
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
    margin: auto;
    overflow: auto;
  }
}
</style>