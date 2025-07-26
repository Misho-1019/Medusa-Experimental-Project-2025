import { defineMiddlewares } from "@medusajs/framework/http"
import { z } from "zod"

export default defineMiddlewares({
  routes: [
    {
      method: "POST",
      matcher: "/admin/products",
      additionalDataValidator: {
        brand: z.string().optional(),
        is_featured: z.boolean().optional(),
      },
    },
    {
      method: 'POST',
      matcher: '/admin/products/:id',
      additionalDataValidator: {
        custm_name: z.string().nullish(),
      }
    }
  ],
})