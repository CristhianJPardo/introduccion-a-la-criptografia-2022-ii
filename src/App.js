import { useState } from "react";
import Paperbase from "./Paperbase";

function App() {

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("none")
  const [selectedTab, setSelectedTab] = useState("1")
  const [isNew, setIsNew] = useState(false)

  return (

    <Paperbase
      prop1={selectedAlgorithm}
      prop2={setSelectedAlgorithm}
      prop3={selectedTab}
      prop4={setSelectedTab}
      prop5={isNew}
      prop6={setIsNew}
    />

  );
}

export default App;
