import { getCurrentInstance, onMounted } from "vue";
// Resources
import Enum from "@/commons/enum";

export const useServiceCategoryDetail = () => {
  const { proxy } = getCurrentInstance();

  /**
   * @override
   * @author nvthinh 17.9.2023
   */
  const initConfig = () => {
    const me = proxy;
    // init
    me.key = "service_category_id";
    me.name = "service_category_name";
    me.controllerName = "ServiceCategories";
    me.dispatchList = ["setAllServiceCategories"];
    me.itemsName = "allServiceCategories";
  };

  const validateRequire = () => {
    const me = proxy;
    if (me.model.service_category_name == "") {
      return false;
    }
    return true;
  };

  onMounted(() => {
    const me = proxy;
    if (me.mode == Enum.Mode.Add) {
      me.model.service_category_name = "";
    } else {
      me.model[me.key] = me.entity[me.key];
      me.model.service_category_name = me.entity[me.name];
    }
  });

  return { initConfig, validateRequire };
};
