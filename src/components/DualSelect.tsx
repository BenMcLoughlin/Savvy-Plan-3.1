import React, {FC} from 'react';
import styled from 'styled-components';

interface IProps {
    id: string;
    onClick?: () => void
    reducer: string;
    option1: string;
    option2: string;
    value1: string | number;
    value2: string | number;
    state: any
    setValue_action: (id: string, reducer: string, value: any, childId?: any) => void;
}

export const DualSelect: FC<IProps> = ({id ,onClick, reducer, option1, option2, state, setValue_action, value1, value2}) => {

  const selected = state.ui_reducer.selectedOption                                                                                          //enters the reducer and grabs the corrosponding value to show if it is selected or not

  return (
    <Wrapper>
                    <Option onClick={() =>  {
                      if(onClick) {onClick()}
                      setValue_action(id, reducer, value1)
                      setValue_action("selectedOption", "ui_reducer", option1)}
                    }
                         selected={ selected === option1}
                   >
                       {option1}
                   </Option>
                   <Option onClick={() => {
                          setValue_action("selectedOption", "ui_reducer", option2)
                          setValue_action(id, reducer, value2)
                   } }
                           selected={selected.length === 0 || selected === option2}                                                //when the page first loads it sets both colors to grey but I want the initial color or the bar to be white
                   >   {option2}
                   </Option>
                      <Pill
                        selected={selected}
                        option1={option1}
                      ></Pill>
    </Wrapper>
  );
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
        display: inline-flex;
        height: 40px;
        background-color: rgb(230, 228, 227);
        box-shadow: rgba(64, 62, 61, 0.05) 0px 3px 10px 0px;
        margin: 0px;
        padding: 0px;
        border-radius: 25px;
`
interface OProps {
  selected: boolean
}
interface PProps {
  selected: string
  option1: string
}

const Option = styled.div<OProps>`
        position: relative;
        min-width: 16rem;
        color: ${props => props.selected ? props.theme.color.ice : "grey"};
        text-align: center;
        z-index: 1;
        transition: all 100ms linear 0s;
        margin: 0px;
        border-radius: 2.5rem;
        text-transform: Capitalize;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${props => props.theme.fontSize.smallMedium};
`
const Pill = styled.div<PProps>`
        position: absolute;
        min-width: 16rem;
        height: 40px;
        background-color: ${props => props.theme.color.primary};
        transform: ${props => props.selected === props.option1 ? "translate(0,0)" : "translateX(100%)"};
        transition: all .3s ease;
        border-radius: 25px;
        animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
}
`