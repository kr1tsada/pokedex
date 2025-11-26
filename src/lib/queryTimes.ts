/**
 * Shared TanStack Query timing constants
 */
const MINUTE_IN_MS = 60 * 1000;

export const QUERY_STALE_TIMES = {
  default: 5 * MINUTE_IN_MS,
  extended: 10 * MINUTE_IN_MS,
  infinite: Infinity,
} as const;

export const QUERY_GC_TIMES = {
  default: 30 * MINUTE_IN_MS,
  long: 60 * MINUTE_IN_MS,
  infinite: Infinity,
} as const;
