import { getCurrentInstance, onMounted, reactive } from "vue";
// api
import roomCategoryAPI from "@/apis/dictionary/roomCategoryAPI";
import fn from "@/commons/commonFunction";
// store
import { useStore } from "vuex";
// Resources
import Enum from "@/commons/enum";

export const useRoomCategoryDetail = (props) => {
  const { proxy } = getCurrentInstance();
  // store
  const store = useStore();

  const add = async () => {
    if (!validateRequire()) {
      return;
    }
    try {
      let res = null;
      // call api
      if (props.mode == Enum.Mode.Add) {
        res = await roomCategoryAPI.postAsync({
          ...model,
          room_category_id: fn.uuidv4(),
        });
        // update store
        if (res.data) {
          const roomCategoriesList = store.state.allRoomCategories;
          store.state.allRoomCategories = [res.data, ...roomCategoriesList];
        }
      } else {
        res = await roomCategoryAPI.putAsync(model);
        // update store
        if (res.data) {
          store.dispatch("setAllRoomCategories");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      close();
    }
  };

  const validateRequire = () => {
    if (model.room_category_name == "") {
      return false;
    }

    if (typeof model.unit_price === "string") {
      const unitPrice = fn.removeSpecialCharacters(model.unit_price);
      model.unit_price = Number(unitPrice);

      if (model.unit_price <= 0) {
        return false;
      }
    }

    return true;
  };

  const close = () => {
    proxy.$parent.close();
  };

  // data
  const model = reactive({});
  onMounted(() => {
    if (proxy.mode == Enum.Mode.Add) {
      model.room_category_id = "";
      model.room_category_name = "";
      model.unit_price = 0;
    } else {
      model.room_category_id = props.entity?.room_category_id || "";
      model.room_category_name = props.entity?.room_category_name || "";
      model.unit_price = props.entity?.unit_price || 0;
    }
  });

  return { add, model, close };
};
