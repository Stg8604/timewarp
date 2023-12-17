import { useState } from "react";
import { usePython } from "react-py";

const DummyPydiode = () => {
  const [input, setInput] = useState("");

  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  return (
    <>
      {isLoading ? <p>Loading...</p> : <p>Ready!</p>}
      <form>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your code here"
        />
        <input
          type="submit"
          value={!isRunning ? "Run" : "Running..."}
          disabled={isLoading || isRunning}
          onClick={(e) => {
            e.preventDefault();
            runPython(input);
          }}
        />
      </form>
      <p>Output</p>
      <pre>
        <code>{stdout}</code>
      </pre>
      <pre>
        <code>{stderr}</code>
      </pre>
    </>
  );
};

export default DummyPydiode;
