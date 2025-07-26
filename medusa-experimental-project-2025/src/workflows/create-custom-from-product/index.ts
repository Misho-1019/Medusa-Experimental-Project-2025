import { createWorkflow, transform, when, WorkflowResponse } from "@medusajs/framework/workflows-sdk";
import { ProductDTO } from "@medusajs/framework/types";
import { createRemoteLinkStep } from "@medusajs/medusa/core-flows";
import { Modules } from "@medusajs/framework/utils";
import { CUSTOM_MODULE } from "../../modules/custom";
import { createCustomStep } from "./steps/create-custom";

export type createCustomFromProductWorkflowInput = {
    product: ProductDTO,
    additional_data?: {
        brand?: string,
        is_featured?: boolean
    }
}

export const createCustomFromProductWorkflow = createWorkflow(
    'create-custom-from-product', 
    (input: createCustomFromProductWorkflowInput) => {
        const brand = transform(
            {
                input,
            },
            (data) => data.input.additional_data?.brand || ''
        )

        const is_featured = transform(
            {
                input,
            },
            (data) => data.input.additional_data?.is_featured || false
        )

        const custom = createCustomStep({
            brand,
            is_featured
        })

        when(({custom}), ({custom}) => custom !== undefined)
            .then(() => {
                createRemoteLinkStep([{
                    [Modules.PRODUCT]: {
                        product_id: input.product.id 
                    },
                    [CUSTOM_MODULE]: {
                        custom_id: custom.id,
                    }
                }])
            }
        )

        return new WorkflowResponse({
            custom,
        })
    }
)