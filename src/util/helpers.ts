type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;

export function wrapInArray<T>(
  v: T | null | undefined
): T extends readonly any[] 
    ? IfAny<T, T, NonNullable<T>> 
    : NonNullable<T>[] {
  if (v == null) {
    return [] as any;
  }
  return (Array.isArray(v) ? v : [v]) as any;
}
