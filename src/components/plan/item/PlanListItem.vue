<template>
  <b-tr>
    <b-td>{{ planId }}</b-td>
    <b-th class="text-left">
      <router-link :to="{ name: 'planview', params: { planId:  planId } }">{{ title }}</router-link>
    </b-th>
    <b-td>{{ hit }}</b-td>
    <b-td>{{ userid }}</b-td>
    <b-td>{{ regtime | dateFormat }}</b-td>
  </b-tr>
</template>

<script>
export default {
  name: 'PlanListItem',
  props: {
    planId: Number,
    userId: String,
    title: String,
    hit: Number,
    createdAt: String,
  },
  filters: {
    dateFormat(createdAt) {
      return moment(new Date(createdAt)).format("YY.MM.DD");
    },
  },
};
</script>

<style scoped></style>