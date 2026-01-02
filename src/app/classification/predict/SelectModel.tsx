'use client'
import { useEffect, useState, useRef } from 'react'
import Text from "@/component/common/Text";
import Flex from "@/component/common/styles/Flex";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { PredictDataType } from './page';

type SelectModelProps={
  setData:React.Dispatch<React.SetStateAction<PredictDataType|null>>;
}

const Div = styled(Flex)`
  position: relative;
  width: 30rem;
  justify-content:center;
  align-items:center;
`

const SelectedBox = styled(Flex)`
  cursor: pointer;
  background: #fff;
  width:20rem;
  justify-content:space-around;
`

const ModelItem = styled(Flex)`
  position: absolute;
  top: 7.5rem;
  left: 3rem;
  z-index: 10;
  border: 1px solid #aaa;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow-y:scroll;
  max-height:12rem;
`

const Item = styled(Flex)`
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  border-radius: 10px;
`


const SelectModel = ({setData}:SelectModelProps) => {
  const [models, setModels] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch(`${baseUrl}/model/model_list`,{
          credentials: "include",
        })
        if (!res.ok) {
          const errorData = await res.json();
          console.log("APIエラー:", errorData.detail);
          return;
        }
        const data = await res.json()
        const modelNamesList: string[] = data.map((model: any) => model.model_name)
        setModels(modelNamesList || [])
      } catch (err) {
        console.log("モデルの取得に失敗しました", err)
      }
    }
    fetchModels()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (model: string) => {
    setSelectedModel(model)
    setData((prev)=>({
      ...prev,
      modelName:model
    }))
    setOpen(false)
  }

  return (
    <Div ref={dropdownRef}>
      <SelectedBox onClick={() => setOpen(!open)} $width="100%" $height="5rem" $border="1px solid #333" $borderRadius="15px" $justify_content="center" $align_items="center">
        <Text $fontSize='2rem'>
          {selectedModel ? selectedModel : 'Select Model'}
        </Text>
        <FontAwesomeIcon icon={faCaretDown} style={{color:'black',fontSize: '2rem' }}/>
      </SelectedBox>
      {open && (
        <ModelItem $flex_direction="column" $width="80%">
          {models.map((model) => (
            <Item key={model} onClick={() => handleSelect(model)} $justify_content="center" $align_items="center" $height="3rem" onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f0f0')} onMouseLeave={(e) => (e.currentTarget.style.background = 'white') }>
              <Text>{model}</Text>
            </Item>
          ))}
        </ModelItem>
      )}
    </Div>
  )
}

export default SelectModel
