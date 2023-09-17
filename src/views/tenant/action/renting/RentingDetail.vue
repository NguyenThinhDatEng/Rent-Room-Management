<template>
  <Popup
    class="renting-detail"
    :title="popupTitle"
    @close-popup="close"
    @on-save="save"
  >
    <div class="popup__body__wrapper">
      <div class="row flex-column">
        <ComboboxDetail
          label="Phòng"
          field="room"
          displayField="room_name"
          valueField="room_id"
          :max-length="255"
          :combobox-data="store.state.allRooms"
          :value="model.room_id"
          :has-label="true"
          :is-required="true"
          :isShowComboboxDataTitle="false"
          @update-combobox="updateCombobox"
        ></ComboboxDetail>
      </div>
      <div class="row user">
        <ComboboxDetail
          label="Người thuê"
          field="user"
          displayField="user_name"
          valueField="user_id"
          :max-length="255"
          :combobox-data="userNotRenting"
          :value="model.user_id"
          :has-label="true"
          :is-required="true"
          :isShowComboboxDataTitle="false"
          @update-combobox="updateCombobox"
        ></ComboboxDetail>
        <button class="add-user" @click="showUserDetail">
          <div class="icon icon--plus-black w-10 h-10 center"></div>
        </button>
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
    </div>
  </Popup>
</template>
    
    <script>
// Components
import Popup from "@/components/base/popup/VPopup.vue";
import Input from "@/components/base/input/Input.vue";
import ComboboxDetail from "@/components/base/combobox/ComboboxDetail.vue";
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
  emits: ["show-user-detail"],
  setup(props) {
    const rentingDetail = useRentingDetail(props);
    return rentingDetail;
  },
};
</script>
    
<style lang="scss">
@import "./rentingDetail.scss";
</style>