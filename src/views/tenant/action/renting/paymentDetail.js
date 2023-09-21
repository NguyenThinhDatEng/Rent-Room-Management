// Libraries
import numeral from "numeral"; // http://numeraljs.com/
import { computed, getCurrentInstance, ref } from "vue";
// Resources
import fn from "@/commons/commonFunction";
// api
import rentingAPI from "@/apis/action/rentingAPI";
// store
import { useStore } from "vuex";

export const usePaymentDetail = () => {
  const { proxy } = getCurrentInstance();
  const store = useStore();

  const amountPaid = ref(0);
  /**
   * Số tiền còn lại
   */
  const remaining = computed(() => {
    const me = proxy;
    let payment = 0;
    if (typeof amountPaid.value != "number") {
      payment = fn.removeSpecialCharacters(amountPaid.value);
    }
    return me.model.price - Number(payment);
  });

  /**
   * @override
   * @description Cấu hình theo base
   * @author nvthinh 17.9.2023
   */
  const initConfig = () => {
    const me = proxy;
    me.defaultData = {
      payment: 0,
    };
  };

  const beforeBinding = () => {
    amountPaid.value = proxy.model.amount_paid;
  };

  /**
   * @override
   * @description Thực hiện lưu
   * @returns
   * @author nvthinh 9.2023
   */
  const save = async () => {
    const me = proxy;
    try {
      // Get amount paid
      amountPaid.value = Number(fn.removeSpecialCharacters(amountPaid.value));
      if (amountPaid.value <= 0) {
        return;
      }
      // call api
      const res = await rentingAPI.pay({
        renting_id: me.model.renting_id,
        amount_paid: amountPaid.value,
      });
      if (res.data) {
        me.store.dispatch("setAllRenting");
      }
    } catch (error) {
      console.log(error);
    } finally {
      me.close();
    }
  };

  return {
    numeral,
    initConfig,
    remaining,
    save,
    amountPaid,
    beforeBinding,
    store,
  };
};
