export class ApiConstants {


       public static HOME_URL = "http://10.21.32.13:8888/keppel-consumer/v1/"

    public static get GET_PLANS_URL(): string { return this.HOME_URL + "getPlans"; };
    public static get NEW_USER_SIGNUP(): string { return this.HOME_URL + "newResiSignup" };
    public static get GET_SECURITY_DEPOSIT(): string { return this.HOME_URL + "getSecutityDeposit" }
    public static get GET_PROMO_CODE(): string { return this.HOME_URL + "getPromocode/" }
    public static get GET_APP_STATUS(): string { return this.HOME_URL + "getAppStatus/" }
    public static get GET_CONTACTUS(): string {return this.HOME_URL + "contactUsDetails"}
}