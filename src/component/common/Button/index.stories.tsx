import { Meta,StoryObj } from "@storybook/react";
import Button from ".";

const meta={
  title:'Atoms/Button',
  component:Button,
  argTypes: {
    $variants: {
      control: 'radio',
      options: ['Small','Medium','Large','Icon'],
      description: 'ボタンのサイズを指定します',
    },
    $padding: { control: 'text', description: 'ボタンの左右のパディング' },
    children: { control: 'text', description: 'ボタン内のテキスト' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story=StoryObj<typeof Button>

export const button:Story={
  args:{
    children:'train',
    $variants:'Small',
  }
}