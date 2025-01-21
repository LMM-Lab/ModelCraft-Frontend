import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import Flex from '../styles/Flex';

type Props = {
  width?: string
  fontSize?: string
  value?: string
  height?: string
}

const Div = styled.div<Props>`
  width:${({ width }) => width};
  height:${({ height }) => height};
  font-size:${({ fontSize }) => fontSize};
  border-bottom:1px solid#333;
  background-color:${({ theme }) => theme.colors.background};
  line-height: ${(props) => props.height};
  text-align:center;
`

const Input = styled.input<Props>`
  width:${({ width }) => width};
  height:${({ height }) => height};
  font-size:${({ fontSize }) => fontSize};
  border-bottom:1px solid#333;
  background-color:${({ theme }) => theme.colors.background};
  text-align:center;
  &:focus{
    outline:none;
  }
`

type UserNameInputProps = {
  children: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  fontSize?: string
  width?: string
  height?: string
}

const UserNameInput = ({ children, onChange, fontSize = '40px', width = '200px', height = '70px' }: UserNameInputProps) => {
  const [isEditing, setIsEditing] = useState(true)

  const handleInput = () => {
    setIsEditing(false)
  }
  const handleInputEdit = () => {
    setIsEditing(true)
  }

  return (
    <div>
      {isEditing ? (
        <Flex>
          <Div width={width} height={height} fontSize={fontSize}>{children}</Div>
          <FontAwesomeIcon icon={faPen} style={{ fontSize: '2rem',cursor:'pointer',marginTop:'auto',marginBottom:'1rem'}} onClick={handleInput} />
        </Flex>
      ) : (
        <Input width={width} height={height} fontSize={fontSize} onBlur={handleInputEdit} defaultValue={children} onChange={onChange} autoFocus />)
      }
    </div>
  )
}

export default UserNameInput