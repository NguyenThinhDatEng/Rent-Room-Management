<template>
  <Popup :title="title" @close-popup="close" @on-save="add">
    <div class="popup__body__wrapper">
      <div class="room-category_name">
        <Input
          label="Tên loại phòng"
          placeholder="Tên loại phòng"
          field="room_category_name"
          :max-length="255"
          :hasLabel="true"
          v-model="model.room_category_name"
        ></Input>
      </div>
      <div class="room-category_price">
        <Input
          label="Đơn giá"
          placeholder="100000"
          field="unit_price"
          :hasLabel="true"
          mask="decimal"
          :max-length="22"
          v-model="model.unit_price"
        ></Input>
      </div>
    </div>
  </Popup>
</template>
    
    <script>
// Components
import Popup from "@/components/base/popup/VPopup.vue";
import Input from "@/components/base/input/Input.vue";
// Resources
import { useRoomCategoryDetail } from "./roomCategoryDetail.js";

export default {
  name: "RoomCategoryDetail",
  components: {
    Popup,
    Input,
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
          room_category_id: "",
          room_category_name: "",
          unit_price: 0,
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
    const roomCategoryDetail = useRoomCategoryDetail(props);
    return roomCategoryDetail;
  },

  data() {
    return {};
  },
};
</script>
    
<style scoped>
@import "../detail.css";
</style>