<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="elevation-12 rounded-xl">
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    :items="provinces"
                    v-model="selectedProvince"
                    label="시/도"
                    outlined
                    solo
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    :items="cities"
                    v-model="selectedCity"
                    label="시/군/구"
                    outlined
                    solo
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="2">
                  <v-btn @click="search" block color="primary">검색</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SearchBar",
  components: {},
  data() {
    return {
      message: "",
      selectedProvince: "",
      selectedDistrict: "",
      selectedTypes: [],
      provinces: [],
      districts: [],
      types: [],
    };
  },
  methods: {
    submit(){

    },
    getDistricts(province) {
      console.log(province);
    },
  },
  watch: {
    selectedProvince(value) {
      this.districts = this.getDistricts(value);
      this.selectedDistrict = "";
    },
  },
  created() {
    this.districts = this.getDistricts(this.selectedProvince);
  },
  mounted() {
    this.selectedProvince = this.provinces[0];
  },
  computed: {
    hasSelectedProvince() {
      return this.selectedProvince !== "";
    },
  },
};
</script>

<style scoped></style>