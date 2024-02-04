import React from "react";
import HeaderToolbar from "./HeaderToolbar";

export default {
    title: "Components/HeaderToolbar",
    component: HeaderToolbar,
    tags: ['autodocs'],
    argTypes: {
        theme: {
            control: "select",
            options: ["light", "dark"],
        }
    },
};

const Template = (args) => {
    return <HeaderToolbar {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    theme: "light"
};

export const Dark = Template.bind({});
Dark.args = {
    ...Default.args,
    theme: "dark"
};
