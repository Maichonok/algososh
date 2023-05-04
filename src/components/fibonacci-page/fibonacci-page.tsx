import React, { useState } from "react";
import fiboStyle from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { sumNumberFibo, showNumberFibo } from "./fibonacci-page-logic";

export const FibonacciPage: React.FC = () => {
  const [inputState, setInputState] = useState<string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const changeInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value);
    if (Number(evt.target.value) > 19 || Number(evt.target.value) < 1) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  };
  const [inputResult, setInputResult] = useState<string[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const deployFibo = () => {
    showNumberFibo(sumNumberFibo(inputState), setInputResult, setIsLoad);
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fiboStyle.input_wrapper}>
        <Input
          min={1}
          max={19}
          isLimitText={true}
          type="number"
          onChange={changeInputValue}
        />
        <Button
          text="Рассчитать"
          disabled={!inputState || disabledBtn}
          isLoader={isLoad}
          onClick={deployFibo}
        />
      </div>
      <ul className={fiboStyle.string_list}>
        {inputResult?.map((item, index) => (
          <li key={index}>
            <Circle letter={item} index={index} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
