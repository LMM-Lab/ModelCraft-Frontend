import Flex from "@/component/common/styles/Flex"
import styled from "styled-components"
import { log } from "."

const Div=styled.div<{$backgroundColor?:string}>`
  width:4.8rem;
  height:0.7rem;
  margin:0 0.2rem;
  background-color:${({$backgroundColor})=>$backgroundColor};
`

const ProgressBar=({logs}:{logs:log[]})=>{
  const epock=30
  const epockArray=Array.from({length:epock},((_,index)=>index+1))
  return(
    <Flex $width="53rem" $margin="2rem 0 0 3rem">
      {epockArray.map((_,index)=>{
        if(logs[index]?.epoch>index){
          return <Div key={index} $backgroundColor="#4F95D2"></Div>
        } else{
          return <Div key={index} $backgroundColor="#dbdbdb"></Div>
        }
      })}
    </Flex>
  )
}

export default ProgressBar