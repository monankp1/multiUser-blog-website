import React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider } from 'antd';

const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];

const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

const ButtonComponent = ({ name, onClick, className }) => (

    <ConfigProvider
        theme={{
            components: {
                Button: {
                    colorPrimary: `linear-gradient(90deg, ${colors2.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                    colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                    lineWidth: 0,
                },
            },
        }}
    >
        <Button type='primary' size='large' onClick={() => onClick()}  className={className}>{name}</Button>
    </ConfigProvider>
);
export default ButtonComponent;