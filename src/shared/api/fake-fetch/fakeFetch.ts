function createAbortException(
  message = "Request aborted",
  name = "AbortError"
) {
  return new DOMException(message, name);
}

type FakeFetchConfig = {
  timeout?: number
  signal?: AbortSignal
}

export function fakeFetch<T>(
  dataOrError: T,
  config: FakeFetchConfig = {}
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (config?.signal?.aborted) {
      return reject(createAbortException());
    }

    config?.signal?.addEventListener("abort", () => {
      reject(createAbortException());
    });

    setTimeout(() => {
      if (dataOrError instanceof Error) {
        reject(dataOrError);
      } else {
        resolve(dataOrError);
      }
    }, config?.timeout || 450);
  });
}
