import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TodoList } from '../components/List';
import { IItem } from '../utils/interface';
import { ListContext } from '../utils/ListContext';

const list: IItem[] = [
  {
    "name": "Go shopping",
    "status": "active"
  },
  {
    "name": "Learn E",
    "status": "completed"
  }
]

export default {
  title: 'Example/TodoList',
  component: TodoList,
  argTypes: {
  },
  decorators: [
    (Story) => (
      <ListContext.Provider value={{list: list, setList: () => {} }}>
        <Story />
      </ListContext.Provider>
    )
  ]
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args} />;

export const List = Template.bind({});
List.args = {};
