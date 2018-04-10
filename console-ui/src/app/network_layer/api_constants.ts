export class ApiConstants {



    public static HOME_URL = "http://192.168.1.109:7001/keppelconsumer/v1/";
// http://192.168.1.136:8085/sendx/getExchangeDetails?userCorrelationId=user
// http://192.168.1.109:7001/keppelconsumer/v1/getPlans


    public static get GET_PLANS_URL(): string { return this.HOME_URL + "getPlans"; };
    public static get NEW_USER_SIGNUP(): string {return this.HOME_URL + "newResiSignup"}
}