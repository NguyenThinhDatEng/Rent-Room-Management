import DictionaryApi from ".";

class ServiceCategoryApi extends DictionaryApi {
  endPoint = "ServiceCategories";
  constructor() {
    super();
  }
}
export default new ServiceCategoryApi();
