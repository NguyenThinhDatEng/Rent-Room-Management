import { getCurrentInstance, onMounted, computed, reactive, ref } from "vue";
// Resources
import Enum from "@/commons/enum";
import TableResource from "@/commons/resource/tableResource";
// resources
import fn from "@/commons/commonFunction";
import moment from "moment";
// api
import rentingAPI from "@/apis/action/rentingAPI";

export const useRentingDetail = () => {
  const { proxy } = getCurrentInstance();

  // filter users
  const userNotRenting = computed(() => {
    const users = proxy.store.state.allUsers.filter(
      (item) => item.is_renting == 0
    );
    return [...users, ...deletedUsers];
  });

  // filter rooms (is empty)
  const roomItems = computed(() => {
    const rooms = proxy.store.state.allRooms.filter((item) => item.state);
    return proxy.mode == Enum.Mode.Add ? rooms : proxy.store.state.allRooms;
  });

  /**
   * @override
   * @description Cấu hình theo base
   * @author nvthinh 17.9.2023
   */
  const initConfig = () => {
    const me = proxy;
    // init
    me.key = "renting_id";
    me.controllerName = "Rentings";
    me.dispatchList = ["setAllRenting"];
    // get next month
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    );
    me.defaultData = {
      room_rental_date: moment(currentDate).format("DD/MM/YYYY"),
      check_out_date: moment(futureDate).format("DD/MM/YYYY"),
    };
  };

  /**
   * @description Cập nhật dữ liệu khi combobox thay đổi
   * @author NVThinh 08/09/2023
   */
  const updateCombobox = (data) => {
    const me = proxy;
    data.forEach((element) => {
      me.model[element.field] = element.value;
    });
  };

  const userIds = reactive([]);
  /**
   * @override
   * @description Xử lý sự kiện trước khi lưu
   * @author nvthinh 9.2023
   */
  const beforeSave = () => {
    const me = proxy;
    // convert string to Date
    me.model.room_rental_date = convertToDate(me.model.room_rental_date);
    me.model.check_out_date = convertToDate(me.model.check_out_date);
    // Cập nhật số tiền cọc
    if (typeof me.model.deposit === "string") {
      const tmp = fn.removeSpecialCharacters(me.model.deposit);
      me.model.deposit = Number(tmp);
    }
    // Cập nhật Giá phòng
    if (typeof me.model.price === "string") {
      const tmp = fn.removeSpecialCharacters(me.model.price);
      me.model.price = Number(tmp);
    }
    if (me.mode == Enum.Mode.Update) {
      // Cập nhật các bản ghi được thêm mới
      me.items.forEach((item) => {
        const isAdd = !oldItems.value.some(
          (ele) => ele.user_id == item.user_id
        );
        if (isAdd) {
          userIds.push({ id: item.user_id, tag: 1 });
        }
      });
      // Cập nhật các bản ghi bị xóa đi
      oldItems.value.forEach((item) => {
        const isDelete = !me.items.some((ele) => ele.user_id == item.user_id);
        if (isDelete) {
          userIds.push({ id: item.user_id, tag: -1 });
        }
      });
    }
  };

  /**
   * Convert 'dd/mm/yyyy' to date type
   * @param {String} dateString
   * @returns
   * @author nvthinh 9.2023
   */
  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const date = new Date(year, month - 1, day);
    return date;
  };

  //#region Config table
  const cols = {
    numerical_order: { ENG: "numerical_order", VN: "STT" },
    user_name: { ENG: "user_name", VN: "Họ và tên" },
    gender: { ENG: "gender", VN: "Giới tính" },
    phone_number: { ENG: "phone_number", VN: "Số điện thoại" },
    identifier_number: { ENG: "identifier_number", VN: "CMND/CCCD" },
    feature: { ENG: "feature", VN: "Tính năng" },
  };
  const tds = [
    {
      col: TableResource.TableRow.FixedAsset.numerical_order.ENG,
      type: Enum.TableData.type.text,
      minWidth: "40px",
      width: "50px",
      align: "center",
    },
    {
      col: "user_name",
      type: Enum.TableData.type.text,
      minWidth: "90px",
      maxWidth: "180px",
      align: "left",
    },
    {
      col: "gender",
      type: Enum.TableData.type.enum,
      width: "100px",
      align: "center",
      enumName: "Gender",
    },
    {
      col: "phone_number",
      type: Enum.TableData.type.text,
      minWidth: "90px",
      maxWidth: "180px",
      align: "left",
    },
    {
      col: "identifier_number",
      type: Enum.TableData.type.text,
      minWidth: "90px",
      maxWidth: "180px",
      align: "left",
    },
    {
      col: TableResource.TableRow.FixedAsset.feature.ENG,
      minWidth: "120px",
      width: "120px",
    },
  ];
  //#endregion

  onMounted(() => {
    const me = proxy;
    if (me.mode === Enum.Mode.Update) {
      // Get users of contract
      const userIds = me.store.state.allRenting.map((item) => {
        if (item.renting_id === me.model.renting_id) {
          return item.user_id;
        }
      });
      // Get data for table
      me.items = me.store.state.allUsers.filter((user) => {
        if (userIds.includes(user.user_id)) {
          return user;
        }
      });
    }
  });

  /**
   * @description Xử lý sự kiện chọn phòng
   * @param {*} data
   * @param {*} field
   */
  const selectRoom = (data) => {
    const me = proxy;
    // update model
    me.model.room_id = data.room_id;
    // Update price contract
    const roomCategory = me.store.state.allRoomCategories.find(
      (item) => item.room_category_id === data.room_category_id
    );
    if (roomCategory) {
      me.model.price = roomCategory.unit_price;
      me.model.deposit = roomCategory.unit_price;
    }
  };

  /**
   * @description Xử lý sự kiện chọn người dùng
   * @param {*} data
   * @param {*} field
   */
  const selectUser = (data) => {
    const me = proxy;
    // update model
    if (me.mode == Enum.Mode.Add) {
      me.model.user_id = data.user_id;
    } else {
      const user = me.items.find((item) => item.user_id === data.user_id);
      if (!user) {
        me.items.push(data);
      }
    }
  };

  const oldItems = ref([]);
  /**
   * @description Cập nhật trước khi bind dữ liệu
   * @author nvthinh 9.2023
   */
  const beforeBinding = async () => {
    const me = proxy;

    if (me.mode == Enum.Mode.Update) {
      // Update ngày thuê phòng
      me.model.room_rental_date = moment(me.model.room_rental_date).format(
        "DD/MM/YYYY"
      );
      // Get data to table
      const res = await rentingAPI.GetRentingUsers({
        renting_id: me.model.renting_id,
      });
      if (res.status == Enum.API.OK) {
        oldItems.value = [...res.data];
        me.items = res.data;
      }
    }
  };

  const userLabel = computed(() => {
    return proxy.$props.mode == Enum.Mode.Add
      ? "Người thuê"
      : "Thêm người thuê";
  });

  const deletedUsers = reactive([]);
  /**
   * @description Thực hiện khi nhấn nút trong cột chức năng
   * @param {Number, String} mode
   * @param {Object} entity
   * @author nvthinh 20.9.2023
   */
  const clickGridAction = (mode, entity) => {
    const me = proxy;
    if (mode === Enum.Mode.Delete) {
      // Update table data
      me.items = me.items.filter((item) => item.user_id !== entity.user_id);
      // Update combobox data
      deletedUsers.push(entity);
    }
  };

  const save = async () => {
    const me = proxy;

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
        const userIdsString = JSON.stringify(userIds);
        res = await me.api.putCustomAsync(me.model, userIdsString);
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
  };

  /**
   * @description validate before save
   * @returns {Bool}
   * @author nvthinh 9.2023
   */
  const validateRequire = () => {
    const me = proxy;

    if (me.mode == Enum.Mode.Update) {
      if (me.items.length == 0) {
        return false;
      }
    }

    return true;
  };

  return {
    updateCombobox,
    initConfig,
    beforeSave,
    userNotRenting,
    Enum,
    cols,
    tds,
    selectRoom,
    beforeBinding,
    userLabel,
    clickGridAction,
    deletedUsers,
    selectUser,
    roomItems,
    oldItems,
    save,
    validateRequire,
  };
};
