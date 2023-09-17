<template>
  <Popup :title="popupTitle" @close-popup="close" @on-save="save">
    <div class="popup__body__wrapper">
      <div class="row"></div>
      <div class="row"></div>
    </div>
  </Popup>
</template>
    
    <script>
// Components
import Popup from "@/components/base/popup/VPopup.vue";
// import Input from "@/components/base/input/Input.vue";
// Resources
import { useUserDetail } from "./userDetail";
// base
import BaseDetail from "@/views/base/BaseDetail";

export default {
  name: "UserDetail",
  extends: BaseDetail,
  components: {
    Popup,
    // Input,
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
    const userDetail = useUserDetail(props);
    return userDetail;
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