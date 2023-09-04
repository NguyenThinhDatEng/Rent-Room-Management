import BaseAPI from "../baseAPI/baseAPI";

class AuthApi extends BaseAPI {
  endPoint = "authentication";

  constructor() {
    super();
  }
}
export default new AuthApi();
