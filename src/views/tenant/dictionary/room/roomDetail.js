import { getCurrentInstance, onMounted, computed } from "vue";

export const useRoomDetail = (props) => {
  const { proxy } = getCurrentInstance();

  /**
   * @override
   * @author nvthinh 17.9.2023
   */
  const initConfig = () => {
    const me = proxy;
    // init
    me.key = "room_id";
    me.name = "room_name";
    me.controllerName = "Rooms";
    me.itemsName = "allRooms";
    me.dispatchList = ["setAllRooms"];
  };

  // get data from store
  const roomCategories = computed(() => {
    return proxy.store.state.allRoomCategories;
  });

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
    me.model[me.key] = props.entity[me.key];
    me.model[me.name] = props.entity[me.name];
    // init room category for model
    me.model.room_category_id =
      me.store.state.allRoomCategories[0]?.room_category_id;
    me.model.room_category_name =
      me.store.state.allRoomCategories[0]?.room_category_name;
    // update trạng thái
    me.model.state = true;
  });

  /**
   * @description Cập nhật dữ liệu khi combobox thay đổi
   * @author NVThinh 08.09.2023
   */
  const updateCombobox = (data) => {
    const me = proxy;

    data.forEach((element) => {
      me.model[element.field] = element.value;
    });
  };

  return {
    roomCategories,
    updateCombobox,
    validateRequire,
    initConfig,
  };
};
