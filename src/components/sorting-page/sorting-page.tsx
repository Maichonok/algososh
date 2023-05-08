import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingStyle from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import {
  TArr,
  randomArr,
  sortingBubbleAscending,
  sortingBubbleDescending,
  selectionSortAscending,
  selectionSortDescending,
} from "./sorting-page-logic";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  const [createArray, setCreateArray] = useState<TArr[]>([]);
  enum SortingRadio {
    SelectionSort = "selectsort",
    Bubble = "bubble",
  }
  const [radioType, setRadioType] = useState<SortingRadio>(
    SortingRadio.SelectionSort
  );
  const [sortType, setSortType] = useState<Direction>();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    randomArr(setCreateArray, createArray);
    return () => {
      return;
    };
  }, []);
  //Установка значения радио кнопки по клику
  const changeRadioChoise = () => {
    setRadioType(SortingRadio.SelectionSort);
  };

  const changeRadioBubble = () => {
    setRadioType(SortingRadio.Bubble);
  };

  const changeSortType = (sorting: Direction) => {
    setSortType(sorting);
    if (
      sortType === Direction.Ascending &&
      radioType === SortingRadio.SelectionSort
    ) {
      selectionSortAscending(createArray, setCreateArray, setIsLoad);
    }
    if (
      sortType === Direction.Descending &&
      radioType === SortingRadio.SelectionSort
    ) {
      selectionSortDescending(createArray, setCreateArray, setIsLoad);
    }
    if (sortType === Direction.Ascending && radioType === SortingRadio.Bubble) {
      sortingBubbleAscending(createArray, setCreateArray, setIsLoad);
    }
    if (
      sortType === Direction.Descending &&
      radioType === SortingRadio.Bubble
    ) {
      sortingBubbleDescending(createArray, setCreateArray, setIsLoad);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyle.input_wrapper}>
        <div className={sortingStyle.checkbox_wrapper}>
          <RadioInput
            label="Выбор"
            checked={radioType === SortingRadio.SelectionSort}
            onChange={changeRadioChoise}
            disabled={isLoad}
          />
          <RadioInput
            label="Пузырёк"
            checked={radioType === SortingRadio.Bubble}
            onChange={changeRadioBubble}
            disabled={isLoad}
          />
        </div>
        <div className={sortingStyle.button_wrapper}>
          <Button
            text="По возрастанию"
            onClick={() => changeSortType(Direction.Ascending)}
            sorting={Direction.Ascending}
            isLoader={isLoad}
            disabled={isLoad}
          />
          <Button
            text="По убыванию"
            onClick={() => changeSortType(Direction.Descending)}
            sorting={Direction.Descending}
            disabled={isLoad}
          />
        </div>
        <div>
          <Button
            text="Новый массив"
            onClick={() => randomArr(setCreateArray, createArray)}
            extraClass={sortingStyle.button_arr}
            disabled={isLoad}
          />
        </div>
      </div>
      <div className={sortingStyle.columns_list_wrapper}>
        <ul className={sortingStyle.columns_list}>
          {createArray?.map((item, index) => (
            <li key={index}>
              <Column index={item.value} state={item.color} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
