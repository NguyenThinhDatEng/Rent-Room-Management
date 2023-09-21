// store
import { useStore } from "vuex";
// api
import roomAPI from "@/apis/dictionary/roomAPI";
import rentingAPI from "@/apis/action/rentingAPI";
import userAPI from "@/apis/dictionary/userAPI";
import serviceCategoryAPI from "@/apis/dictionary/serviceCategoryAPI";
// resources
import fn from "@/commons/commonFunction";
// resources
import Enum from "@/commons/enum";

export default {
  name: "BaseDetail",
  props: {},
  data() {
    return {
      key: "",
      name: "",
      model: {},
      defaultData: {},
      isShowPopup: false,
      dispatchList: [],
      itemsName: "",
      controllerName: "",
      items: [], // Dữ liệu của bảng
    };
  },
  computed: {
    store() {
      return useStore();
    },
    api() {
      switch (this.controllerName) {
        case "Rooms":
          return roomAPI;
        case "Rentings":
          return rentingAPI;
        case "Users":
          return userAPI;
        case "ServiceCategories":
          return serviceCategoryAPI;
        default:
          break;
      }
    },
    popupTitle() {
      const me = this;
      if (me.mode == Enum.Mode.Update) {
        return "Sửa " + me.title;
      } else {
        return "Thêm " + me.title;
      }
    },
  },
  emits: ["close"],
  created() {
    const me = this;

    me.initConfig();

    if (me.mode == Enum.Mode.Add) {
      me.model = me.defaultData;
    } else {
      me.model = me.entity;
    }

    this.dispatchList.forEach((action) => {
      this.store.dispatch(action);
    });
    me.beforeBinding();
  },
  mounted() {
    const me = this;
    window._detail = me;
  },

  unmounted() {},

  methods: {
    /**
     * @description Khởi tạo cấu hình cho detail
     * @author nvthinh 17.9.2023
     */
    initConfig() {},

    /**
     * @description Thực hiện lưu
     * @returns
     * @author nvthinh 9.2023
     */
    async save() {
      const me = this;

      if (!me.validateRequire()) {
        return;
      }

      me.beforeSave();
      try {
        let res = null;
        let payload = {
          ...me.model,
        };
        payload[me.key] = fn.uuidv4();
        // call api
        if (me.mode == Enum.Mode.Add) {
          res = await me.api.postAsync(payload);
          // update store
          if (res.data && me.dispatchList[0]) {
            me.store.dispatch(me.dispatchList[0]);
          }
        } else {
          res = await me.api.putAsync(me.model);
          // update store
          if (res.data && me.dispatchList[0]) {
            me.store.dispatch(me.dispatchList[0]);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        me.close();
      }
    },

    validateRequire() {
      return true;
    },

    beforeSave() {},

    beforeBinding() {},

    /**
     * @description Đóng popup
     * @author nvthinh 15.9.2023
     */
    close() {
      const me = this;
      // emit sự kiện
      me.$emit("close");
    },
  },
};
