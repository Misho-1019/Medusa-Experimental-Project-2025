import { ProductDTO } from "@medusajs/framework/types";
import { createWorkflow, when, WorkflowResponse } from "@medusajs/framework/workflows-sdk";
import { createRemoteLinkStep, dismissRemoteLinkStep, useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { createCustomStep } from "../create-custom-from-product/steps/create-custom";
import { Modules } from "@medusajs/framework/utils";
import { CUSTOM_MODULE } from "../../modules/custom";
import { deleteCustomStep } from "./steps/delete-custom";
import { updateCustomStep } from "./steps/update-custom";

export type UpdateCustomFromProductStepInput = {
    product: ProductDTO,
    additional_data?: {
        brand?: string | null,
        is_featured?: boolean | false
    }
}

export const UpdateCustomFromProductWorkflow = createWorkflow(
    'update-custom-from-product',
    (input: UpdateCustomFromProductStepInput) => {
        const { data: products } = useQueryGraphStep({
            entity: 'product',
            fields: ['custom.*'],
            filters: {
                id: input.product.id,
            }
        })

        const created = when(
            'created-product-custom-link',
            {
                input,
                products,
            }, (data) => 
                !data.products[0].custom &&
                (
                    (typeof data.input.additional_data?.brand === 'string' && data.input.additional_data?.brand.length > 0) ||
                    typeof data.input.additional_data?.is_featured === 'boolean'
                )
        )
        .then(() => {
            const custom = createCustomStep({
                brand: typeof input.additional_data?.brand === 'string' ? input.additional_data?.brand : undefined,
                is_featured: input.additional_data?.is_featured,
            })

            createRemoteLinkStep([{
                [Modules.PRODUCT]: {
                    custom_id: custom.id,
                }
            }])

            return custom
        })

        // TODO create, update or delete Custom record
    }
)