import { model } from "@medusajs/framework/utils";

export const Custom = model.define('custom', {
    id: model.id().primaryKey(),
    brand: model.text(),
    is_featured: model.boolean().default(false)
})