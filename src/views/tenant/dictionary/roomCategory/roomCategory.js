import { computed, ref } from "vue";
// store
import { useStore } from "vuex";
// api
import roomCategoryAPI from "@/apis/dictionary/roomCategoryAPI";
// resources
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";

export const useRoomCategory = () => {
  // store
  const store = useStore();
  store.dispatch("setAllRoomCategories");
  const items = computed(() => {
    return store.state.allRoomCategories;
  });

  const cols = {
    numerical_order: { ENG: "numerical_order", VN: "STT" },
    room_category_name: { ENG: "room_category_name", VN: "Tên loại phòng" },
    unit_price: { ENG: "unit_price", VN: "Đơn giá" },
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
      col: "room_category_name",
      type: Enum.TableData.type.text,
      minWidth: "90px",
      maxWidth: "180px",
      align: "left",
    },
    {
      col: "unit_price",
      type: Enum.TableData.type.number,
      width: "80px",
      align: "right",
    },
    {
      col: TableResource.TableRow.FixedAsset.feature.ENG,
      minWidth: "150px",
      width: "150px",
    },
  ];

  const isShowPopup = ref(false);
  /**
   * @description Hiển thị popup
   * @author NVThinh 05/09/2023
   */
  const showPopup = () => {
    isShowPopup.value = true;
  };

  /**
   * @description Đóng popup
   * @author NVThinh 05/09/2023
   */
  const close = () => {
    isShowPopup.value = false;
  };

  const deleteAsync = async (id) => {
    try {
      const res = await roomCategoryAPI.deleteAsync(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // mode of Detail
  const popupMode = ref(Enum.Mode.Add);
  // data of Detail
  const detail = ref(null);
  const clickGridAction = async (mode, entity) => {
    detail.value = entity;
    if (mode === Enum.Mode.Delete) {
      const res = await deleteAsync(entity.room_category_id);
      // update store
      if (res) {
        const roomCategoriesList = store.state.allRoomCategories;
        store.state.allRoomCategories = roomCategoriesList.filter(
          (item) => item.room_category_id != entity.room_category_id
        );
      }
    } else {
      popupMode.value = Enum.Mode.Update;
      showPopup();
    }
  };

  return {
    store,
    items,
    cols,
    tds,
    isShowPopup,
    showPopup,
    close,
    clickGridAction,
    Resource,
    detail,
    popupMode,
  };
};
