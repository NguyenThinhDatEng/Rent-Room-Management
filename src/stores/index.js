import { createStore } from "vuex";
// dictionary
import roomCategoryAPI from "@/apis/dictionary/roomCategoryAPI";
import roomAPI from "@/apis/dictionary/roomAPI";
import serviceCategoryAPI from "@/apis/dictionary/serviceCategoryAPI";
import userAPI from "@/apis/dictionary/userAPI";
// action
import rentingAPI from "@/apis/action/rentingAPI";

const store = createStore({
  state() {
    return {
      allRoomCategories: [],
      allServiceCategories: [],
      allRooms: [],
      allRenting: [],
      allUsers: [],
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

    setAllRenting(state, payload) {
      state.allRenting = payload;
    },

    setAllUsers(state, payload) {
      state.allUsers = payload;
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

    async setAllRenting({ commit }) {
      try {
        const res = await rentingAPI.getAsync();
        if (res.data) {
          commit("setAllRenting", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async setAllUsers({ commit }) {
      try {
        const res = await userAPI.getAsync();
        if (res.data) {
          commit("setAllUsers", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default store;
