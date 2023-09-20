import { getCurrentInstance, onMounted, computed } from "vue";
// Resources
import Enum from "@/commons/enum";
// resources
import fn from "@/commons/commonFunction";
import moment from "moment";

export const useRentingDetail = (props) => {
  const { proxy } = getCurrentInstance();

  // filter users
  const userNotRenting = computed(() => {
    return proxy.store.state.allUsers.filter((item) => item.is_renting == 0);
  });

  /**
   * @override
   * @description Cấu hình theo base
   * @author nvthinh 17.9.2023
   */
  const initConfig = () => {
    const me = proxy;
    // init
    me.key = "renting_id";
    me.controllerName = "Rentings";
    me.dispatchList = ["setAllRenting"];

    me.defaultData = {
      room_rental_date: moment(new Date()).format("DD/MM/YYYY"),
    };
  };

  /**
   * @description Cập nhật dữ liệu khi combobox thay đổi
   * @author NVThinh 08/09/2023
   */
  const updateCombobox = (data) => {
    const me = proxy;
    data.forEach((element) => {
      me.model[element.field] = element.value;
    });
  };

  const beforeSave = () => {
    const me = proxy;
    // convert string to Date
    me.model.room_rental_date = new Date(me.model.room_rental_date);
    // Cập nhật số tiền cọc
    if (typeof me.model.deposit === "string") {
      const tmp = fn.removeSpecialCharacters(me.model.deposit);
      me.model.deposit = Number(tmp);
    }
  };

  onMounted(() => {
    const me = proxy;
    // update model
    me.model[me.key] = props.entity[me.key];
  });

  return {
    updateCombobox,
    initConfig,
    beforeSave,
    userNotRenting,
    Enum,
  };
};
