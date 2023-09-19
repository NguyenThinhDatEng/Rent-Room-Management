<template>
  <div class="room-category">
    <div class="room-category_feature">
      <div class="content_name">Quản lý thuê phòng</div>
      <button-icon
        button-type="button--add"
        button-name="asset-add"
        buttonContent="Thêm mới"
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
    <RentingDetail
      v-if="isShowPopup"
      title="thuê phòng"
      :width="400"
      :entity="detailData"
      :mode="popupMode"
      @close="closePopup"
      @show-user-detail="openModal"
    />
  </div>
</template>

<script>
// components
import TableVue from "@/components/base/table/Table.vue";
import ButtonIcon from "@/components/base/button/ButtonIcon.vue";
import RentingDetail from "./RentingDetail.vue";
// resources
import { useRenting } from "./renting";
// base
import BaseList from "@/views/base/BaseList";

export default {
  name: "RentingVue",
  extends: BaseList,
  components: {
    TableVue,
    ButtonIcon,
    RentingDetail,
    // UserDetail,
  },
  setup() {
    const renting = useRenting();
    return renting;
  },
};
</script>

<style scoped>
@import "./dictionary.css";
</style>