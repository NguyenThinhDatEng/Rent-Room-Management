// Resources
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";

export const useUser = () => {
  // config to base
  const itemsName = "allUsers";
  const dispatchList = ["setAllUsers"];
  // key
  const key = "user_id";

  const cols = {
    numerical_order: { ENG: "numerical_order", VN: "STT" },
    user_name: { ENG: "user_name", VN: "Họ và tên" },
    gender: { ENG: "gender", VN: "Giới tính" },
    phone_number: { ENG: "phone_number", VN: "Số điện thoại" },
    identifier_number: { ENG: "identifier_number", VN: "CMND/CCCD" },
    is_renting: { ENG: "is_renting", VN: "Trạng thái thuê" },
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
      col: "is_renting",
      type: Enum.TableData.type.boolean,
      width: "150px",
      align: "center",
      display: { no: "Chưa thuê", yes: "Đang thuê" },
    },
    {
      col: TableResource.TableRow.FixedAsset.feature.ENG,
      minWidth: "120px",
      width: "120px",
    },
  ];

  return {
    itemsName,
    cols,
    TableResource,
    tds,
    Resource,
    close,
    dispatchList,
    key,
  };
};
