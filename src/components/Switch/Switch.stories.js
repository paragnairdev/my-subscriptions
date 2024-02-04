import React from "react";
import Switch from "./Switch";

export default {
    title: "Components/Switch",
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        label: {
          control: "text",
        },
        isOn: {
            control: "boolean",
        },
    },
};

const Template = (args) => {
    return (
        <div style={{width: `200px`}}>
            <Switch {...args} />
        </div>
    );
}

export const Default = Template.bind({});
Default.args = {
    label: "Switch",
    isOn: true,
};

export const On = Template.bind({});
On.args = {
    ...Default.args,
    label: "Switch On",
    isOn: true,
};

export const Off = Template.bind({});
Off.args = {
    ...Default.args,
    label: "Switch Off",
    isOn: false,
};
