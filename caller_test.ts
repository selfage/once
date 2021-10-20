import { OnceCaller, OnceCallerOrError } from "./caller";
import { assertThat, assertThrow, eq, eqError } from "@selfage/test_matcher";
import { NODE_TEST_RUNNER } from "@selfage/test_runner";

NODE_TEST_RUNNER.run({
  name: "OnceCallerTest",
  cases: [
    {
      name: "CallThreeTimesAndReset",
      execute: () => {
        // Execute
        let onceCaller = new OnceCaller((x: boolean, y: string) => {
          return `${y}:${x}`;
        });
        let result = onceCaller.call(true, "yes");

        // Verify
        assertThat(result, eq("yes:true"), "result");

        // Execute
        result = onceCaller.call(false, "no");

        // Verify
        assertThat(result, eq("yes:true"), "same result");

        // Execute
        result = onceCaller.call(false, "no!!");

        // Verify
        assertThat(result, eq("yes:true"), "still same result");

        // Execute
        onceCaller.reset();
        result = onceCaller.call(false, "no");

        // Verify
        assertThat(result, eq("no:false"), "different result");
      },
    },
    {
      name: "CallTwiceToThrowAndReset",
      execute: () => {
        // Execute
        let onceCallerOrError = new OnceCallerOrError(
          (x: boolean, y: string) => {
            return `${y}:${x}`;
          }
        );
        let result = onceCallerOrError.call(true, "yes");

        // Verify
        assertThat(result, eq("yes:true"), "result");

        // Execute
        let error = assertThrow(() => onceCallerOrError.call(false, "no"));

        // Verify
        assertThat(error, eqError(new Error("to be called")), "error");

        // Execute
        onceCallerOrError.reset();
        result = onceCallerOrError.call(false, "no");

        // Verify
        assertThat(result, eq("no:false"), "different result");
      },
    },
  ],
});
