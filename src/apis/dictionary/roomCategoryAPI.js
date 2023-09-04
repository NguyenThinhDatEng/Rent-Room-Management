import DictionaryApi from ".";

class RoomCategoryApi extends DictionaryApi {
  endPoint = "RoomCategories";
  constructor() {
    super();
  }
}
export default new RoomCategoryApi();
