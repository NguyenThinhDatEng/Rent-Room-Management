import { createStore } from "vuex";
import roomCategoryAPI from "@/apis/dictionary/roomCategoryAPI";
import roomAPI from "@/apis/dictionary/roomAPI";
import serviceCategoryAPI from "@/apis/dictionary/serviceCategoryAPI";

const store = createStore({
  state() {
    return {
      allRoomCategories: [],
      allServiceCategories: [],
      allRooms: [],
    };
  },

  getters: {},

  mutations: {
    incrementState(state) {
      state.count++;
    },

    setAllRoomCategories(state, payload) {
      state.allRoomCategories = payload;
    },

    setAllRooms(state, payload) {
      state.allRooms = payload;
    },

    setAllServiceCategories(state, payload) {
      state.allServiceCategories = payload;
    },
  },

  actions: {
    async setAllRoomCategories({ commit }) {
      try {
        const res = await roomCategoryAPI.getAsync();
        if (res.data) {
          commit("setAllRoomCategories", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async setAllRooms({ commit }) {
      try {
        const res = await roomAPI.getAsync();
        if (res.data) {
          commit("setAllRooms", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async setAllServiceCategories({ commit }) {
      try {
        const res = await serviceCategoryAPI.getAsync();
        if (res.data) {
          commit("setAllServiceCategories", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default store;
