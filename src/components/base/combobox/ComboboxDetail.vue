<template>
  <div class="combobox-container">
    <!-- label of input-->
    <label v-show="hasLabel" for="input">
      {{ label }} <span v-show="isRequired" style="color: red">*</span></label
    >
    <div :class="['combobox combobox--detail', { 'combobox--error': isError }]">
      <!-- input -->
      <input
        id="input"
        type="text"
        class="input combobox__input"
        v-model="val"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :disabled="isDisabled"
        :class="[{ 'input--disabled': isDisabled }]"
        @click="toggle"
        @keydown.tab="close"
        @keydown.enter="toggle"
        @keydown.down="onDown"
      />
      <!-- button  -->
      <div class="combobox__button">
        <div class="icon center icon--down"></div>
      </div>
      <!-- data -->
      <div class="combobox__data" v-show="isShow">
        <!-- title -->
        <div
          v-show="isShowComboboxDataTitle"
          id="combobox__data__title"
          class="title"
          tabindex="1"
        >
          <div class="data">
            <p>{{ Resource.PopupLabel[fields.name] }}</p>
          </div>
        </div>
        <!-- options  -->
        <Data
          v-for="(obj, index) in data"
          :key="index"
          :id="'comboBox' + field + index"
          :obj="obj"
          :field="field"
          :class="{
            'data--selected': isSelected(index),
          }"
          tabindex="1"
          ref="Data"
          @click="handleSelectData(index)"
          @keydown.down="highlightNext"
          @keydown.up="highlightPrevious"
          @keydown.enter="handleSelectData(index)"
          @keydown.tab="handleSelectData(index)"
          @keydown.esc="close"
          @mouseover="highlightIndex = index"
          @mouseout="highlightIndex = -1"
        ></Data>
      </div>
    </div>
  </div>
</template>

<script>
import Data from "./DataDetail.vue";
import Resource from "@/commons/resource";
import Function from "@/commons/commonFunction";

export default {
  name: "ComboboxDetail",
  components: { Data },
  props: {
    value: {
      type: String,
      default: "",
    },
    isError: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    maxLength: Number,
    comboboxData: {
      type: Array,
      default: () => [],
    },
    field: String,
    /**
     * Có sử dụng nhãn cho combobox
     */
    hasLabel: {
      type: Boolean,
      default: false,
    },
    /**
     * Nội dung nhãn
     */
    label: {
      type: String,
      default: "",
    },
    /**
     * Là trường bắt buộc
     */
    isRequired: {
      type: Boolean,
      default: false,
    },
    /**
     * Hiển thị title của dữ liệu
     */
    isShowComboboxDataTitle: {
      type: Boolean,
      default: true,
    },
    /**
     * Trường dữ liệu hiển thị
     */
    displayField: {
      type: String,
      default: "",
    },
    /**
     * Trường dữ liệu hiển thị
     */
    valueField: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update-combobox"],

  created() {
    // close the options if click out the component
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.close();
      }
    });
  },

  mounted() {
    const me = this;
    // set data
    this.comboboxData.forEach((obj) =>
      this.data.push({
        ...obj,
        isActive: false,
      })
    );

    const entity = me.comboboxData.find(
      (item) => item[me.valueField] == me.value
    );
    // Cập nhật giá trị hiển thị
    if (entity) {
      me.val = entity[me.displayField] || "";
    }
  },

  watch: {
    val: function () {
      try {
        this.data = Function.autoComplete(
          this.val,
          this.comboboxData,
          this.fields.name
        );
      } catch (error) {
        console.log(error);
      }
    },
    value: function () {
      const me = this;
      const entity = me.comboboxData.filter(
        (item) => item[me.valueField] == me.value
      );
      if (entity.length) {
        me.val = entity[0][me.displayField];
      }
    },
  },
  methods: {
    onDown: function () {
      try {
        this.open();
        this.$nextTick(function () {
          this.focusFirstOption();
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện chọn thông tin trong combobox
     * @author Nguyen Van Thinh 08/09/2023
     */
    handleSelectData: function (index) {
      const me = this;
      try {
        // get the ID of object
        const id = this.data[index][this.fields.id];
        // Lọc ra obj được chọn
        for (let obj of this.comboboxData) {
          if (id == obj[this.fields.id]) {
            // Cập nhật giá trị hiển thị cho input
            this.val = obj[me.displayField];
            // Phát dữ liệu đến lớp cha
            this.$emit("update-combobox", obj);
            // Thay đổi trạng thái
            obj.isActive = true;
          } else obj.isActive = false;
        }
        // Ẩn Data Combobox
        this.isShow = false;
        // refresh highlight index
        this.highlightIndex = -1;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * highlight vào dòng khi có sự kiện nhấn phím mũi tên xuống từ bàn phím
     * @author NVThinh (22/12/2022)
     */
    highlightNext: function (e) {
      if (e.target.nextElementSibling) {
        this.highlightIndex++;
        e.target.nextElementSibling.focus();
      }
    },

    /**
     * highlight vào dòng khi có sự kiện nhấn phím mũi tên lên từ bàn phím
     * @author NVThinh (22/12/2022)
     */
    highlightPrevious: function (e) {
      if (this.highlightIndex > 0) {
        this.highlightIndex--;
        e.target.previousElementSibling.focus();
      }
    },

    /**
     * @description display the options
     * @author NVT 26/12/2022
     */
    open: function () {
      this.isShow = true;
    },

    /**
     * @description hide the options
     * @author NVT 26/12/2022
     */
    close: function () {
      this.isShow = false;
    },

    /**
     * @description show/hide the options
     * @author NVT 26/12/2022
     */
    toggle: function () {
      this.isShow = !this.isShow;
    },

    /**
     * @description the state of option
     * @param {Number} index the index of option
     * @returns {Boolean} true if the option is focused
     * @author NVT 26/12/2022
     */
    isSelected: function (index) {
      return this.highlightIndex === index;
    },

    /**
     * @description Focus first option
     * @author NVThinh (26/12/2022)
     */
    focusFirstOption: function () {
      try {
        document.getElementById(`comboBox${this.field}0`).focus();
        if (this.isShow) this.highlightIndex++;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      data: [], // the options
      val: "", // the value of input
      proxy: this, // chỉ định component này
      isShow: false, // Trạng thái ẩn hiện phần dữ liệu
      highlightIndex: -1, // Đánh chỉ mục cho các option được chọn
      // Các trường dữ liệu tương ứng trong Database
      fields: {
        id: this.field + "_id",
        code: this.field + "_code",
        name: this.field + "_name",
      },
      Resource, // tài nguyên
      Function, // Hàm dùng chung
    };
  },
};
</script>

<style scoped>
@import url(./combobox.css);

:root {
  --input--error: #ea3636;
}

.combobox__data .data:active,
.combobox__data .data:focus {
  background-color: var(--combobox__data);
}

.combobox--error {
  border-color: var(--input--error);
}
</style>