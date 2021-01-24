import * as yup from 'yup'

export function stockOutboundValidator<T = object>(body: T) {
  const schema = yup.object().shape({
    outbound_quantity: yup.number().required().positive().integer(),
    event_at: yup.date().notRequired(),
  })

  return schema.validate(body)
}
