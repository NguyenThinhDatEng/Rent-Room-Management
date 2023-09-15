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
        @click="showPopup"
      ></button-icon>
    </div>
    <table-vue
      :data="items"
      :cols="cols"
      :tds="tds"
      @click-grid-action="clickGridAction"
    ></table-vue>
    <RoomCategoryDetail
      v-if="isShowPopup"
      title="Thêm loại phòng"
      :width="500"
      :entity="detail"
      :mode="popupMode"
    />
  </div>
</template>

<script>
// components
import TableVue from "@/components/base/table/Table.vue";
import ButtonIcon from "@/components/base/button/ButtonIcon.vue";
import RoomCategoryDetail from "./RoomCategoryDetail.vue";
// Resources
import { useRoomCategory } from "./roomCategory.js";
// base
import BaseList from "@/views/base/BaseList";

export default {
  name: "RoomCategory",
  extends: BaseList,
  components: {
    TableVue,
    ButtonIcon,
    RoomCategoryDetail,
  },
  setup() {
    const roomCategory = useRoomCategory();
    return roomCategory;
  },
};
</script>

<style scoped>
@import "../dictionary.css";
</style>@/views/base/BaseList