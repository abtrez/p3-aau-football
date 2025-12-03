import { createMockFetchResponse } from "@/__test__/utils/mockFetch";
import { fetchMatchById, fetchMatchOverview } from "@/lib/fetchMatch";

describe("fetchMatch environment validation", () => {
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

    expect(import("@/lib/fetchMatch")).rejects.toThrow(
      "BACKEND_URI environment variable is not defined"
    );
  });

  it("does not throw if BACKEND_URI is defined", () => {
    process.env.BACKEND_URI = "http://example.com";
    delete process.env.NEXT_PHASE;

    expect(import("@/lib/fetchMatch")).resolves.not.toThrow();
  });

  it("does not throw if isBuild is true", () => {
    delete process.env.BACKEND_URI;
    process.env.NEXT_PHASE = "build";

    expect(import("@/lib/fetchMatch")).resolves.not.toThrow();
  });

  it("returns an empty array during build", async () => {
    delete process.env.BACKEND_URI;
    process.env.NEXT_PHASE = "build";

    const fetchMatch = await import("@/lib/fetchMatch");

    expect(fetchMatch.fetchMatchOverview()).resolves.toMatchObject([]);
  });
});

describe("fetchMatchOverview", () => {
  it("fetches match overview", () => {
    global.fetch = jest.fn().mockResolvedValue(
      createMockFetchResponse([
        {
          id: "123",
          season: "2025/26",
          competitionId: "1",
          homeTeam: {
            id: "1",
            name: "test",
            abbreviation: "t",
            yearEstablished: 2025,
            department: "test",
            studyPrograms: [],
            contactPerson: "1",
          },
          awayTeam: {
            id: "1",
            name: "test",
            abbreviation: "t",
            yearEstablished: 2025,
            department: "test",
            studyPrograms: [],
            contactPerson: "1",
          },
          kickoff: "test",
          homeScore: 0,
          awayScore: 0,
          matchEvents: []
        },
      ])
    );

    expect(fetchMatchOverview()).resolves.toMatchObject([
      {
        id: "123",
        season: "2025/26",
        competitionId: "1",
        homeTeam: {
          id: "1",
          name: "test",
          abbreviation: "t",
          yearEstablished: 2025,
          department: "test",
          studyPrograms: [],
          contactPerson: "1",
        },
        awayTeam: {
          id: "1",
          name: "test",
          abbreviation: "t",
          yearEstablished: 2025,
          department: "test",
          studyPrograms: [],
          contactPerson: "1",
        },
        kickoff: "test",
        homeScore: 0,
        awayScore: 0,
        matchEvents: []
      },
    ]);
  });

  it("gives an error if fetch returns not ok", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(createMockFetchResponse([], {}, false, 404));

    expect(fetchMatchOverview()).rejects.toThrow(
      "Failed to fetch match overview: 404 Failed"
    );
  });

  it("gives an error if zod cannot safe parse", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        createMockFetchResponse([{ id: 123, season: "2025/26", name: "test" }])
      );

    expect(fetchMatchOverview()).rejects.toThrow(
      "Backend returned invalid match data"
    );
  });
});

describe("fetchMatchById", () => {
  it("fetches a match by id", () => {
    global.fetch = jest.fn().mockResolvedValue(
      createMockFetchResponse({
        id: "123",
        season: "2025/26",
        competitionId: "1",
        homeTeam: {
          id: "1",
          name: "test",
          abbreviation: "t",
          yearEstablished: 2025,
          department: "test",
          studyPrograms: [],
          contactPerson: "1",
        },
        awayTeam: {
          id: "1",
          name: "test",
          abbreviation: "t",
          yearEstablished: 2025,
          department: "test",
          studyPrograms: [],
          contactPerson: "1",
        },
        kickoff: "test",
        homeScore: 0,
        awayScore: 0,
        matchEvents: []
      })
    );

    expect(fetchMatchById("123")).resolves.toMatchObject({
      id: "123",
      season: "2025/26",
      competitionId: "1",
      homeTeam: {
        id: "1",
        name: "test",
        abbreviation: "t",
        yearEstablished: 2025,
        department: "test",
        studyPrograms: [],
        contactPerson: "1",
      },
      awayTeam: {
        id: "1",
        name: "test",
        abbreviation: "t",
        yearEstablished: 2025,
        department: "test",
        studyPrograms: [],
        contactPerson: "1",
      },
      kickoff: "test",
      homeScore: 0,
      awayScore: 0,
      matchEvents: []
    });
  });

  it("gives an error if matchId does not fit safe pattern", () => {
    expect(fetchMatchById("*")).rejects.toThrow("Invalid matchId parameter.");
  });

  it("gives an error if fetch returns not ok", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(createMockFetchResponse({}, {}, false, 404));

    expect(fetchMatchById("123")).rejects.toThrow(
      "Failed to fetch match 123: 404 Failed"
    );
  });

  it("gives an error if zod cannot safe parse", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        createMockFetchResponse({ id: 1, season: "2025/26", name: "test" })
      );

    expect(fetchMatchById("123")).rejects.toThrow(
      "Backend returned invalid match data"
    );
  });
});
