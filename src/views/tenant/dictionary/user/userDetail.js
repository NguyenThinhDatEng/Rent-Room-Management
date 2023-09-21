import { getCurrentInstance } from "vue";
// resource
import commonFunction from "@/commons/commonFunction";

export const useUserDetail = () => {
  const { proxy } = getCurrentInstance();

  /**
   * @override
   * @author nvthinh 17.9.2023
   */
  const initConfig = () => {
    const me = proxy;
    // init
    me.key = "user_id";
    me.name = "user_name";
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

  const beforeSave = () => {
    const me = proxy;
    me.model.phone_number = commonFunction.removeSpecialCharacters(
      me.model.phone_number
    );
  };

  return {
    initConfig,
    beforeSave,
  };
};
