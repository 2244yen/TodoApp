import { createContext, useContext, useEffect, useState } from "react";
import { IItem } from "./interface";

const ListContext = createContext({
  list: [] as IItem[],
  setList: (value: IItem[]) => {}
});

// const ListProvider = ({ children }: { children: any }) => {
//   const [list, setList] = useState<IItem[]>([]);
//   const [statusList, setStatusList] = useState<string[]>([]);
//   const [keyword, setKeyword] = useState('');

//   useEffect(() => {
//     try {
//       fetch('./data/index.json').then(async (value) => {
//         let list = await value.json();
//         const isCleared = window.localStorage.getItem('isCleared');
//         let checkedList = isCleared ? list.map((item: any) => ({...item, status: 'active' as any})) : list;
//         setList(checkedList);
//       })
//     } catch {}
//   }, [list])

//   const handleKeyDown = (event: KeyboardEvent) => {
//     if (event.key === 'Enter' && keyword) {
//       const data = [...list];
//       list.push({ name: keyword, status: "active" });
//       setList(data);
//     }
//   }

//   const value = {list, setList};

//   return (
//     <ListContext.Provider value={{
//       list,
//       setList
//     }}>
//       {children}
//     </ListContext.Provider>
//   )
// }

// const useList = () => {
//   const context = useContext(ListContext)

//   if(context === undefined) {
//     throw new Error("useList must be used with in ListProvider ")
//   }

//   return context
// }

export { ListContext }
