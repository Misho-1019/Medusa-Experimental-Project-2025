import { Module } from "@medusajs/framework/utils";
import CustomModuleService from "./service";

export const CUSTOM_MODULE = 'custom'
export default Module(CUSTOM_MODULE, {
    service: CustomModuleService,
})