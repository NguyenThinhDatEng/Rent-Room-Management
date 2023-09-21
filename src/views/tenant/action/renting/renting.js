// libraries
import { getCurrentInstance, onMounted, ref } from "vue";
// Resources
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";

export const useRenting = () => {
  const { proxy } = getCurrentInstance();

  //#region Config table
  const cols = {
    numerical_order: { ENG: "numerical_order", VN: "STT" },
    room_name: { ENG: "room_name", VN: "Tên phòng" },
    quantity: { ENG: "quantity", VN: "Số khách hàng" },
    room_rental_date: { ENG: "room_rental_date", VN: "Ngày thuê" },
    price: { ENG: "price", VN: "Giá phòng" },
    deposit: { ENG: "deposit", VN: "Tiền cọc" },
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
      minWidth: "90px",
      maxWidth: "150px",
      align: "left",
    },
    {
      col: "quantity",
      type: Enum.TableData.type.number,
      width: "120px",
      align: "right",
    },
    {
      col: "room_rental_date",
      type: Enum.TableData.type.date,
      width: "200px",
      align: "center",
    },
    {
      col: "price",
      type: Enum.TableData.type.number,
      width: "150px",
      align: "right",
    },
    {
      col: "deposit",
      type: Enum.TableData.type.number,
      width: "150px",
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
  const clickGridActionCustom = (mode, entity) => {
    const me = proxy;
    me.detailData = entity;
    isShowPaymentDetail.value = true;
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
  };
};
