export declare namespace AppI {
    export interface KeyValuePairs {
        [key: string]: string;
    }

    export interface LoginResponse {
        access_token: string;
    }

    export interface OrderResponse {
        Crust: string;
        Flavor: string;
        Order_ID: number;
        Size: string;
        Table_No: number;
        Timestamp: string;
    }
}