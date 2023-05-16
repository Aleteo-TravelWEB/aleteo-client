<template>
  <b-container>
    <b-row>
      <b-col md="4" v-for="card in cards" :key="card.id">
        <b-card>
          <b-card-text>{{ card.title }}</b-card-text>
        </b-card>
      </b-col>
    </b-row>

    <b-pagination
      v-model="currentPage"
      :total-rows="cards.length"
      :per-page="itemsPerPage"
      align="center"
      class="mt-4"
    ></b-pagination>
  </b-container>
</template>

<script>
export default {
    name: 'HotplaceList',
    components: {},
    data() {
        return {
            cards: [
                { id:1 , title: 'Card 1'},
                { id:2 , title: 'Card 2'},
                { id:3 , title: 'Card 3'},
                { id:4 , title: 'Card 4'},
                { id:5 , title: 'Card 5'},
                { id:6 , title: 'Card 6'},
                { id:7 , title: 'Card 7'},
                { id:8 , title: 'Card 8'},
                { id:9 , title: 'Card 9'},
                { id:10 , title: 'Card 10'},
                { id:11 , title: 'Card 11'},
                { id:12 , title: 'Card 12'},
                { id:13 , title: 'Card 13'},
                { id:14 , title: 'Card 14'},
                { id:15 , title: 'Card 15'},
                { id:16 , title: 'Card 16'},
                { id:17 , title: 'Card 17'},
                { id:18 , title: 'Card 18'},
                { id:19 , title: 'Card 19'},
                { id:20 , title: 'Card 20'},
            ],
            currentPage: 1,
            itemsPerPage: 9,
        };
    },
    computed: {
        pageinatedCards() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.cards.slice(startIndex, endIndex);
        }
    },
    created() {},
    methods: {},
};
</script>

<style scoped></style>