<template>
  <div class="left-nav-content">
    <div class="menu-item">
      <p @click="showSubMenu(0)">Danh mục</p>
      <div v-if="menu[0].isShowSubMenu" class="menu-sub-item">
        <router-link
          :to="{ name: i18nLayout.LeftNav.RoomCategory }"
          class="sub-item"
          >Loại phòng</router-link
        >
        <router-link :to="{ name: i18nLayout.LeftNav.Room }" class="sub-item"
          >Phòng</router-link
        >
        <router-link :to="{ name: i18nLayout.LeftNav.Service }" class="sub-item"
          >Dịch vụ</router-link
        >
      </div>
    </div>
    <div class="menu-item">
      <p @click="showSubMenu(1)">Tác vụ</p>
      <div v-if="menu[1].isShowSubMenu" class="menu-sub-item">
        <div class="sub-item">Thuê phòng</div>
        <div class="sub-item">Trả phòng</div>
      </div>
    </div>
    <div class="menu-item">
      <p @click="showSubMenu(2)">Thống kê</p>
      <div v-if="menu[2].isShowSubMenu" class="menu-sub-item">
        <div class="sub-item">Phòng đang thuê</div>
        <div class="sub-item">Phòng trống</div>
        <div class="sub-item">Tiền điện</div>
        <div class="sub-item">Tiền nước</div>
        <div class="sub-item">Doanh thu</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
// Resources
import i18nLayout from "@/i18n/components/i18nLayout";

export default {
  name: "LeftNav",
  setup() {
    const menu = reactive([
      {
        isShowSubMenu: false,
      },
      {
        isShowSubMenu: false,
      },
      {
        isShowSubMenu: false,
      },
    ]);

    const showSubMenu = (index) => {
      menu.forEach((item, i) => {
        if (i === index) {
          item.isShowSubMenu = !item.isShowSubMenu;
        } else {
          item.isShowSubMenu = false;
        }
      });
    };

    return { showSubMenu, menu, i18nLayout };
  },
};
</script>

<style scoped>
.left-nav-content {
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  background-color: #393a3d;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  color: white;
}

.menu-item:hover {
  cursor: pointer;
}

.menu-item p {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
  height: 48px;
  border-radius: 4px;
}

.menu-item p:hover {
  background-color: #59595d;
}

.menu-sub-item {
  width: 100%;
}

.sub-item {
  display: flex;
  align-items: center;
  height: 44px;
  padding-left: 8px;
  border-radius: 4px;
  color: #fff;
}

.sub-item:hover {
  background-color: #59595d;
}
</style>