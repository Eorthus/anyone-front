<script setup lang="ts">
import { computed } from "vue";
import { store } from "@/store";

const peopleWithYears = computed(() => {
  return store.people.map((person) => ({
    ...person,
    ageInYears: Math.floor(person.ageInHours / 8760),
  }));
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-xl font-bold text-gray-700">People</h1>

    <div class="flex flex-col gap-3">
      <router-link
        v-for="person in peopleWithYears"
        :key="person.id"
        :to="`/person/${person.id}`"
        class="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-violet-500"
      >
        <img
          :src="`https://i.pravatar.cc/150?img=${person.id}`"
          :alt="person.name"
          class="w-10 h-10 rounded-full border-2 border-violet-500 object-cover"
        />
        <div>
          <div class="text-gray-700 font-koulen">{{ person.name }}</div>
          <div class="text-gray-600 font-inter">{{ person.ageInYears }} years old</div>
        </div>
      </router-link>
    </div>

    <router-link to="/settings" class="text-violet-600 hover:underline text-sm">
      Settings
    </router-link>
  </div>
</template>
