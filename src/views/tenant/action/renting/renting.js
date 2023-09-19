// libraries
import { getCurrentInstance } from "vue";
// Resources
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";

export const useRenting = () => {
  const { proxy } = getCurrentInstance();

  const cols = {
    numerical_order: { ENG: "numerical_order", VN: "STT" },
    room_name: { ENG: "room_name", VN: "Tên phòng" },
    user_name: { ENG: "user_name", VN: "Người thuê" },
    phone_number: { ENG: "renter_name", VN: "Số điện thoại" },
    identifier_number: { ENG: "identifier_number", VN: "CMND/CCCD" },
    room_rental_date: { ENG: "room_rental_date", VN: "Ngày thuê" },
    deposit: { ENG: "deposit", VN: "Tiền cọc" },
    feature: { ENG: "feature", VN: "Tính năng" },
    // room_category_name: { ENG: "room_category_name", VN: "Loại phòng" },
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
      maxWidth: "180px",
      align: "left",
    },
    {
      col: "user_name",
      type: Enum.TableData.type.text,
      minWidth: "90px",
      maxWidth: "180px",
      align: "left",
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
      col: "room_rental_date",
      type: Enum.TableData.type.date,
      width: "120px",
      align: "center",
    },
    {
      col: "deposit",
      type: Enum.TableData.type.number,
      width: "100px",
      align: "right",
    },
    {
      col: TableResource.TableRow.FixedAsset.feature.ENG,
      minWidth: "120px",
      width: "120px",
    },
  ];

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
    me.dispatchList = ["setAllRenting", "setAllRooms", "setAllUsers"];
  };

  return {
    cols,
    tds,
    TableResource,
    Resource,
    Enum,
    initConfig,
  };
};
