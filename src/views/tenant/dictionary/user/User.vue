<template>
  <div class="room-category">
    <div class="room-category_feature">
      <div class="content_name">Người thuê</div>
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
import RoomDetail from "./UserDetail.vue";
// resources
import { useUser } from "./user";
// base
import BaseList from "@/views/base/BaseList";

export default {
  name: "UserVue",
  extends: BaseList,
  components: {
    TableVue,
    ButtonIcon,
    RoomDetail,
  },
  setup() {
    const user = useUser();
    return user;
  },
};
</script>

<style scoped>
@import "../dictionary.css";
</style>