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
      detailData: {},
      model: {},
      isShowPopup: false,
      popupMode: 0,
      controllerName: "",
      dispatchList: [],
      itemsName: "",
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
    const me = this;

    me.initConfig();

    me.dispatchList.forEach((action) => {
      me.store.dispatch(action);
    });
  },
  mounted() {
    window._list = this;
  },
  methods: {
    /**
     * @description Khởi tạo cấu hình cho list
     * @author nvthinh 17.9.2023
     */
    initConfig() {},

    /**
     * @description Xử lý sự kiện ấn vào nút thêm mới
     * @author nvthinh 17.9.2023
     */
    add() {
      const me = this;
      // Cập nhật dữ liệu cho detail
      me.detailData = me.defaultDetailData;
      // Cập nhật mode popup
      me.popupMode = Enum.Mode.Add;
      // Hiển thị
      me.showPopup();
    },

    /**
     * @description Thực hiện khi nhấn nút trong cột chức năng
     * @param {Number, String} mode
     * @param {Object} entity
     * @author nvthinh 20.9.2023
     */
    async clickGridAction(mode, entity) {
      const me = this;

      me.detailData = entity;
      if (mode === Enum.Mode.Delete) {
        const res = await this.deleteAsync(entity[this.key]);
        // update store
        if (res) {
          this.refresh();
        }
      } else if (mode === Enum.Mode.Update) {
        this.popupMode = Enum.Mode.Update;
        this.showPopup();
      } else {
        me.clickGridActionCustom(mode, entity);
      }
    },

    /**
     * @description Thực thi nếu không phải chức năng mặc định
     * @author nvthinh 20.9.2023
     */
    clickGridActionCustom() {},

    /**
     * Load lại dữ liệu chính
     * @author nvthinh 19.9.2023
     */
    async refresh(config = {}) {
      this.store.dispatch(this.dispatchList[0], config);
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
