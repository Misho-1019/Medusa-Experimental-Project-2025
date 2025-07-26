import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CUSTOM_MODULE } from "../../../modules/custom";
import CustomModuleService from "../../../modules/custom/service";

type UpdateCustomStepInput = {
    id: string
    brand?: string
    is_featured?: boolean
}

export const updateCustomStep = createStep(
    'update-custom',
    async ({ id, brand, is_featured }: UpdateCustomStepInput, { container }) => {
        const customModuleService: CustomModuleService = container.resolve(
            CUSTOM_MODULE
        )

        const prevData = await customModuleService.retrieveCustom(id)

        const custom = await customModuleService.updateCustoms({
            id,
            brand,
            is_featured,
        })

        return new StepResponse(custom, prevData)
    },
    async (prevData, { container }) => {
        if (!prevData) return
        
        const customModuleService: CustomModuleService = container.resolve(
            CUSTOM_MODULE
        )

        await customModuleService.updateCustoms(prevData)
    }
)