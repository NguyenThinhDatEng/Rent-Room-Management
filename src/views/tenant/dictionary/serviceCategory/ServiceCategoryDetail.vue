<template>
  <Popup :title="popupTitle" @close-popup="close" @on-save="save">
    <div class="popup__body__wrapper">
      <div class="room-category_name">
        <Input
          label="Tên dịch vụ"
          placeholder="Tên dịch vụ"
          field="service_category_name"
          :max-length="255"
          :hasLabel="true"
          v-model="model.service_category_name"
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
import { useServiceCategoryDetail } from "./serviceCategoryDetail";
// base
import BaseDetail from "@/views/base/BaseDetail";

export default {
  name: "RoomCategoryDetail",
  extends: BaseDetail,
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
          service_category_id: "",
          service_category_name: "",
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
    const serviceCategoryDetail = useServiceCategoryDetail();
    return serviceCategoryDetail;
  },
};
</script>
    
<style scoped>
@import "../detail.css";
</style>