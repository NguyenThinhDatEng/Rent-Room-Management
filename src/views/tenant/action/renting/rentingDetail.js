import { getCurrentInstance, onMounted, reactive, computed } from "vue";
// api
import roomAPI from "@/apis/dictionary/roomAPI";
// Resources
import Enum from "@/commons/enum";
import fn from "@/commons/commonFunction";

export const useRentingDetail = (props) => {
  const { proxy } = getCurrentInstance();
  // cofig to base
  const controllerName = "Rentings";
  // Dữ liệu combobox
  const rooms = computed(() => {
    return proxy.store.state.allRooms.filter((item) => {
      return item.state == true;
    });
  });
  // key
  const key = "renting_id";

  const add = async () => {
    const me = proxy;

    if (!validateRequire()) {
      return;
    }
    try {
      let res = null;
      let payload = {
        ...model,
      };
      payload[key] = fn.uuidv4();
      // call api
      if (props.mode == Enum.Mode.Add) {
        res = await roomAPI.postAsync(payload);
        // update store
        if (res.data) {
          me.store.dispatch("setAllRenting");
        }
      } else {
        res = await roomAPI.putAsync(model);
        // update store
        if (res.data) {
          me.store.dispatch("setAllRenting");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.close();
    }
  };

  const validateRequire = () => {
    if (model.service_category_name == "") {
      return false;
    }
    return true;
  };

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
    data.forEach((element) => {
      model[element.field] = element.value;
    });
  };

  // data
  const model = reactive({});
  onMounted(() => {
    const me = proxy;
    // update model
    model[key] = props.entity[key];
    // room
    model.room_id = rooms.value[0]?.room_id;
    model.room_name = rooms.value[0]?.room_name;
    // init room category for model
    model.room_category_id =
      me.store.state.allRoomCategories[0]?.room_category_id;
    model.room_category_name =
      me.store.state.allRoomCategories[0]?.room_category_name;
    // update trạng thái
    model.state = true;
  });

  return { add, model, popupTitle, rooms, updateCombobox, controllerName };
};
