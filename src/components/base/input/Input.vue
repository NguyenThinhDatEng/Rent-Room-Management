<template>
  <div class="input__wrapper">
    <!-- label of input-->
    <label v-show="hasLabel" :for="inputId">
      {{ label }} <span v-show="isRequired" style="color: red">*</span></label
    >
    <!-- Money -->
    <input
      v-if="mask == 'decimal'"
      v-mask-decimal.br="0"
      :id="inputId"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'input',
        { 'input--disabled': isDisabled },
        { 'input--error': isError },
      ]"
      type="text"
      :maxlength="maxLength"
      :field="field"
      :disabled="isDisabled"
      :placeholder="getPlaceholder()"
    />
    <!-- Date -->
    <input
      v-else-if="mask == 'date'"
      v-mask-date.br
      :id="inputId"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'input',
        { 'input--disabled': isDisabled },
        { 'input--error': isError },
      ]"
      :maxlength="maxLength"
      :field="field"
      :disabled="isDisabled"
      :placeholder="getPlaceholder()"
    />
    <!-- Phone -->
    <input
      v-else-if="mask == 'phone'"
      v-mask-phone.br
      :id="inputId"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'input',
        { 'input--disabled': isDisabled },
        { 'input--error': isError },
      ]"
      :maxlength="maxLength"
      :field="field"
      :disabled="isDisabled"
      :placeholder="getPlaceholder()"
    />
    <!-- Normal input -->
    <input
      v-else
      :id="inputId"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'input',
        { 'input--disabled': isDisabled },
        { 'input--error': isError },
      ]"
      :style="{
        'text-align': type === Enum.DataType.Text ? 'left' : 'right',
      }"
      :maxlength="maxLength"
      :field="field"
      :disabled="isDisabled"
      :placeholder="getPlaceholder()"
    />
    <!-- error message -->
    <p
      v-show="isError"
      class="error-message"
      v-html="label + ' ' + Resource.ErrorMessage.blank"
    ></p>
  </div>
</template>

<script>
// Resources
import Function from "@/commons/commonFunction";
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";

export default {
  name: "NormalInput",
  props: {
    /**
     * Nhãn của input
     */
    label: {
      type: String,
      default: "",
    },
    // Ẩn hiện label của input
    hasLabel: {
      type: Boolean,
      default: true,
    },
    maxLength: {
      type: Number,
      default: 50,
    }, // Chiều dài lớn nhất của chuỗi
    type: {
      type: [Number, String],
      default: 0,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    }, // true nếu thiếu dữ liệu yêu cầu
    placeholder: {
      type: String,
      default: "",
    },
    // Thông tin bắt buộc nhập
    isRequired: {
      type: Boolean,
      default: true,
    },
    tabindex: {
      type: [Number, String],
      default: 1,
    },
    /**
     * Format input
     */
    mask: {
      type: String,
      default: "",
      validator: function (value) {
        return ["decimal", "date", "phone"].includes(value) || value == "";
      },
    },
    /**
     * ID input
     */
    inputId: {
      type: String,
      default: "input",
    },
    /**
     * Trường dữ liệu
     */
    field: {
      type: String,
      default: "",
    },
    /**
     * Giá trị bind từ component cha
     */
    modelValue: {
      type: [String, Number],
    },
  },
  emits: ["update-input", "update:modelValue"],

  created() {},

  methods: {
    // Focus input
    focusInput() {
      this.$refs.input.focus();
    },
    // Thiếp lập giá trị ban đầu
    setValue: function () {
      try {
        if (this.value) {
          this.val = this.value;
        } else {
          if (this.type == Enum.DataType.Year) {
            this.val = Function.getCurrentYear();
          }
        }
        return this.val;
      } catch (error) {
        console.log(error);
      }
    },
    // Lấy placeholder
    getPlaceholder: function () {
      try {
        if (this.placeholder) return this.placeholder;
        if (
          this.type == Enum.DataType.Number ||
          this.type == Enum.DataType.Money
        )
          return 0;
        return "";
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description Ẩn/hiện mật khẩu
     * @author NVThinh 28/12/2022
     */
    toggle: function () {
      this.onEye = !this.onEye;
    },
  },
  data() {
    return {
      // Variables
      val: "", // giá trị ô input
      onEye: true, // Trạng thái ẩn/hiện mật khẩu
      // Resources
      Function,
      Resource,
      Enum,
    };
  },
};
</script>

<style scoped>
@import url(./input.css);

/* input */
.input {
  width: 100%;
  height: 36px;
  padding: 0 14px;
}

.input-login::placeholder {
  font-family: MISA Regular;
}

label + input {
  margin-top: 8px;
}

.bottomError .error-message {
  bottom: 0;
}
</style>