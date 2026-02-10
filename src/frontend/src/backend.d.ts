import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CatalogResponse {
    categories: Array<Category>;
    styles: Array<Style>;
}
export interface Style {
    id: bigint;
    categoryId: bigint;
    name: string;
    description: string;
    image: string;
    price: number;
}
export type Time = bigint;
export interface Order {
    id: bigint;
    customerName: string;
    contactInfo: string;
    orderStatus: string;
    orderDate: Time;
    measurement: Measurement;
    style: bigint;
    category: bigint;
    price: number;
}
export interface Measurement {
    backRise: number;
    cuffCircumference: number;
    chest: number;
    bicepCircumference: number;
    frontRise: number;
    sleeveLength: number;
    shoulder: number;
    inseam: number;
    length: number;
    waist: number;
    hipCircumference: number;
    thighCircumference: number;
}
export interface Category {
    id: bigint;
    name: string;
    description: string;
    popularStyles?: Array<bigint>;
}
export interface backendInterface {
    getCatalog(): Promise<CatalogResponse>;
    getOrders(): Promise<Array<Order>>;
    submitInquiry(name: string, contact: string, message: string): Promise<boolean>;
    submitOrder(customerName: string, contactInfo: string, categoryId: bigint, styleId: bigint, measurement: Measurement): Promise<Order>;
}
