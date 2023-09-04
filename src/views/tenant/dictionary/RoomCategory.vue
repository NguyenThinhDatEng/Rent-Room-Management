<template>
  <div class="room-category">
    <div class="room-category_feature">
      <div class="content_name">Loại phòng</div>
      <button-icon
        button-type="button--add"
        button-name="asset-add"
        buttonContent="Thêm loại phòng"
        :hasIcon="false"
        :title="Resource.Title.add"
        @click="add"
      ></button-icon>
    </div>
    <table-vue :data="items" :cols="cols" :tds="tds"></table-vue>
    <RoomCategoryDetail title="Thêm loại phòng" v-show="false" />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
// components
import TableVue from "@/components/base/table/Table.vue";
import ButtonIcon from "@/components/base/button/ButtonIcon.vue";
import RoomCategoryDetail from "./RoomCategoryDetail.vue";
// Resources
import roomCategory from "@/apis/dictionary/roomCategoryAPI";
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";

export default {
  name: "RoomCategory",
  components: {
    TableVue,
    ButtonIcon,
    RoomCategoryDetail,
  },
  setup() {
    const items = ref([]);
    const cols = {
      numerical_order: { ENG: "numerical_order", VN: "STT" },
      room_category_name: { ENG: "room_category_name", VN: "Tên loại phòng" },
      unit_price: { ENG: "unit_price", VN: "Đơn giá" },
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
        col: "room_category_name",
        type: Enum.TableData.type.text,
        minWidth: "90px",
        maxWidth: "180px",
        align: "left",
      },
      {
        col: "unit_price",
        type: Enum.TableData.type.number,
        width: "80px",
        align: "right",
      },
      {
        col: TableResource.TableRow.FixedAsset.feature.ENG,
        minWidth: "150px",
        width: "150px",
      },
    ];

    const getAll = async () => {
      try {
        const res = await roomCategory.getAsync();
        if (res.data) {
          items.value = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    };

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

    onMounted(() => {
      getAll();
    });

    return { items, cols, TableResource, tds, Resource, add };
  },
};
</script>

<style scoped>
@import "./dictionary.css";
</style>