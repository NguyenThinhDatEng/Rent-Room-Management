import { getCurrentInstance, onMounted, computed } from "vue";
// Resources
import Enum from "@/commons/enum";
// resources
import fn from "@/commons/commonFunction";

export const useRentingDetail = (props) => {
  const { proxy } = getCurrentInstance();
  // cofig to base
  const controllerName = "Rentings";
  const dispatchList = ["setAllRenting"];
  // key
  const key = "renting_id";
  // filter users
  const userNotRenting = computed(() => {
    return proxy.store.state.allUsers.filter((item) => item.is_renting == 0);
  });

  const popupTitle = computed(() => {
    if (proxy.$props.mode == Enum.Mode.Update) {
      return "Sửa " + proxy.$props.title;
    } else {
      return "Thêm " + proxy.$props.title;
    }
  });

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
    me.model[key] = props.entity[key];
    // room
    me.model.room_id = me.store.state.allRooms[0]?.room_id;
    me.model.room_name = me.store.state.allRooms[0]?.room_name;
    // user
    me.model.user_id = userNotRenting.value[0]?.user_id;
    me.model.user_name = userNotRenting.value[0]?.user_name;
  });

  return {
    popupTitle,
    updateCombobox,
    controllerName,
    beforeSave,
    key,
    userNotRenting,
    dispatchList,
  };
};
