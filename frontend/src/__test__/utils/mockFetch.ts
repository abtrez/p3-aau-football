export function createMockFetchResponse(
  data: unknown,
  options = {},
  ok = true,
  status = 200
) {
  return {
    ok: ok,
    status: status,
    statusText: "Failed",
    json: () => Promise.resolve(data),
    ...options,
  };
}
