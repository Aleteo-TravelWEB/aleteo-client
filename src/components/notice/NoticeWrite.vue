<template>
    <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 style="color: black;">공지사항 등록</h3>
      </b-col>
    </b-row>
    <notice-input-item type="write" class="mb-5" />
  </b-container>
</template>

<script>
import NoticeInputItem from './item/NoticeInputItem.vue';

export default {
  name: 'NoticeWrite',
  components: {NoticeInputItem},
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