import { getCurrentInstance, onMounted, computed } from "vue";
// Resources
import Enum from "@/commons/enum";

export const useUserDetail = () => {
  const { proxy } = getCurrentInstance();

  const popupTitle = computed(() => {
    if (proxy.$props.popupMode == Enum.Mode.Update) {
      return "Sửa " + proxy.$props.title;
    } else {
      return "Thêm " + proxy.$props.title;
    }
  });

  /**
   * @override
   * @author nvthinh 17.9.2023
   */
  const initConfig = () => {
    const me = proxy;
    // init
    me.key = "user_id";
    me.name = "user_name";
    me.itemsName = "allUsers";
    me.controllerName = "Users";
    me.dispatchList = ["setAllUsers"];
    me.defaultData = {
      user_id: "",
      user_name: "",
      gender: 1,
      phone_number: "",
      identifier_number: "",
    };
  };

  // data
  onMounted(() => {
    const me = proxy;
    // update model
    if (me.popupMode == Enum.Mode.Update) {
      me.model = me.$props.entity;
    } else {
      me.model = me.defaultData;
    }
  });

  return {
    popupTitle,
    initConfig,
  };
};
