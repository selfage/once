import { toOnce, toOnceOrError } from "./once";
import { assertThat, assertThrow, eq, eqError } from "@selfage/test_matcher";
import { TEST_RUNNER } from "@selfage/test_runner";

TEST_RUNNER.run({
  name: "OnceTest",
  cases: [
    {
      name: "CallThreeTimes",
      execute: () => {
        // Execute
        let funcOnce = toOnce((x: number, y: string) => {
          return `${y}:${x}`;
        });
        let result = funcOnce(12, "now");

        // Verify
        assertThat(result, eq("now:12"), "result");

        // Execute
        result = funcOnce(21, "past");

        // Verify
        assertThat(result, eq("now:12"), "same result");

        // Execute
        result = funcOnce(33, "future");

        // Verify
        assertThat(result, eq("now:12"), "still same result");
      },
    },
    {
      name: "CallTwiceToThrow",
      execute: () => {
        // Execute
        let funcOnce = toOnceOrError((x: number, y: string) => {
          return `${y}:${x}`;
        });
        let result = funcOnce(12, "now");

        // Verify
        assertThat(result, eq("now:12"), "result");

        // Execute
        let error = assertThrow(() => funcOnce(21, "past"));

        // Verify
        assertThat(error, eqError(new Error("to be called")), "error");
      },
    },
  ],
});
