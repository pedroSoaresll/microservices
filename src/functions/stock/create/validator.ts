import * as yup from 'yup'

export function stockCreateValidator<T = object>(body: T) {
  const schema = yup.object().shape({
    external_id: yup.string().required(),
    quantity: yup.number().required().positive().integer().min(1),
    cost: yup
      .number()
      .positive()
      .integer()
      .default(() => 0)
      .optional(),
    quantity_min: yup
      .number()
      .notRequired()
      .positive()
      .integer()
      .default(() => 0),
    unit_sale_price: yup.number().required().positive().integer(),
    expanses: yup
      .number()
      .optional()
      .positive()
      .integer()
      .default(() => 0),
    provider: yup.string().optional(),
  })

  return schema.validate(body)
}
