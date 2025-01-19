import { Meta,StoryObj } from '@storybook/react';
import Text from '.';

const meta: Meta = {
  title: 'Atoms/Text',
  component: Text,
  argTypes: {
    variants: {
      control: 'select',
      options: ['ExtraSmall', 'Small', 'Medium', 'Large', 'ExtraLarge'],
      description: 'Text variant (predefined styles)',
    },
    color: {
      control: 'color',
      description: 'Text color',
    },
    fontSize: {
      control: 'text',
      description: 'Font size (overrides variant)',
    },
    fontWeight: {
      control: 'text',
      description: 'Font weight (overrides variant)',
    },
    letterSpacing: {
      control: 'text',
      description: 'Letter spacing (overrides variant)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const text:Story={
  args:{
    children:'ModeCraft'
  }
}
