<template>
    <b-container class="bv-example-row mt-5 border rounded p-4 shadow mb-5">
      <b-row>
        <b-col class="mt-3">
          <b-alert show><h3>듀오 수정</h3></b-alert>
        </b-col>
      </b-row>
    <board-input-item type="modify" class="mb-5"/>
  </b-container>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem";

export default {
  name: 'BoardModify',
  components: {
    BoardInputItem,
  },
  data() {
    return {
      message: '',
    };   
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>