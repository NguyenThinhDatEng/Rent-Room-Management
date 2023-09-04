<template>
  <div class="room-category">
    <div class="room-category_feature">
      <div class="content_name">Dịch vụ</div>
      <button-icon
        button-type="button--add"
        button-name="asset-add"
        :buttonContent="Resource.ButtonName['asset-add']"
        :hasIcon="false"
        :title="Resource.Title.add"
        @click="add"
      ></button-icon>
    </div>
    <table-vue :data="items" :cols="cols" :tds="tds"></table-vue>
  </div>
</template>

<script>
import { computed } from "vue";
// components
import TableVue from "@/components/base/table/Table.vue";
import ButtonIcon from "@/components/base/button/ButtonIcon.vue";
// Resources
import TableResource from "@/commons/resource/tableResource";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";
// store
import { useStore } from "vuex";

export default {
  name: "ServiceVue",
  components: {
    TableVue,
    ButtonIcon,
  },
  setup() {
    // store
    const store = useStore();
    store.dispatch("setAllServiceCategories");
    const items = computed(() => {
      return store.state.allServiceCategories;
    });

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

    /**
     * @description xử lý sự kiện nhấn vào nút thêm mới
     * @author NVThinh 01/09/2023
     */
    const add = () => {
      try {
        // Cập nhật chế độ và tiêu đề popup
        this.mode = Enum.Mode.Add;
        this.popupTitle = Resource.PopupTitle.add;
        // Hiển thị popup
        this.isShowPopup = true;
      } catch (error) {
        console.log(error);
      }
    };

    return { items, cols, TableResource, tds, Resource, add };
  },
};
</script>

<style scoped>
@import "./dictionary.css";
</style>