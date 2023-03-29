declare module "@ioc:Adonis/Core/Validator" {
  interface StringType {
    (
      options?:
        | {
            escape?: boolean
            trim?: boolean
          }
        | Rule[],
      rules?: Rule[]
    ): {
      t: string
      getTree(): SchemaLiteral
    }
    optional(
      options?:
        | {
            escape?: boolean
            trim?: boolean
          }
        | Rule[],
      rules?: Rule[]
    ): {
      t?: string
      getTree(): SchemaLiteral
    }
    nullable(
      options?:
        | {
            escape?: boolean
            trim?: boolean
          }
        | Rule[],
      rules?: Rule[]
    ): {
      t: string | null
      getTree(): SchemaLiteral
    }
    nullableAndOptional(
      options?:
        | {
            escape?: boolean
            trim?: boolean
          }
        | Rule[],
      rules?: Rule[]
    ): {
      t?: string | null
      getTree(): SchemaLiteral
    }
    required(
      options?:
        | {
            escape?: boolean
            trim?: boolean
          }
        | Rule[],
      rules?: Rule[]
    ): {
      t: string
      getTree(): SchemaLiteral
    }
  }
}
