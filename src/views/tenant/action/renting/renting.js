// libraries
import { getCurrentInstance, onMounted, ref } from "vue";
// Resources
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";
// api
import rentingAPI from "@/apis/action/rentingAPI";

export const useRenting = () => {
  const { proxy } = getCurrentInstance();

  //#region Config table
  const cols = {
    numerical_order: { ENG: "numerical_order", VN: "STT" },
    room_name: { ENG: "room_name", VN: "Tên phòng" },
    quantity: { ENG: "quantity", VN: "Số KH" },
    room_rental_date: { ENG: "room_rental_date", VN: "Ngày thuê" },
    check_out_date: { ENG: "check_out_date", VN: "Ngày trả" },
    deposit: { ENG: "deposit", VN: "Tiền cọc" },
    price: { ENG: "price", VN: "Giá phòng" },
    amount_paid: { ENG: "amount_paid", VN: "Đã thanh toán" },
    remaining_amount: { ENG: "remaining_amount", VN: "Cần thanh toán" },
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
      col: "room_name",
      type: Enum.TableData.type.text,
      minWidth: "100px",
      maxWidth: "150px",
      align: "left",
    },
    {
      col: "quantity",
      type: Enum.TableData.type.number,
      width: "80px",
      align: "right",
    },
    {
      col: "room_rental_date",
      type: Enum.TableData.type.date,
      width: "120px",
      align: "center",
    },
    {
      col: "check_out_date",
      type: Enum.TableData.type.date,
      width: "120px",
      align: "center",
    },
    {
      col: "deposit",
      type: Enum.TableData.type.number,
      width: "120px",
      align: "right",
    },
    {
      col: "price",
      type: Enum.TableData.type.number,
      width: "120px",
      align: "right",
    },
    {
      col: "amount_paid",
      type: Enum.TableData.type.number,
      width: "120px",
      align: "right",
    },
    {
      col: "remaining_amount",
      type: Enum.TableData.type.number,
      width: "120px",
      align: "right",
    },
    {
      col: TableResource.TableRow.FixedAsset.feature.ENG,
      width: "180px",
    },
  ];
  //#endregion

  /**
   * @override
   * @author nvthinh 17.9.2023
   */
  const initConfig = () => {
    const me = proxy;
    // init
    me.key = "renting_id";
    me.controllerName = "Rentings";
    me.itemsName = "allRenting";
    me.dispatchList = [
      "setAllRenting",
      "setAllRooms",
      "setAllRoomCategories",
      "setAllUsers",
    ];
  };

  const isShowPaymentDetail = ref(false);
  /**
   * @override
   * @param {*} mode
   * @param {*} entity
   */
  const clickGridActionCustom = async (mode, entity) => {
    const me = proxy;
    if (mode == "Extend") {
      // old date
      const checkOutDate = entity.check_out_date
        ? new Date(entity.check_out_date)
        : new Date();
      // new date
      const newRoomRentalDate = new Date(
        checkOutDate.getFullYear(),
        checkOutDate.getMonth(),
        checkOutDate.getDate() + 1
      );
      const newCheckOutDate = new Date(
        checkOutDate.getFullYear(),
        checkOutDate.getMonth() + 1,
        checkOutDate.getDate() + 1
      );
      // call api
      const data = {
        ...entity,
        room_rental_date: newRoomRentalDate,
        check_out_date: newCheckOutDate,
        amount_paid: 0,
      };
      const res = await rentingAPI.postAsync(data);
      if (res.data) {
        me.store.dispatch(me.dispatchList[0]);
      }
    } else {
      me.detailData = entity;
      isShowPaymentDetail.value = true;
    }
  };

  const closePaymentDetail = () => {
    isShowPaymentDetail.value = false;
  };

  onMounted(() => {
    const me = proxy;
    me.model.keyWord = "";
  });

  return {
    cols,
    tds,
    TableResource,
    Resource,
    Enum,
    initConfig,
    clickGridActionCustom,
    isShowPaymentDetail,
    closePaymentDetail,
  };
};
