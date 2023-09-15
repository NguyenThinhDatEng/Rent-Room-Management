import { getCurrentInstance, onMounted, reactive, computed } from "vue";
// api
import serviceCategoryAPI from "@/apis/dictionary/serviceCategoryAPI";
import fn from "@/commons/commonFunction";
// store
import { useStore } from "vuex";
// Resources
import Enum from "@/commons/enum";

export const useServiceCategoryDetail = (props) => {
  const { proxy } = getCurrentInstance();
  // store
  const store = useStore();
  // key
  const key = "service_category_id";
  const name = "service_category_name";

  const add = async () => {
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
        res = await serviceCategoryAPI.postAsync(payload);
        // update store
        if (res.data) {
          store.state.allServiceCategories = [
            res.data,
            ...store.state.allServiceCategories,
          ];
        }
      } else {
        res = await serviceCategoryAPI.putAsync(model);
        // update store
        if (res.data) {
          store.dispatch("setAllServiceCategories");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      close();
    }
  };

  const validateRequire = () => {
    if (model.service_category_name == "") {
      return false;
    }
    return true;
  };

  const close = () => {
    proxy.$parent.close();
  };

  // data
  const model = reactive({});
  onMounted(() => {
    model[key] = props.entity[key];
    model.service_category_name = props.entity[name];
  });

  const popupTitle = computed(() => {
    if (proxy.$props.mode == Enum.Mode.Update) {
      return "Sửa " + proxy.$props.title;
    } else {
      return "Thêm " + proxy.$props.title;
    }
  });

  return { add, model, close, popupTitle };
};
