import React from 'react';
import Icon from './Icon'; // Adjust the path according to your project structure
import { FaCoins, FaMoneyBillWave } from "react-icons/fa6";
import { FcMultipleDevices } from "react-icons/fc";

// Define your icons mapping
const icons = {
  Coins: FaCoins,
  Bill: FaMoneyBillWave,
  Devices: FcMultipleDevices,
};

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(icons), // Populate the dropdown with icon names from the `icons` object
    },
    color: {
      control: 'select',
      options: ['blue', 'green', 'pink', 'purple'],
    },
    invertIconColor: {
      control: 'boolean',
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

const Template = (args) => {
    // Correctly resolving the icon component from the selected icon name
    const IconComponent = icons[args.icon];
    // Spread the remaining args and explicitly pass the resolved icon component to the Icon wrapper
    return <Icon {...args} icon={IconComponent} />;
};

export const Default = Template.bind({});
Default.args = {
  icon: 'Coins', // Default selected icon
  color: 'blue',
  invertIconColor: false,
  size: 'md',
};

export const Inverted = Template.bind({});
Inverted.args = {
  ...Default.args,
  invertIconColor: true,
};
