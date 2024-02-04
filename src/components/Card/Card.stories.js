import React from 'react';
import Card from './Card';
import '../../Variables.scss';
import '../../components/Icon/Icon.scss';
import { iconMap, colours } from '../../stories/components/Helpers';


export default {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: colours,
        },
        label: { control: 'text' },
        metric: { control: 'number' },
        metricSymbol: { control: 'text' },
        metricDecimal: { control: 'number' },
        icon: { 
            control: 'select',
            options: Object.keys(iconMap)
        },
        invertIconColor: { control: 'boolean' }
    },
};

const Template = (args) => {
    // Update the `icon` prop to pass the selected icon component
    const iconArgs = { ...args, icon: args.icon ? iconMap[args.icon] : null};
    
    return <Card {...iconArgs} />;
};

export const Default = Template.bind({});
Default.args = {
    color: 'blue',
    label: 'Total Sales',
    metric: 10,
    metricSymbol: '£',
    metricDecimal: 2,
    icon: 'Coins',
    invertIconColor: false
};

export const NoIcon = Template.bind({});
NoIcon.args = {
    ...Default.args,
    icon: null, // Demonstrates appearance without an icon
};
