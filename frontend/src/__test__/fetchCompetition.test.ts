import { createMockFetchResponse } from "@/__test__/utils/mockFetch";
import {
  addCompetition,
  fetchCompetitionById,
  fetchCompetitions,
} from "@/lib/fetchCompetition";

describe("fetchCompetition environment validation", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // clear module cache
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it("throws if BACKEND_URI is missing and not in build phase", () => {
    delete process.env.BACKEND_URI;
    delete process.env.NEXT_PHASE;

    expect(import("@/lib/fetchCompetition")).rejects.toThrow(
      "BACKEND_URI environment variable is not defined"
    );
  });

  it("does not throw if BACKEND_URI is defined", () => {
    process.env.BACKEND_URI = "http://example.com";
    delete process.env.NEXT_PHASE;

    expect(import("@/lib/fetchCompetition")).resolves.not.toThrow();
  });

  it("does not throw if isBuild is true", () => {
    delete process.env.BACKEND_URI;
    process.env.NEXT_PHASE = "build";

    expect(import("@/lib/fetchCompetition")).resolves.not.toThrow();
  });

  it("returns an empty array during build", async () => {
    delete process.env.BACKEND_URI;
    process.env.NEXT_PHASE = "build";

    const fetchCompetition = await import("@/lib/fetchCompetition");

    expect(fetchCompetition.fetchCompetitions()).resolves.toEqual([]);
  });
});

describe("fetchCompetitionOverview", () => {
  it("fetches competition overview", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        createMockFetchResponse([
          { id: "123", season: "2025/26", name: "test" },
        ])
      );

    expect(fetchCompetitions()).resolves.toEqual([
      { id: "123", name: "test", season: "2025/26" },
    ]);
  });

  it("gives an error if fetch returns not ok", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(createMockFetchResponse([], {}, false, 404));

    expect(fetchCompetitions()).rejects.toThrow(
      "Failed to fetch competitions: 404 Failed"
    );
  });

  it("gives an error if zod cannot safe parse", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        createMockFetchResponse([{ id: 123, season: "2025/26", name: "test" }])
      );

    expect(fetchCompetitions()).rejects.toThrow(
      "Backend returned invalid competitions data"
    );
  });
});

describe("fetchCompetitionById", () => {
  it("fetches a competition by id", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        createMockFetchResponse({ id: "1", season: "2025/26", name: "test" })
      );

    expect(fetchCompetitionById("1")).resolves.toEqual({
      id: "1",
      name: "test",
      season: "2025/26",
    });
  });

  it("gives an error if competitionId does not fit safe pattern", () => {
    expect(fetchCompetitionById("*")).rejects.toThrow(
      "Invalid competitionId parameter."
    );
  });

  it("gives an error if fetch returns not ok", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(createMockFetchResponse({}, {}, false, 404));

    expect(fetchCompetitionById("1")).rejects.toThrow(
      "Failed to fetch competition 1: 404 Failed"
    );
  });

  it("gives an error if zod cannot safe parse", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        createMockFetchResponse({ id: 1, season: "2025/26", name: "test" })
      );

    expect(fetchCompetitionById("1")).rejects.toThrow(
      "Backend returned invalid competition data for id 1"
    );
  });
});

describe("addCompetition", () => {
  it("adds a competition", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        createMockFetchResponse({ id: "1", season: "2025/26", name: "test" })
      );

    expect(addCompetition("test", "2025/26")).resolves.toEqual({
      error: null,
      result: { id: "1", name: "test", season: "2025/26" },
    });
  });

  it("gives an error if fetch returns not ok", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        createMockFetchResponse(
          { id: 1, season: "2025/26", name: "test" },
          {},
          false,
          404
        )
      );

    expect(addCompetition("test", "2025/26")).resolves.toEqual({
      error: "Failed to add competition: 404 Failed",
      result: null,
    });
  });

  it("gives an error if zod cannot safe parse", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        createMockFetchResponse({ id: 1, season: "2025/26", name: "test" })
      );

    expect(addCompetition("test", "2025/26")).resolves.toEqual({
      error: "Backend returned invalid competition data",
      result: null,
    });
  });
});
