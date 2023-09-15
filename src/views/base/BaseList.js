// store
import { useStore } from "vuex";
// resources
import Enum from "@/commons/enum";
// api
import roomAPI from "@/apis/dictionary/roomAPI";
import rentingAPI from "@/apis/action/rentingAPI";

export default {
  name: "BaseList",
  props: {},
  data() {
    return {
      key: "",
      name: "",
      isShowPopup: false,
      detailData: {},
      popupMode: 0,
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
        default:
          break;
      }
    },
  },
  created() {
    this.dispatchList.forEach((action) => {
      this.store.dispatch(action);
    });
  },
  mounted() {
    window._list = this;
  },
  methods: {
    add() {
      this.popupMode = Enum.Mode.Add;
      this.showPopup();
    },

    async clickGridAction(mode, entity) {
      this.detailData = entity;
      if (mode === Enum.Mode.Delete) {
        const res = await this.deleteAsync(entity[this.key]);
        // update store
        if (res) {
          this.store.dispatch(this.dispatchList[0]);
        }
      } else {
        this.popupMode = Enum.Mode.Update;
        this.showPopup();
      }
    },

    async deleteAsync(id) {
      try {
        const res = await this.api.deleteAsync(id);
        return res;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Hiển thị popup
     * @author NVThinh 14.09.2023
     */
    showPopup() {
      this.isShowPopup = true;
    },

    /**
     * @description Đóng popup
     * @author NVThinh 05.09.2023
     */
    closePopup() {
      this.isShowPopup = false;
    },
  },
};
