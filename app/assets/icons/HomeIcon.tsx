import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface HomeIconProps {
  color?: string;
  size?: number;
}

export const HomeIcon: React.FC<HomeIconProps> = ({ color = '#004d40', size = 27 }) => {
  return (
    <Svg 
      width={size} 
      height={size} 
      viewBox="0 0 23 23" 
      fill="none"
    >
      <Path 
        d="M20.7368 5.53487L14.1194 0.904998C12.3157 -0.35874 9.54693 -0.289809 7.8122 1.05435L2.05645 5.54636C0.907594 6.44247 0 8.28063 0 9.72813V17.6552C0 20.5848 2.37813 22.9744 5.3077 22.9744H17.6923C20.6219 22.9744 23 20.5963 23 17.6667V9.87748C23 8.32659 22.0005 6.41949 20.7368 5.53487ZM12.3616 18.379C12.3616 18.85 11.971 19.2406 11.5 19.2406C11.029 19.2406 10.6383 18.85 10.6383 18.379V14.9324C10.6383 14.4614 11.029 14.0708 11.5 14.0708C11.971 14.0708 12.3616 14.4614 12.3616 14.9324V18.379Z" 
        fill={color} 
      />
    </Svg>
  );
};

export default HomeIcon;
