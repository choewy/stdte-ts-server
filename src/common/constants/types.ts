export type LazyType<T> = T | Promise<T>;
export type LazyWithNullType<T> = T | null | Promise<T | null>;
