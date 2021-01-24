import * as yup from 'yup'

export function stockInboundValidator<T = object>(body: T) {
  const schema = yup.object().shape({
    inbound_quantity: yup.number().required().positive().integer(),
    event_at: yup.date().notRequired(),
  })

  return schema.validate(body)
}
