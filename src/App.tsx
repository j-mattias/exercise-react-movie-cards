import { ReactElement } from "react";
import AddMovie from "./components/AddMovie";

export function App(): ReactElement {

  return (
    <>
      <h1>Add Movies</h1>
      <AddMovie />
    </>
  );
}
