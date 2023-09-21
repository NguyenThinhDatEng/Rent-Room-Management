<template>
  <Popup
    class="renting-detail"
    :title="popupTitle"
    @close-popup="close"
    @on-save="save"
  >
    <div
      class="popup__body__wrapper flex-column"
      :style="{ height: mode == Enum.Mode.Update ? '500px' : 'unset' }"
    >
      <div class="row">
        <ComboboxDetail
          class="mr-2"
          label="Phòng"
          field="room"
          displayField="room_name"
          valueField="room_id"
          :max-length="255"
          :combobox-data="roomItems"
          :value="model.room_id"
          :has-label="true"
          :is-required="true"
          :isShowComboboxDataTitle="false"
          :isDisabled="mode == Enum.Mode.Update"
          @update-combobox="selectRoom"
        ></ComboboxDetail>
        <ComboboxDetail
          :label="userLabel"
          field="user"
          displayField="user_name"
          valueField="user_id"
          :max-length="255"
          :combobox-data="userNotRenting"
          :value="model.user_id"
          :has-label="true"
          :is-required="true"
          :isShowComboboxDataTitle="false"
          @update-combobox="selectUser"
        ></ComboboxDetail>
      </div>
      <div class="row">
        <Input
          label="Tiền phòng"
          field="price"
          :hasLabel="true"
          mask="decimal"
          :max-length="22"
          v-model="model.price"
          class="mr-2"
        ></Input>
        <Input
          label="Ngày thuê"
          field="room_rental_date"
          :hasLabel="true"
          mask="date"
          placeholder="01/01/2023"
          v-model="model.room_rental_date"
        ></Input>
      </div>
      <div class="row">
        <Input
          label="Tiền cọc"
          placeholder="100000"
          field="deposit"
          :hasLabel="true"
          mask="decimal"
          :max-length="22"
          v-model="model.deposit"
        ></Input>
      </div>
      <!-- Table -->
      <table-vue
        v-if="mode === Enum.Mode.Update"
        :data="items"
        :cols="cols"
        :tds="tds"
        class="flex"
        :features="['delete']"
        @clickGridAction="clickGridAction"
      ></table-vue>
    </div>
  </Popup>
</template>
    
    <script>
// Components
import Popup from "@/components/base/popup/VPopup.vue";
import Input from "@/components/base/input/Input.vue";
import ComboboxDetail from "@/components/base/combobox/ComboboxDetail.vue";
import TableVue from "@/components/base/table/Table.vue";
// Resources
import { useRentingDetail } from "./rentingDetail.js";
// base
import BaseDetail from "@/views/base/BaseDetail";

export default {
  name: "RentingDetail",
  extends: BaseDetail,
  components: {
    Popup,
    Input,
    ComboboxDetail,
    TableVue,
  },
  props: {
    title: {
      type: String,
      default: "",
      isRequired: true,
    },
    /**
     * data of popup
     */
    entity: {
      type: Object,
      default: () => {
        return {
          room_id: "",
          room_name: "",
        };
      },
    },
    /**
     * mode of popup
     */
    mode: {
      type: Number,
    },
  },
  setup() {
    const rentingDetail = useRentingDetail();
    return rentingDetail;
  },
};
</script>
    
<style lang="scss">
@import "./rentingDetail.scss";
</style>