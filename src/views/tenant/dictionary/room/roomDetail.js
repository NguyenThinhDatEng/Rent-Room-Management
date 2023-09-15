import { getCurrentInstance, onMounted, computed } from "vue";
// Resources
import Enum from "@/commons/enum";

export const useRoomDetail = (props) => {
  const { proxy } = getCurrentInstance();
  // config by base
  const itemsName = "allRooms";
  const dispatchList = ["setAllRooms"];
  // get data from store
  const roomCategories = computed(() => {
    return proxy.store.state.allRoomCategories;
  });
  // key
  const key = "room_id";
  const name = "room_name";
  // mode
  const mode = props.popupMode;

  const validateRequire = () => {
    const me = proxy;
    if (me.model.service_category_name == "") {
      return false;
    }
    return true;
  };

  // data
  onMounted(() => {
    const me = proxy;
    // update model
    me.model[key] = props.entity[key];
    me.model[name] = props.entity[name];
    // init room category for model
    me.model.room_category_id =
      me.store.state.allRoomCategories[0]?.room_category_id;
    me.model.room_category_name =
      me.store.state.allRoomCategories[0]?.room_category_name;
    // update trạng thái
    me.model.state = true;
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

  return {
    mode,
    key,
    itemsName,
    dispatchList,
    popupTitle,
    roomCategories,
    updateCombobox,
    validateRequire,
  };
};
