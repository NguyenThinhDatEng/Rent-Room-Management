<template>
  <Popup :title="popupTitle" @close-popup="close" @on-save="save">
    <div class="popup__body__wrapper">
      <div class="row room-category_name">
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
      <div class="row">
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
  setup(props) {
    const rentingDetail = useRentingDetail(props);
    return rentingDetail;
  },
};
</script>
    
<style scoped>
@import "./rentingDetail.css";

.row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 16px;
}

#state {
  margin-right: 8px;
}

.state {
  justify-content: center;
  align-items: center;
}
</style>@/views/base/BaseDetail.js