// This test helps confirm what env vars are available in CI before the actual failing test
// It should be harmless and will make debugging faster.
test("CI smoke: environment variables are present", () => {
  // Print to stdout so the CI test-output artifact shows the values
  // (Jest will capture console.log output)
  // eslint-disable-next-line no-console
  console.log("ENV BACKEND_URI:", process.env.BACKEND_URI);
  // eslint-disable-next-line no-console
  console.log("ENV NEXT_PHASE:", JSON.stringify(process.env.NEXT_PHASE));

  expect(process.env.BACKEND_URI).toBeDefined();
  // If you expect a specific value, uncomment:
  // expect(process.env.BACKEND_URI).toBe("http://mock");
});
