import * as yup from 'yup'

export function stockInboundValidator<T = object>(body: T) {
  const schema = yup.object().shape({
    stock_id: yup.string().required(),
    inbound_quantity: yup.number().required().positive().integer(),
  })

  return schema.validate(body)
}
