import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesStack from "./stack-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TItem, addItem, clearArray, deleteItem, takeTop } from "./stack-page-logic";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack-page-class";

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<TItem>());
  const [stackArr, setStackArray] = useState<TItem[]>(stack.arr);
  const [inputState, setInputState] = useState<string>("");
  const [isAddLoad, setAddLoad] = useState<boolean>(false);
  const [isRemoveLoad, setRemoveLoad] = useState<boolean>(false);

  const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={stylesStack.input_wrapper}>
        <Input
        maxLength={4}
        isLimitText={true}
        value={inputState}
        onChange={changeInput}
        />
        <div className={stylesStack.button_wrapper}> 
          <Button
          text="Добавить"
          onClick={()=>addItem(setAddLoad,inputState,setStackArray,setInputState,stack)}
          isLoader={isAddLoad}
          disabled={!inputState}
          />
          <Button
          text="Удалить"
          onClick={()=>deleteItem(setRemoveLoad,setStackArray,stack)}
          disabled={stack.arr.length <= 0}
          isLoader={isRemoveLoad}
          />
          <Button
          text="Очистить"
          onClick={()=>clearArray(setStackArray,stack)}
          disabled={stack.arr.length <= 0}
          />
        </div>
      </div>
      <ul className={stylesStack.circle_list}>
        {stackArr?.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.value}
              state={item.color}
              head={takeTop(index, stackArr)}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};