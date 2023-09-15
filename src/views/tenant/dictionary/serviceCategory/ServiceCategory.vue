<template>
  <div class="room-category">
    <div class="room-category_feature">
      <div class="content_name">Dịch vụ</div>
      <button-icon
        button-type="button--add"
        button-name="asset-add"
        :buttonContent="'Thêm dịch vụ'"
        :hasIcon="false"
        :title="Resource.Title.add"
        @click="add"
      ></button-icon>
    </div>
    <table-vue
      :data="items"
      :cols="cols"
      :tds="tds"
      @clickGridAction="clickGridAction"
    ></table-vue>
    <service-category-detail
      v-if="isShowPopup"
      title="dịch vụ"
      :width="500"
      :entity="detail"
      :mode="popupMode"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
// components
import TableVue from "@/components/base/table/Table.vue";
import ButtonIcon from "@/components/base/button/ButtonIcon.vue";
import ServiceCategoryDetail from "./ServiceCategoryDetail.vue";
// Resources
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";
// store
import { useStore } from "vuex";
// api
import serviceCategoryAPI from "@/apis/dictionary/serviceCategoryAPI";

export default {
  name: "ServiceVue",
  components: {
    TableVue,
    ButtonIcon,
    ServiceCategoryDetail,
  },
  setup() {
    // store
    const store = useStore();
    store.dispatch("setAllServiceCategories");
    const items = computed(() => {
      return store.state.allServiceCategories;
    });
    // key
    const key = "service_category_id";

    const cols = {
      numerical_order: { ENG: "numerical_order", VN: "STT" },
      service_category_name: {
        ENG: "service_category_name",
        VN: "Tên dịch vụ",
      },
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
        col: "service_category_name",
        type: Enum.TableData.type.text,
        minWidth: "90px",
        align: "left",
      },
      {
        col: TableResource.TableRow.FixedAsset.feature.ENG,
        minWidth: "150px",
        width: "150px",
      },
    ];

    const popupMode = ref(0);
    const add = () => {
      popupMode.value = Enum.Mode.Add;
      showPopup();
    };

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

    // data of Detail
    const detail = ref(null);
    const clickGridAction = async (mode, entity) => {
      detail.value = entity;
      if (mode === Enum.Mode.Delete) {
        const res = await deleteAsync(entity[key]);
        // update store
        if (res) {
          store.dispatch("setAllServiceCategories");
        }
      } else {
        popupMode.value = Enum.Mode.Update;
        showPopup();
      }
    };

    const deleteAsync = async (id) => {
      try {
        const res = await serviceCategoryAPI.deleteAsync(id);
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      items,
      cols,
      TableResource,
      tds,
      Resource,
      add,
      popupMode,
      isShowPopup,
      close,
      clickGridAction,
      detail,
    };
  },
};
</script>

<style scoped>
@import "../dictionary.css";
</style>