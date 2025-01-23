import React from "react";

type BentArrwProps={
  width?:string
  height?:string
}

const BentArrow = ({width='90rem',height='auto'}:BentArrwProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 900 150"
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin:'0 auto',display:'block'}}
    >
      <path
        d="M864 19 V20 H865 V19 H864
           M8 19 V18 H7 V19 H8
           M7 36 C7.5 36.5 8.5 36.5 9 36
           L15 30
           C15.5 29.5 15.5 28.5 15 28
           L8 34 L2 28
           C1.5 27.5 0.5 27.5 0 28
           L7 36
           M863 0 V19 H865 V0 H863
           M864 18 L8 18 V20 L864 20
           M7 19 V35 H9 V19 H7"
        fill="black"
      />
    </svg>
  );
};

export default BentArrow;
