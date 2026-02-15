/**
 * Types
 */

export type Either<L, R> = Left<L> | Right<R>;

export type Right<R> = { ok: true; payload: R };

export type Left<L = string> = { ok: false; data: L };

export type WithReason<R = string> = { reason: R };

export type WithDetailedReason<R = string, D = string> = {
  reason: R;
  details: D;
};

export type WithError<E extends Error = Error> = { error: E };

/**
 * Utils
 */

export const right = <R>(payload: R): Right<R> => ({ ok: true, payload });

export const left = <L>(data: L): Left<L> => ({ ok: false, data });

export const leftWithReason = <R>(reason: R): Left<WithReason<R>> => ({
  ok: false,
  data: { reason },
});

export const leftWithDetailedReason = <R, D>(
  reason: R,
  details: D,
): Left<WithDetailedReason<R, D>> => ({ ok: false, data: { reason, details } });

export const leftWithError = <E extends Error>(
  error: E,
): Left<WithError<E>> => ({ ok: false, data: { error } });

export const throwLeft: <T>(
  either: Either<WithError, T>,
) => asserts either is Right<T> = <T>(either: Either<WithError, T>) => {
  if (either.ok === false) throw either.data.error;
  return either;
};
