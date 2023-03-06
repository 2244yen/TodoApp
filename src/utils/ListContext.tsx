import { createContext } from "react";
import { IItem } from "./interface";

export const ListContext = createContext({
  list: [] as IItem[],
  setList: (value: IItem[]) => {}
});
