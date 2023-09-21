<template>
  <div class="renting flex">
    <div class="room-category_feature">
      <div class="content_name">Quản lý thuê phòng</div>
    </div>
    <!-- Search -->
    <div class="search mb-2 pl-1">
      <Input
        placeholder="Tìm kiếm"
        field="keyWord"
        :hasLabel="false"
        :max-length="255"
        v-model="model.keyWord"
        @keyup.enter="refresh({ keyWord: model.keyWord })"
      ></Input>
      <button-icon
        class="mr-1"
        button-type="button--add"
        button-name="asset-add"
        buttonContent="Thêm mới"
        :hasIcon="false"
        :title="Resource.Title.add"
        @click="add"
      ></button-icon>
    </div>
    <!-- Table -->
    <table-vue
      :data="items"
      :cols="cols"
      :tds="tds"
      :features="['payment', 'check-out']"
      class="flex"
      @clickGridAction="clickGridAction"
    ></table-vue>
    <RentingDetail
      v-if="isShowPopup"
      title="thuê phòng"
      :width="800"
      :entity="detailData"
      :mode="popupMode"
      @close="closePopup"
    />
    <PaymentDetail
      v-if="isShowPaymentDetail"
      :entity="detailData"
      @close="closePaymentDetail"
    />
  </div>
</template>

<script>
// components
import TableVue from "@/components/base/table/Table.vue";
import ButtonIcon from "@/components/base/button/ButtonIcon.vue";
import Input from "@/components/base/input/Input.vue";
import RentingDetail from "./RentingDetail.vue";
import PaymentDetail from "./PaymentDetail.vue";
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
    Input,
    PaymentDetail,
  },
  setup() {
    const renting = useRenting();
    return renting;
  },
};
</script>

<style scoped>
@import "./renting.scss";
</style>