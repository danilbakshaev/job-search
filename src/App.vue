<template>
  <div id="app">
    <div v-if="currentJobs.length === 0"><p>Загрузка</p></div>
    <div v-else>
      <input type="text" v-model="search" placeholder="Search by city" />
      {{ search }}
      <br />
      <div v-for="job in currentJobs" :key="job.id">{{ job.cities }}</div>
    </div>
  </div>
</template>

<script>
import getAllJobs from '@/mixins/getAllJobs';
export default {
  name: 'App',
  data() {
    return {
      search: '',
    };
  },
  mixins: [getAllJobs],
  computed: {
    currentJobs() {
      const tempJobs = this.jobs || [];

      // Если строка поиска не заполнена, тогда выводим пустой массив
      if (!this.search) {
        return tempJobs;
      }

      // Если строка поиска заполнена, то фильтруем объекты по ней
      return tempJobs.filter((job) => {
        let includeSearch = false;
        job.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(this.search.toLowerCase())) {
            includeSearch = true;
          }
        });
        if (includeSearch) {
          return job;
        }
      });
    },
  },
};
</script>
