import ActionApi from ".";

class RentingApi extends ActionApi {
  endPoint = "Rentings";
  constructor() {
    super();
  }

  async GetRentingUsers(config) {
    const endPoint = `${this.endPoint}/renting-users/${config?.renting_id}`;
    return await this.httpClient.get(endPoint);
  }

  async putCustomAsync(payload, userIds) {
    const params = { userIds };
    const endPoint = `${this.endPoint}/update`;
    return await this.httpClient.put(endPoint, payload, { params });
  }

  async pay(payload) {
    const endPoint = `${this.endPoint}/pay`;
    return await this.httpClient.post(endPoint, payload);
  }
}
export default new RentingApi();
