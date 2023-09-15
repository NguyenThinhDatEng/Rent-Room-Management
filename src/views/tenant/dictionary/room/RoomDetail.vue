<template>
  <Popup :title="popupTitle" @close-popup="close" @on-save="save">
    <div class="popup__body__wrapper">
      <div class="room-category_name">
        <Input
          label="Tên phòng"
          placeholder="Tên phòng"
          field="room_name"
          :max-length="255"
          :hasLabel="true"
          v-model="model.room_name"
        ></Input>
      </div>
      <div class="row">
        <div class="category flex">
          <ComboboxDetail
            label="Loại phòng"
            field="room_category"
            displayField="room_category_name"
            valueField="room_category_id"
            :max-length="255"
            :combobox-data="roomCategories"
            :value="model.room_category_id"
            :has-label="true"
            :is-required="true"
            :isShowComboboxDataTitle="false"
            @update-combobox="updateCombobox"
          ></ComboboxDetail>
        </div>
        <div class="state flex">
          <input type="checkbox" id="state" v-model="model.state" />
          <label for="state">Còn trống</label>
        </div>
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
import { useRoomDetail } from "./roomDetail.js";
// base
import BaseDetail from "@/views/base/BaseDetail";

export default {
  name: "RoomDetail",
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
    popupMode: {
      type: Number,
    },
  },
  setup(props) {
    const roomDetail = useRoomDetail(props);
    return roomDetail;
  },
};
</script>
    
<style scoped>
@import "../detail.css";

.room-category_name {
  margin-bottom: 16px;
}

.row {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

#state {
  margin-right: 8px;
}

.state {
  justify-content: center;
  align-items: center;
}
</style>@/views/base/BaseDetail.js