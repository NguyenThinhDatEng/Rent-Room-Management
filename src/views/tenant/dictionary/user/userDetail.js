import { getCurrentInstance, onMounted, computed } from "vue";
// Resources
import Enum from "@/commons/enum";

export const useUserDetail = (props) => {
  const { proxy } = getCurrentInstance();
  // config by base
  const itemsName = "allUsers";
  const dispatchList = ["setAllUsers"];
  const controllerName = "Users";
  // key
  const key = "user_id";
  const name = "user_name";
  // mode
  const mode = props.popupMode;

  // data
  onMounted(() => {
    // const me = proxy;
  });

  const popupTitle = computed(() => {
    if (proxy.$props.mode == Enum.Mode.Update) {
      return "Sửa " + proxy.$props.title;
    } else {
      return "Thêm " + proxy.$props.title;
    }
  });

  return {
    key,
    name,
    mode,
    itemsName,
    dispatchList,
    popupTitle,
    controllerName,
  };
};
