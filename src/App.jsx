import Dropdown from "./Dropdown";

function App() {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Hank",
    "Ivy",
    "Jack",
    "Katie",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Parker",
    "Quinn",
    "Riley",
    "Samuel",
    "Tara",
    "Uma",
    "Violet",
    "William",
    "Xander",
    "Yara",
    "Zoe",
  ];

  return (
    <>
      <h1> Dropdown with multi-select: </h1>
      <Dropdown data={names} multi_select={true} />
      <br />
      <br />
      <h1> Dropdown with single-select: </h1>
      <Dropdown data={names} multi_select={false} />
    </>
  );
}

export default App;
