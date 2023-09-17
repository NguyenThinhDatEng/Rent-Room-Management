<template>
  <Popup
    class="user-detail"
    :title="popupTitle"
    @close-popup="close"
    @on-save="save"
  >
    <div class="popup__body__wrapper">
      <div class="row">
        <Input
          label="Tên người thuê"
          placeholder="Nguyễn Văn A"
          field="user_name"
          :max-length="255"
          :hasLabel="true"
          v-model="model.user_name"
        ></Input>
      </div>
      <div class="row">
        <Input
          mask="phone"
          label="Số điện thoại"
          placeholder="0123456789"
          field="phone_number"
          :max-length="14"
          :hasLabel="true"
          v-model="model.phone_number"
          class="flex"
        ></Input>
        <!-- Gender -->
        <div class="gender flex flex-column">
          <label for="gender">Giới tính</label>
          <fieldset id="gender">
            <div class="field-row">
              <input
                id="male"
                type="radio"
                :value="1"
                name="gender"
                v-model="model.gender"
              />
              <label for="male">Nam</label>
            </div>
            <div class="field-row">
              <input
                id="female"
                type="radio"
                :value="2"
                name="gender"
                v-model="model.gender"
              />
              <label for="female">Nữ</label>
            </div>
            <div class="field-row">
              <input
                id="others"
                type="radio"
                :value="0"
                name="gender"
                v-model="model.gender"
              />
              <label for="others">Khác</label>
            </div>
          </fieldset>
        </div>
      </div>
      <!-- Số CCCD -->
      <div class="row">
        <Input
          label="Số CMND/CCCD"
          placeholder="0272123456789"
          field="identifier_number"
          :max-length="100"
          :hasLabel="true"
          v-model="model.identifier_number"
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
import { useUserDetail } from "./userDetail";
// base
import BaseDetail from "@/views/base/BaseDetail";

export default {
  name: "UserDetail",
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
        return {};
      },
    },
    /**
     * mode of popup
     */
    popupMode: {
      type: Number,
    },
  },
  setup() {
    const userDetail = useUserDetail();
    return userDetail;
  },
};
</script>
    
<style lang="scss">
@import "./userDetail.scss";
</style>