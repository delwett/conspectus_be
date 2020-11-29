import { ValidationError } from 'class-validator'

export default function getValidationErrorMessage(errors: ValidationError[]): string {
  return errors.map(({ constraints }) => (constraints ? Object.values(constraints)[0] : '')).join('. ')
}
