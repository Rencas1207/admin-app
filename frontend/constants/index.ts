import { PaymentMethod, ProductForState } from "schemas/SaleSchema";

interface DefaultValues {
   payment_methods: PaymentMethod
   products: ProductForState
}

export const DEFAULT_VALUES: DefaultValues = {
   payment_methods: {
      method: "Sin utilización Sist. Financiero",
      amount: 0,
      time_unit: "Meses",
      time_value: 0
   },
   products: {
      code: "",
      name: "",
      qty: 0,
      unit_price: 0
   }
}