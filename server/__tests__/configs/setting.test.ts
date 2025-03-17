import { config } from "../../src/configs/setting";

describe("Environment variables", () => {
  test("should have comment keys exist", () => {
    expect(config).toEqual(
      expect.objectContaining({
        port: 5000,
        logLevel: "debug",
        redis_url: "redis://localhost:6379",
      })
    );
  });

  test("should have secret keys as strings", () => {
    expect(typeof config.supabase_url).toBe("string");
    expect(typeof config.supabase_key).toBe("string");
    expect(typeof config.gemini_api_key).toBe("string");
  });
});
