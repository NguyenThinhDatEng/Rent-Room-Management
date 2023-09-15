import DictionaryApi from ".";

class UserApi extends DictionaryApi {
  endPoint = "Users";
  constructor() {
    super();
  }
}
export default new UserApi();
