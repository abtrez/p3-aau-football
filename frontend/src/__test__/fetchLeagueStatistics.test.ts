import { createMockFetchResponse } from "@/__test__/utils/mockFetch";
import { fetchLeagueStatistics } from "@/lib/fetchLeagueStatistics";

describe("fetchLeagueStatistics environment validation", () => {
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

    expect(import("@/lib/fetchLeagueStatistics")).rejects.toThrow(
      "BACKEND_URI environment variable is not defined"
    );
  });

  it("does not throw if BACKEND_URI is defined", () => {
    process.env.BACKEND_URI = "http://example.com";
    delete process.env.NEXT_PHASE;

    expect(import("@/lib/fetchLeagueStatistics")).resolves.not.toThrow();
  });

  it("does not throw if isBuild is true", () => {
    delete process.env.BACKEND_URI;
    process.env.NEXT_PHASE = "build";

    expect(import("@/lib/fetchLeagueStatistics")).resolves.not.toThrow();
  });

  it("returns an empty array during build", async () => {
    delete process.env.BACKEND_URI;
    process.env.NEXT_PHASE = "build";

    const fetchLeagueStatistic = await import("@/lib/fetchLeagueStatistics");

    expect(
      fetchLeagueStatistic.fetchLeagueStatistics("123", "2025/26")
    ).resolves.toStrictEqual([]);
  });
});

describe("fetchLeagueStatisticsOverview", () => {
  it("fetches league statistics overview", () => {
    global.fetch = jest.fn().mockResolvedValue(
      createMockFetchResponse([
        {
          id: "123",
          team: {
            id: "1",
            name: "test",
            abbreviation: "t",
            yearEstablished: 2025,
            department: "test",
            studyPrograms: [],
            contactPerson: "1",
          },
          competitionId: "1",
          season: "2025/26",
          matchesPlayed: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        },
      ])
    );

    expect(fetchLeagueStatistics("123", "2025/26")).resolves.toStrictEqual([
      {
        id: "123",
        team: {
          id: "1",
          name: "test",
          abbreviation: "t",
          yearEstablished: 2025,
          department: "test",
          studyPrograms: [],
          contactPerson: "1",
        },
        competitionId: "1",
        season: "2025/26",
        matchesPlayed: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      },
    ]);
  });

  it("it returns an empty array if response status is 404", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(createMockFetchResponse([], {}, false, 404));

    expect(fetchLeagueStatistics("123", "2025/26")).resolves.toStrictEqual([]);
  });

  it("gives an error if fetch returns not ok", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(createMockFetchResponse([], {}, false, 400));

    expect(fetchLeagueStatistics("123", "2025/26")).rejects.toThrow(
      "Failed to fetch league statistics: 400 Failed"
    );
  });

  it("gives an error if zod cannot safe parse", () => {
    global.fetch = jest.fn().mockResolvedValue(
      createMockFetchResponse([
        {
          id: "123",
          team: {},
          competitionId: "1",
          season: "2025/26",
          matchesPlayed: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
        },
      ])
    );

    expect(fetchLeagueStatistics("123", "2025/26")).rejects.toThrow(
      "Backend returned invalid league statistics data to competition: 123"
    );
  });
});
