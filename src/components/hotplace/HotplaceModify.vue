<template>
  <b-container>
    <div>나만의 핫풀레이siuuuu</div>
    <button @click="movetoRegist" id="registbutton" class="styled-button">등록하러 가기</button>
    <b-row>
      <b-col cols="4" v-for="hotplace in pagination" :key="hotplace.id">
        <template v-if="hotplace.userId === userInfo.userId">
          <b-card
            :title="hotplace.title"
            img-alt="Image"
            img-top
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text> #{{ hotplace.tag1 }} #{{ hotplace.tag2 }} </b-card-text>
            <b-button @click="modify(hotplace)" variant="primary">수정 및 삭제</b-button>
          </b-card>
        </template>
      </b-col>
    </b-row>
    <b-pagination
      v-model="currentPage"
      :total-rows="hotplaces.length"
      :per-page="perPage"
      align="center"
      class="mt-4"
    />
    <b-modal id="deatil" v-model="showModifyModal" :title="this.hotplace.title">
      <img :src="hotplace.imageUrl" alt="" />
      태그 1 :
      <input type="text" :placeholder="hotplace.tag1" v-model="hotplace.tag1" class="modal-input" />
      태그 2 :
      <input type="text" :placeholder="hotplace.tag2" v-model="hotplace.tag2" class="modal-input" />
      <hr />
      설명 :
      <input
        type="text"
        :placeholder="hotplace.description"
        v-model="hotplace.description"
        class="modal-input"
      />
      사진 변경 : <input type="file" @change="hotplaceimg" />
      <template #modal-footer>
        <b-button variant="secondary" @click="handleCancel">취소</b-button>
        <b-button variant="primary" @click="updatehotplace(hotplace)">수정</b-button>
        <b-button variant="danger" @click="deletehotplace(hotplace)">삭제</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import { listHotplace, deleteHotplace, modifyHotplace1, modifyHotplace2 } from "@/api/hotplace";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "hotplaceModify",
  components: {},
  data() {
    return {
      hotplaces: [],
      currentPage: 1,
      perPage: 9,
      hotplace: {
        userId: null,
        image: null,
        title: null,
        description: null,
        tag1: null,
        tag2: null,
        latitude: null, // 위도 => y
        longitude: null, // 경도 => x
        mapUrl: null,
        imageUrl: "",
      },
      showModifyModal: false,
      img: null,
      imageChanged: false,
      imageUrl: "",
    };
  },
  created() {
    listHotplace(
      ({ data }) => {
        this.hotplaces = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    pagination() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.hotplaces.slice(startIndex, endIndex);
    },
  },
  methods: {
    movetoRegist() {
      this.$router.push({ name: "hotplacewrite" });
    },
    modify(hotplace) {
      this.hotplace = { ...hotplace };
      this.showModifyModal = true;
    },
    handleCancel() {
      this.showModifyModal = false;
      this.imageChanged = false;
      this.img = null;
    },
    updatehotplace(hotplace) {
      console.log(hotplace);
      if (!this.imageChanged) {
        modifyHotplace2(
          hotplace,
          ({ data }) => {
            let msg = "수정 시 문제 발생";
            if (data.message === "success") {
              msg = "수정 완료";
            }
            alert(msg);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        modifyHotplace1(
          [hotplace, this.img, this.imageUrl],
          ({ data }) => {
            let msg = "수정 시 문제 발생";
            if (data.message === "success") {
              msg = "수정 완료";
            }
            alert(msg);
          },
          (error) => {
            console.log(error);
          }
        );
      }
      this.moveList();
    },
    hotplaceimg(event) {
      this.img = event.target.files[0];
      console.log(this.img);
      this.imageChanged = true;
      if (this.img) {
        this.fileToBlob(this.img)
          .then((blob) => {
            console.log(blob);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    deletehotplace(hotplace) {
      let param = hotplace.num;
      deleteHotplace(
        param,
        ({ data }) => {
          let msg = "삭제 처리시 문제가 발생 했습니다.";
          if (data.message === "success") {
            msg = "삭제 완료";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
      this.moveList();
    },
    fileToBlob(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const blob = new Blob([reader.result], { type: file.type });
          return blob;
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },
    moveList() {
      this.showModifyModal = false;
      this.$router.go();
    },
  },
};
</script>

<style scoped></style>
