// import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
// import CustomModuleService from "../../../modules/custom/service";
// import { CUSTOM_MODULE } from "../../../modules/custom";

// type CreateCustomStepInput = {
//     id: string,
//     brand?: string,
//     is_featured?: boolean,
// }

// export const createCustomStep = createStep('create-custom', async (data: CreateCustomStepInput, { container }) => {
//     if (!(data.brand && data.is_featured)) return

//     const customModuleService: CustomModuleService = container.resolve(
//         CUSTOM_MODULE
//     )

//     const custom = await customModuleService.createCustoms(data)

//     return new StepResponse(custom, custom)
// }, 
// async (custom, { container}) => {
//     if (!custom) return

//     const customModuleService: CustomModuleService = container.resolve(
//         CUSTOM_MODULE
//     )

//     await customModuleService.deleteCustoms(custom?.id)
// })

import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import CustomModuleService from "../../../modules/custom/service"
import { CUSTOM_MODULE } from "../../../modules/custom"

type CreateCustomStepInput = {
  brand?: string
  is_featured?: boolean
}

export const createCustomStep = createStep(
  "create-custom",
  async (data: CreateCustomStepInput, { container }) => {
    if (!data.brand) {
      return
    }

    const customModuleService: CustomModuleService = container.resolve(
      CUSTOM_MODULE
    )

    const custom = await customModuleService.createCustoms(data)

    return new StepResponse(custom, custom)
  },
  async (custom, { container }) => {
    if (!custom) return

    const customModuleService: CustomModuleService = container.resolve(
      CUSTOM_MODULE
    )

    await customModuleService.deleteCustoms(custom.id)
  }
)