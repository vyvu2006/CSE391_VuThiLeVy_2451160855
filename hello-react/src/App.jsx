import { useEffect, useState } from "react";
import data from "./data.json";

import "./App.css";
import Header from "../components/Header.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ProductTable from "../components/ProductTable.jsx";
import ProductRow from "../components/ProductRow.jsx";
function App() {
  const [tasks, setTasks] = useState([]);

  console.log(tasks);

  return (
    <>
      <Header />
      <ProductForm />
      <ProductTable />
      <ProductRow />
    </>
  );
}
export default App;
