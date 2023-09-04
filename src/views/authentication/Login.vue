<template>
  <div class="background"></div>
  <div class="container" id="content">
    <form @submit.prevent="onSubmit">
      <h2 class="mb-3">Đăng nhập</h2>
      <div class="input">
        <label for="email">Tài khoản *</label>
        <input
          class="form-control"
          type="text"
          name="email"
          placeholder="admin"
          v-model="userInfo.account"
        />
      </div>
      <div class="input">
        <label for="password">Mật khẩu *</label>
        <input
          class="form-control"
          type="password"
          name="password"
          placeholder="123"
          v-model="userInfo.password"
        />
      </div>
      <!-- <div class="alternative-option mt-4">
        You don't have an account? <span @click="moveToRegister">Register</span>
      </div> -->
      <button type="submit" class="mt-4 btn-pers" id="login_button">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
// resources
import authApi from "@/apis/auth/authApi";

export default {
  name: "LoginVue",
  setup() {
    // const proxy = getCurrentInstance();
    const router = useRouter();

    const userInfo = reactive({
      account: "",
      password: "",
    });

    const onSubmit = async () => {
      const rs = await authApi.getAsync();
      if (rs.data.length) {
        const check = rs.data.some((item) => {
          return (
            item.account == userInfo.account &&
            item.password == userInfo.password
          );
        });
        if (check) {
          goToHome();
        }
      }
    };

    const goToHome = () => {
      router.push("/");
    };

    return {
      userInfo,
      onSubmit,
    };
  },
};
</script>

<style scoped>
@import "./login.css";

.container {
  width: 336px;
  max-width: 95%;
}
</style>