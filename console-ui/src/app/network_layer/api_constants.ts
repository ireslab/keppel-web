export class ApiConstants {



    public static HOME_URL = "http://192.168.1.136:8085/sendx/";
// http://192.168.1.136:8085/sendx/getExchangeDetails?userCorrelationId=user

    public static get GET_PLANS_URL(): string { return this.HOME_URL + "getExchangeDetails?userCorrelationId=user"; };
}