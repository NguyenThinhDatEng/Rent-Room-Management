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
      @close="closePopup"
    />
  </div>
</template>

<script>
// components
import TableVue from "@/components/base/table/Table.vue";
import ButtonIcon from "@/components/base/button/ButtonIcon.vue";
import ServiceCategoryDetail from "./ServiceCategoryDetail.vue";
// Resources
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";
// base
import BaseList from "@/views/base/BaseList";
import { getCurrentInstance } from "vue";

export default {
  name: "ServiceVue",
  extends: BaseList,
  components: {
    TableVue,
    ButtonIcon,
    ServiceCategoryDetail,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    /**
     * @override
     * @author nvthinh 17.9.2023
     */
    const initConfig = () => {
      const me = proxy;
      // init
      me.key = "service_category_id";
      me.name = "service_category_name";
      me.controllerName = "ServiceCategories";
      me.dispatchList = ["setAllServiceCategories"];
      me.itemsName = "allServiceCategories";
    };

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

    return {
      cols,
      TableResource,
      tds,
      Resource,
      initConfig,
    };
  },
};
</script>

<style scoped>
@import "../dictionary.css";
</style>