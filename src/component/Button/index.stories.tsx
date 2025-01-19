import { Meta,StoryObj } from "@storybook/react";
import Button from ".";

const meta={
  title:'Atoms/Button',
  component:Button,
  argTypes: {
    backcolor: { control: 'color', description: '背景色を指定します' },
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: 'ボタンのサイズを指定します',
    },
    padding: { control: 'text', description: 'ボタンのパディングを指定します' },
    children: { control: 'text', description: 'ボタン内のテキスト' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story=StoryObj<typeof Button>

export const normal:Story={
  args:{
    children:'train',
    backcolor:'#9c9696',
    size:'small',
  }
}