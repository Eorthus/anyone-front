<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '@/store'
import { PersonAgeInput } from '@/components/PersonAgeInput'

const route = useRoute()
const person = computed(() => store.people.find((p) => p.id === Number(route.params.id)))
</script>

<template>
  <div v-if="person" class="flex flex-col gap-4">
    <router-link to="/" class="text-violet-600 hover:underline text-sm">&larr; Back</router-link>
    <PersonAgeInput v-model="person.ageInHours" :person-id="person.id" :person-name="person.name" />
  </div>

  <div v-else>
    <p class="text-gray-600">Person not found</p>
    <router-link to="/" class="text-violet-600 hover:underline text-sm">Back to list</router-link>
  </div>
</template>