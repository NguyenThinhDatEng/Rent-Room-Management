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
}
export default new RentingApi();
