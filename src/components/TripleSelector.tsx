// import React, {FC} from 'react';
// import styled from 'styled-components';

// interface IProps {
//     // id: string;
//     // reducer: string;
//     // option1: string;
//     // option2: string;
//     // state: any
//     // setValue_action: (id: string, reducer: string, value: string | number | boolean, childId: string) => void;
// }
// //id, reducer, option1, option2, state, setValue_action
// export const TripleSelect: FC<IProps> = ({}) => {

//   //const selected = state[reducer][id]                                                                                             //enters the reducer and grabs the corrosponding value to show if it is selected or not
//   return (
//     <Wrapper>
//                     <Option>
//                        Kelsey
//                    </Option>
//                     <Option>
//                       Joint
//                    </Option>
//       <Option>  
//         Ben
//                    </Option>
//                       <Pill></Pill>
//     </Wrapper>
//   );
// }

// //---------------------------STYLES-------------------------------------------//

// const Wrapper = styled.div`
//         display: inline-flex;
//         height: 40px;
//         background-color: rgb(230, 228, 227);
//         box-shadow: rgba(64, 62, 61, 0.05) 0px 3px 10px 0px;
//         margin: 0px;
//         padding: 0px;
//         border-radius: 25px;
// `
// interface OProps {
//   selected: boolean
// }
// // interface PProps {
// //   selected: string
// //   option1: string
// // }

// const Option = styled.div`
//         position: relative;
//         min-width: 16rem;
//         color: ${props => props.selected ? props.theme.color.ice : "grey"};
//         text-align: center;
//         z-index: 1;
//         transition: all 100ms linear 0s;
//         margin: 0px;
//         border-radius: 2.5rem;
//         text-transform: Capitalize;
//         cursor: pointer;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: ${props => props.theme.fontSize.smallMedium};
// `
// const Pill = styled.div<PProps>`
//         position: absolute;
//         min-width: 16rem;
//         height: 40px;
//         background-color: ${props => props.theme.color.primary};
//         transform: ${props => props.selected === props.option1 ? "translate(0,0)" : "translateX(100%)"};
//         transition: all .3s ease;
//         border-radius: 25px;
//         animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
// }
// `

export { }
