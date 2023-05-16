<template>
  <b-tr>
    <b-td>{{ articleno }}</b-td>
    <b-th class="text-left">
      <router-link :to="{ name: 'boardview', params: { id: id } }">{{ title }}</router-link>
    </b-th>
    <b-td>{{ hit }}</b-td>
    <b-td>{{ userId }}</b-td>
    <b-td>{{ createdAt }}</b-td>
  </b-tr>
</template>

<script>
export default {
  name: "BoardInputItem",
  props: {
    id: Number,
    userId: String,
    title: String,
    hit: Number,
    createdAt: String,
  },
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
