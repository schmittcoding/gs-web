export type SchemaState<T, U = unknown> = U & {
  error?: string | ZodFlattenedError<T>["fieldErrors"];
  success?: boolean;
};
