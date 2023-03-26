import { ApplicationContract } from "@ioc:Adonis/Core/Application"
import { Rule, SchemaLiteral } from "@ioc:Adonis/Core/Validator"

declare module "@ioc:Adonis/Core/Validator" {
  interface Rules {
    stringRequired(): Rule
    numberRequired(): Rule
  }
}

export default class ClassValidatorProvider {
  public static needsApplication = true
  constructor(protected app: ApplicationContract) {}

  public async boot() {
    this.overrideStringSchema()
    this.overrideNumberSchema()
  }

  private overrideStringSchema() {
    const { schema, validator, rules } = this.app.container.use("Adonis/Core/Validator")
    validator.rule(
      "stringRequired",
      (value, _, options) => {
        if (typeof value !== "string") {
          options.errorReporter.report(options.pointer, "required", "required validation failed", options.arrayExpressionPointer)
        }
      },
      () => ({
        allowUndefineds: true,
      })
    )

    function myString(...args) {
      let option = {}
      let params: Rule[] = [rules.stringRequired()]
      if (args.length === 1) {
        params = params.concat(args[0])
      } else if (args.length === 2) {
        option = args[0]
        params = params.concat(args[1])
      }
      return schema.string.optional(option, params) as {
        t: string
        getTree: () => SchemaLiteral
      }
    }
    myString.nullable = schema.string.nullable
    myString.optional = schema.string.optional
    myString.nullableAndOptional = schema.string.nullableAndOptional
    schema.string = myString
  }

  private overrideNumberSchema() {
    const { schema, validator, rules } = this.app.container.use("Adonis/Core/Validator")

    validator.rule(
      "numberRequired",
      (value, _, options) => {
        if (isNaN(+value)) {
          options.errorReporter.report(options.pointer, "required", "required validation failed", options.arrayExpressionPointer)
        }
      },
      () => ({
        allowUndefineds: true,
      })
    )
    function myNumber(...args) {
      let params: Rule[] = [rules]
      if (args.length === 1) {
        params = params.concat(args[0])
      }
      return schema.number.optional(params) as {
        t: number
        getTree: () => SchemaLiteral
      }
    }
    myNumber.nullable = schema.number.nullable
    myNumber.optional = schema.number.optional
    myNumber.nullableAndOptional = schema.number.nullableAndOptional
    schema.number = myNumber
  }
}
