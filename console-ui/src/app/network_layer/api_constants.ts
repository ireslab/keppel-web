export class ApiConstants {


    // http://192.168.1.109:7001/keppel-consumer
    // http://10.21.32.4:8888/keppel-consumer
    public static HOME_URL = "http://10.21.32.4:8888/keppel-consumer/v1/"
    // public static HOME_URL = "http://10.21.32.4:8888/keppel-consumer/v1/"
    // "http://10.21.32.4:8888/keppel-consumer/v1/";
// http://192.168.1.136:8085/sendx/getExchangeDetails?userCorrelationId=user
// http://192.168.1.109:7001/keppelconsumer/v1/getPlans


    public static get GET_PLANS_URL(): string { return this.HOME_URL + "getPlans"; };
    public static get NEW_USER_SIGNUP(): string {return this.HOME_URL + "newResiSignup"};
    public static get GET_SECURITY_DEPOSIT(): string {return this.HOME_URL + "getSecutityDeposit"}

}