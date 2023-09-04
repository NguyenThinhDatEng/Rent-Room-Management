<template>
  <div class="room-category">
    <div class="room-category_feature">
      <div class="content_name">Phòng</div>
      <button-icon
        button-type="button--add"
        button-name="asset-add"
        buttonContent="Thêm phòng"
        :hasIcon="false"
        :title="Resource.Title.add"
        @click="add"
      ></button-icon>
    </div>
    <table-vue :data="items" :cols="cols" :tds="tds"></table-vue>
  </div>
</template>

<script>
import { computed } from "vue";
// components
import TableVue from "@/components/base/table/Table.vue";
import ButtonIcon from "@/components/base/button/ButtonIcon.vue";
// Resources
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";
// store
import { useStore } from "vuex";

export default {
  name: "RoomVue",
  components: {
    TableVue,
    ButtonIcon,
  },
  setup() {
    // store
    const store = useStore();
    store.dispatch("setAllRooms");
    const items = computed(() => {
      return store.state.allRooms;
    });

    const cols = {
      numerical_order: { ENG: "numerical_order", VN: "STT" },
      room_name: { ENG: "room_name", VN: "Tên phòng" },
      room_category_name: { ENG: "room_category_name", VN: "Loại phòng" },
      state: { ENG: "state", VN: "Trạng thái" },
      feature: { ENG: "feature", VN: "Tính năng" },
    };
    const tds = [
      {
        col: TableResource.TableRow.FixedAsset.numerical_order.ENG,
        type: Enum.TableData.type.text,
        minWidth: "40px",
        width: "50px",
        align: "center",
      },
      {
        col: "room_name",
        type: Enum.TableData.type.text,
        minWidth: "90px",
        maxWidth: "180px",
        align: "left",
      },
      {
        col: "room_category_name",
        type: Enum.TableData.type.text,
        minWidth: "90px",
        maxWidth: "180px",
        align: "left",
      },
      {
        col: "state",
        type: Enum.TableData.type.boolean,
        width: "100px",
        align: "center",
        display: { yes: "Đã thuê", no: "Trống" },
      },
      {
        col: TableResource.TableRow.FixedAsset.feature.ENG,
        minWidth: "150px",
        width: "150px",
      },
    ];

    /**
     * @description xử lý sự kiện nhấn vào nút thêm mới
     * @author NVThinh 01/09/2023
     */
    const add = () => {
      try {
        // Cập nhật chế độ và tiêu đề popup
        this.mode = Enum.Mode.Add;
        this.popupTitle = Resource.PopupTitle.add;
        // Hiển thị popup
        this.isShowPopup = true;
      } catch (error) {
        console.log(error);
      }
    };

    return { items, cols, TableResource, tds, Resource, add };
  },
};
</script>

<style scoped>
@import "./dictionary.css";
</style>