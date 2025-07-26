import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Custom } from "../../../modules/custom/models/custom";
import { InferTypeOf } from "@medusajs/framework/types";
import CustomModuleService from "../../../modules/custom/service";
import { CUSTOM_MODULE } from "../../../modules/custom";

type DeleteCustomStepInput = {
    custom: InferTypeOf<typeof Custom>
}

export const deleteCustomStep = createStep(
    'delete-custom',
    async ({ custom }: DeleteCustomStepInput, { container }) => {
        const customModuleService: CustomModuleService = container.resolve(
            CUSTOM_MODULE
        )

        await customModuleService.deleteCustoms(custom.id)

        return new StepResponse(custom, custom)
    },
    async (custom, { container}) => {
        if (!custom) return
        
        const customModuleService: CustomModuleService = container.resolve(
            CUSTOM_MODULE
        )

        await customModuleService.createCustoms(custom)
    }
)