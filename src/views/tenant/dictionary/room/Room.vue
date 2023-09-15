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
    <table-vue
      :data="items"
      :cols="cols"
      :tds="tds"
      @clickGridAction="clickGridAction"
    ></table-vue>
    <RoomDetail
      v-if="isShowPopup"
      title="phòng"
      :width="500"
      :entity="detailData"
      :popupMode="popupMode"
      @close="closePopup"
    />
  </div>
</template>

<script>
// components
import TableVue from "@/components/base/table/Table.vue";
import ButtonIcon from "@/components/base/button/ButtonIcon.vue";
import RoomDetail from "./RoomDetail.vue";
// resources
import { useRoom } from "./room";
// base
import BaseList from "@/views/base/BaseList";

export default {
  name: "RoomVue",
  extends: BaseList,
  components: {
    TableVue,
    ButtonIcon,
    RoomDetail,
  },
  setup() {
    const room = useRoom();
    return room;
  },
};
</script>

<style scoped>
@import "../dictionary.css";
</style>