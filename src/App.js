import { useState } from "react";
import Paperbase from "./Paperbase";

function App() {

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("none")
  const [selectedTab, setSelectedTab] = useState("1")

  return (

    <Paperbase
      prop1={selectedAlgorithm}
      prop2={setSelectedAlgorithm}
      prop3={selectedTab}
      prop4={setSelectedTab}
    />

  );
}

export default App;
