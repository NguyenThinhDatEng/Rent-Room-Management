<template>
  <Popup
    class="payment-detail"
    title="Thanh toán"
    :width="500"
    @close-popup="close"
    @on-save="save"
  >
    <div class="popup__body__wrapper">
      <div class="row-detail mb-2">
        <label>Phòng:</label>
        <div>{{ model.room_name }}</div>
      </div>
      <div class="row-detail mb-2">
        <label>Giá phòng:</label>
        <div>{{ numeral(model.price).format("0,0") }}</div>
      </div>
      <div class="row-detail mb-2">
        <label>Số tiền thanh toán:</label>
        <Input
          field="payment"
          mask="decimal"
          :max-length="22"
          :hasLabel="false"
          v-model="model.payment"
        ></Input>
      </div>
      <div class="row-detail mb-2">
        <label>Số tiền thanh toán:</label>
        <Input
          field="remaining"
          mask="decimal"
          :max-length="22"
          :hasLabel="false"
          v-model="model.remaining"
          :isDisabled="true"
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
import { usePaymentDetail } from "./paymentDetail";
// base
import BaseDetail from "@/views/base/BaseDetail";

export default {
  name: "PaymentDetail",
  extends: BaseDetail,
  components: {
    Popup,
    Input,
  },
  props: {
    /**
     * data of popup
     */
    entity: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    const paymentDetail = usePaymentDetail();
    return paymentDetail;
  },
};
</script>
    
<style lang="scss">
@import "./paymentDetail.scss";
</style>