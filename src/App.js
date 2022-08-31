import { useState } from "react";
import Paperbase from "./Paperbase";



function App() {

  const globalObj = {
    defaultTitle: "Welcome to MyApp!",
  }

  const [global, setGlobal] = useState(globalObj)

  return (
    <div className="App">
      <Paperbase
        prop1={setGlobal}
        prop2={global}
      />
    </div>
  );
}

export default App;
