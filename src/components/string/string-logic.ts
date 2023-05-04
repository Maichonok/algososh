import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

export type TStringArray = {
    value: string;
    color: ElementStates;
  };
  
export const stringReverse = async (
    array: TStringArray[],
    setLoad: Dispatch<SetStateAction<boolean>>,
    setResultArr: Dispatch<SetStateAction<TStringArray[]>>
  ) => {
    setLoad(true);
  
    let mid = Math.floor(array.length / 2);
  
    for (let i = 0; i < mid; i++) {
      let length = array.length - 1;
  
      if (i !== length - i) {
        array[i].color = ElementStates.Changing;
        array[length - i].color = ElementStates.Changing;
        setResultArr([...array]);
        await delay(DELAY_IN_MS);
      }
      let tmp1 = array[i];
      let tmp2 = array[length - i];
      array[i] = tmp2;
      array[i].color = ElementStates.Modified;
      array[length - i] = tmp1;
      array[length - i].color = ElementStates.Modified;
    }
    array[mid].color = ElementStates.Modified;
    setResultArr([...array]);
  
    setLoad(false);
  };