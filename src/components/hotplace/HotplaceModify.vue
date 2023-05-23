<template>
  <b-container>
    <div class="buttons">
      <button
          class="btn-hover color-9"
          style="width: 200px"
          variant="outline-prim"
          @click="movetoRegist()"
        >
          등록하러 가기
        </button>
        <button
          class="btn-hover color-9"
          style="width: 200px"
          variant="outline-prim"
          @click="movetoList()"
        >
          핫플레이스 목록
        </button>
    </div>
    <div class="grid" >
      <div v-for="hotplace in hotplaces" :key="hotplace.id" >
        <template v-if="hotplace.userId === userInfo.userId">
          <div class="grid_item">
            <div class="card" style="width: 300px;">
            <img
              class="card_img"
              :src="`/upload/hotplace/image/${hotplace.image}`"
              alt="thumnail"
            />
            <div class="card_content">
              <p class="card_header">{{ hotplace.title }}</p>
              <div style="height : 55px">
                <span class="card_text" v-if="hotplace.tag1 !== `null`">#{{ hotplace.tag1 }}</span>
                <br>
                <span class="card_text" v-if="hotplace.tag2 !== `null`">#{{ hotplace.tag2 }}</span>
              </div>
              <button class="card_btn" @click="modify(hotplace)">
                수정 및 삭제 <span>&rarr;</span>
              </button>
            </div>
          </div>
          </div>
        </template>
      </div>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="hotplaces.length"
      :per-page="perPage"
      align="center"
      class="mt-4"
    />
    <!-- 수정 삭제 모달창 -->
    <div v-if="showModifyModal" class="modal">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card" id="card1">
            <h2 class="card-title text-center">수정 및 삭제</h2>
            <div class="card-body py-md-4">
              <form _lpchecked="1">
              <div class="form-group">
                <input type="text" class="form-control" v-model="hotplace.description" placeholder="내용...">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="hotplace.tag1" placeholder="hotplace.tag1">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="hotplace.tag2" placeholder="hotplace.tag2">
              </div>
              <div class="form-group">
                <input type="file" @change="hotplaceimg" placeholder="사진"/>
              </div>
              <div class="d-flex flex-row align-items-center justify-content-between">
                <a @click="handleCancel">취소</a>
                <div class="buttonsss">
                  <button class="btn btn-primary" @click="updatehotplace(hotplace)" >수정</button>
                  <button class="btn btn-primary" @click="deletehotplace(hotplace)" >삭제</button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
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
      perPage: 8,
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
    movetoList() {
      this.$router.push({ name: "hotplacelist" });
    },
    modify(hotplace) {
      console.log("click")
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

<style scoped>
.styled-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  justify-content: center;
}
.grid_item {
  background-color: #fff;
  height: 30rem;
  border-radius: 0.4rem;
  overflow: hidden;
  box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.2s;
}

.grid_item:hover {
  transform: translateY(-0.5%);
  box-shadow: 0 4rem 8rem rgba(0, 0, 0, 0.2);
}

.card_img {
  display: block;
  height: 14rem;
  object-fit: cover;
}
.card_content {
  padding: 2rem 2rem;
}
.card_header {
  font-size: 1.3rem;
  font-weight: 500;
  color: #0d0d0d;
  margin-bottom: 1.5rem;
  height: 3rem;
  align-items: center;
  text-align: center;
}
.card_text {
  font-size: 1rem;
  letter-spacing: 0.1rem;
  line-height: 1.7;
  color: #3d3d3d;
  height: 3rem;
  margin-bottom: 2.5rem;
}
.card_btn {
  display: block;
  width: 100%;
  padding: 1.5rem;
  font-size: 0.8rem;
  text-align: center;
  color: #3363ff;
  background-color: #e6ecff;
  border: none;
  border-radius: 0.4rem;
  transition: 0.2s;
  cursor: pointer;
}
.card_btn span {
  margin-left: 1rem;
  transition: 0.2s;
}
.card_btn:hover,
.card__btn:active {
  background-color: #dce4ff;
}
.card_btn:hover span,
.card__btn:active span {
  margin-left: 1.5rem;
}

/* 수정 삭제 폼 */
.modal {
  display: block;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
@import url('https://fonts.googleapis.com/css?family=PT+Sans');

h2{
  padding-top: 1.5rem;
}
a{
  color: #333;
  cursor: pointer;
}
a:hover{
  color: #3f72af;
  text-decoration: none;
}
#card1{
  border: 0.40rem solid #f9f7f7;
  top: 10%;
}
.form-control{
  background-color: #f9f7f7;
  padding: 20px;
  padding: 25px 15px;
  margin-bottom: 1.3rem;
}

.form-control:focus {
  color: #000000;
  background-color: #ffffff;
  border: 3px solid #3f72af;
  outline: 0;
  box-shadow: none;

}

.btn{
  /* padding: 0.6rem 1.2rem; */
  background: #3f72af;
  border: 2px solid #3f72af;
  margin: 2px;
}
.btn-primary:hover {
  background-color: #3f72af;
  border-color: #3f72af;
  transition: .3s;

}
#description {
  height: 100px;
}

/* 이동 버튼 */
.buttons {
  text-align: center;
  margin: 35px;
  justify-content: center;
}

.btn-hover {
  width: 180px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 50px;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  margin-left: 10px;

  border-radius: 20px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color-9 {
  background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
</style>
