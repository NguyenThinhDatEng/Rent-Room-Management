// store
import { useStore } from "vuex";
// api
import roomAPI from "@/apis/dictionary/roomAPI";
import rentingAPI from "@/apis/action/rentingAPI";
import userAPI from "@/apis/dictionary/userAPI";
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
      mode: 0,
      model: {},
      name: "",
      isShowPopup: false,
      dispatchList: [],
      itemsName: "",
      controllerName: "Rooms",
    };
  },
  computed: {
    store() {
      return useStore();
    },
    items() {
      return this.store.state[this.itemsName];
    },
    api() {
      switch (this.controllerName) {
        case "Rooms":
          return roomAPI;
        case "Rentings":
          return rentingAPI;
        case "Users":
          return userAPI;
        default:
          break;
      }
    },
  },
  emits: ["close"],
  created() {
    this.dispatchList.forEach((action) => {
      this.store.dispatch(action);
    });
  },
  mounted() {
    window._detail = this;
  },
  methods: {
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

    /**
     * @description Đóng popup
     * @author nvthinh 15.9.2023
     */
    close() {
      this.$emit("close");
    },
  },
};
