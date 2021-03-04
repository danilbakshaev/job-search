<template>
  <div id="app">
    <div class="container mx-auto px-4 sm:px-0 mt-5">
      <div v-if="currentJobs.length === 0">
        <p class="text-center">Loading</p>
      </div>
      <div v-else class="bg-blue">
        <t-input
          v-model="search"
          placeholder="Search by city"
          name="my-input"
        />
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-5">
          <t-card v-for="job in currentJobs" :key="job.id" :header="job.title">
            <img
              v-if="job.company.logoUrl"
              :src="job.company.logoUrl"
              :alt="`Logo ${job.company.name}`"
              class="card-img"
            />
            <div v-else class="card-noimg">No image</div>

            <p class="my-3">Company: {{ job.company.name }}</p>

            <p class="my-3" v-if="job.cities.length !== 0">
              City:
              <span v-for="(item, index) in job.cities" :key="index">{{
                `${item.name} `
              }}</span>
            </p>

            <p v-if="job.remotes.length !== 0" class="my-3">
              Remote
            </p>

            <p class="my-3">
              Tags:
              <span v-for="(item, index) in job.tags" :key="index">{{
                `${item.name} `
              }}</span>
            </p>
          </t-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getAllJobs from '@/mixins/getAllJobs';
import { TInput, TCard } from 'vue-tailwind/dist/components';
export default {
  name: 'App',
  data() {
    return {
      search: '',
    };
  },
  mixins: [getAllJobs],
  components: { TInput, TCard },
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
  settings: {
    't-input': {
      component: TInput,
    },
    't-card': {
      component: TCard,
    },
  },
};
</script>

<style scoped>
.card-img {
  max-width: 100px;
  height: 100px;
}
.card-noimg {
  width: 100px;
  height: 100px;
  background: rgb(209, 209, 209);
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
}
</style>
