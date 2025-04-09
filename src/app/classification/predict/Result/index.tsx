'use client'
import Output from "./Output";
import PredictTime from "./PredictTime";


const Result=({label,time}:{label?:number,time?:number})=>{
  return (
    <div>
      <Output label={label}></Output>
      <PredictTime time={time}></PredictTime>
    </div>
  )

}

export default Result