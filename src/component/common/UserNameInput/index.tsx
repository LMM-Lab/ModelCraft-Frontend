import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import Flex from '../styles/Flex';
import Text from '../Text';
import theme from '@/styles/theme';

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
  display:flex;
  align-items:center;
  justify-content:center;
  white-space:nowrap;
  overflow:hidden;
`

const Input = styled.input<Props>`
  width:${({ width }) => width};
  height:${({ height }) => height};
  font-size:${({ fontSize }) => fontSize};
  border-bottom:1px solid#333;
  background-color:${({ theme }) => theme.colors.background};
  text-align:center;
  line-height: ${(props) => props.height};
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

const UserNameInput = ({ children, onChange, fontSize = '3rem', width = '20rem', height = '7rem' }: UserNameInputProps) => {
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
          <Div onClick={handleInput} width={width} height={height} fontSize={fontSize}>
            {children === '' && <Text $color='#333' style={{ opacity: '50%' }}>Name</Text>}
            {children}
          </Div>
          <FontAwesomeIcon icon={faPen} style={{ fontSize: '2rem', cursor: 'pointer', marginTop: 'auto', marginBottom: '1rem',color:'#333' }} onClick={handleInput} />
        </Flex>
      ) : (
        <Flex>
          <Input width={width} height={height} fontSize={fontSize} onBlur={handleInputEdit} defaultValue={children} onChange={onChange} autoFocus />
          <FontAwesomeIcon icon={faPen} style={{ fontSize: '2rem', color:`${theme.colors.background}`}} onClick={handleInput} />
        </Flex>
        )
      }
    </div>
  )
}

export default UserNameInput