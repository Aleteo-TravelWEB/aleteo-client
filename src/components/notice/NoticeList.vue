<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <div class="mt-3 mb-4"><h3 style="color: black">공지사항</h3></div>
        </b-col>
      </b-row>
      <template v-if="userInfo && userInfo.grade === '관리자'">
      <b-row class="mb-5 p-3 d-flex align-items-center" style="border-radius: 20px">
        <b-col class="text-right buttons">
          <button
            class="btn-hover color-9"
            style="width: 400px"
            variant="outline-prim"
            @click="moveWrite()"
          >
            공지사항 등록하기
          </button>
        </b-col>
      </b-row>
      </template>
      <b-row>
        <b-col>
          <b-table
            id="list"
            hover
            :items="notices"
            :per-page="perpage"
            :current-page="currentPage"
            :fields="fields"
            @row-clicked="viewNotice"
            class="table-hover"
            :tbody-tr-class="rowClass"
          >
            <template #cell(index)="data">
              {{ notices.length - data.index - (currentPage - 1) * perpage }}
            </template>
            <template #cell(title)="data">
              <router-link :to="{ name: 'noticeview', params: { id: data.item.id } }" class="link">
                {{ data.item.title }}
              </router-link>
            </template>
            <template #row="rowProps">
              <b-tr class="highlight-row">
                <slot name="row" v-bind="rowProps"></slot>
              </b-tr>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-pagination
        pills
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perpage"
        aria-controls="list"
        align="center"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script>
import { listNotice } from "@/api/notice";
import { mapState } from 'vuex';

const userStore = "userStore";

export default {
  name: "NoticeList",
  components: {
  },
  props: {
    userId: String,
  },
  data() {
    return {
      notices: [],
      currentPage: 1,
      perpage: 10,
      fields: [
        { key: "index", label: "NO", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdClass" },
        { key: "userName", label: "작성자", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
        { key: "createdAt", label: "작성일", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    let param = {
      pg: 1, // 현재 페이지 번호
      spp: 10, // 페이지당 글 개수
      key: null,
      word: null,
    };
    listNotice(
      param,
      ({ data }) => {
        this.notices = data;
        console.log(data);
        this.notices.forEach(element => {
          if (element.pin > 0) element.isPin = true;
          else element.isPin = false;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    rows() {
      return this.notices.length;
    },
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.pin > 0) return 'table-secondary'
    },
    moveWrite() {
      this.$router.push({ name: "noticewrite" });
    },
    viewNotice(notice) {
      this.$router.push({
        name: "noticeview",
        params: { id: notice.id },
      });
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}

.buttons {
  text-align: center;
}

.btn-hover {
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 50px;
  text-align: center;
  border: none;
  background-size: 300% 100%;

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

.table-hover:hover {
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: black;
}

.highlight-row {
  background-color: yellow; 
}
</style>
