import { useState, useRef, useMemo } from "react";
import reactLogo from "./assets/react.svg";
import sampleImage from "./assets/IMG20230110184534.jpg";
import "./App.css";
import Vibrant from "node-vibrant";

const getColors = async () => {
  const colors = await Vibrant.from(
    "src/assets/IMG20230110184534.jpg"
  ).getPalette();
  // const colorHexes = Object.keys(colors)
  //   .map((key) => colors[key]?.hex)
  //   .sort();
  console.log(colors);
};

interface Color {
  vibrant: string | null;
  muted: string | null;
  // 他の色相についても必要に応じて追加できます
}

function App() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLImageElement>(null);
  const [colors, setColors] = useState<Color | null>(null);
  useMemo(
    () =>
      Vibrant.from("src/assets/IMG20230110184534.jpg")
        .getPalette()
        .then((palette) => {
          const extractedColors: Color = {
            vibrant: palette.Vibrant?.hex || null,
            muted: palette.Muted?.hex || null,
          };

          setColors(extractedColors);
        }),
    []
  );
  console.log(colors);

  return (
    <>
      <div>
        <img src={sampleImage} className="logo" alt="Sample Image" ref={ref} />
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
