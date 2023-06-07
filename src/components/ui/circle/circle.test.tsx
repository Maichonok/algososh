import TestRenderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Проверка Circle", () => {
  it('Кружок без текста', ()=>{
    const circle = TestRenderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  })
  it('Кружок с текстом',()=>{
    const circle = TestRenderer.create(<Circle letter="Текст"/>).toJSON();
    expect(circle).toMatchSnapshot();
  })
  it('Кружок с head',()=>{
    const circle = TestRenderer.create(<Circle head={'123'}/>).toJSON();
    expect(circle).toMatchSnapshot();
  })
  it('Кружок с реакт эл-том в head',()=>{
    const circle = TestRenderer.create(<Circle head={<Circle isSmall={true} />}/>).toJSON();
    expect(circle).toMatchSnapshot();
  })
  it('Кружок с tail',()=>{
    const circle = TestRenderer.create(<Circle tail={'123'}/>).toJSON();
    expect(circle).toMatchSnapshot();
  })
  it('Кружок с реакт эл-том в tail',()=>{
    const circle = TestRenderer.create(<Circle tail={<Circle isSmall={true} />}/>).toJSON();
    expect(circle).toMatchSnapshot();
  })
  it('Кружок с index',()=>{
    const circle = TestRenderer.create(<Circle index={123}/>).toJSON();
    expect(circle).toMatchSnapshot();
  })
  it('Кружок с пропсом small',()=>{
    const circle = TestRenderer.create(<Circle isSmall={true}/>).toJSON();
    expect(circle).toMatchSnapshot();
  })
  it('Кружок с default',()=>{
    const circle = TestRenderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(circle).toMatchSnapshot();
  })
  it('Кружок с Changing',()=>{
    const circle = TestRenderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
    expect(circle).toMatchSnapshot();
  })
  it('Кружок с Modified',()=>{
    const circle = TestRenderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
    expect(circle).toMatchSnapshot();
  })
});
