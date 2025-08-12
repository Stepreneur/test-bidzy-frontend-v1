import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const MenuIcon = ({
  width = '24',
  height = '24',
  viewBox = '0 0 24 24',
  fill = '#27265C',
  xmlns = 'http://www.w3.org/2000/svg',
  className = '',
  ...props
}: IconSVGProps) => {
  className = twMerge('fill-icon-primary', className);

  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        xmlns={xmlns}
        {...props}
      >
        <path
          d='M5.33333 18H18.6667C19.125 18 19.5 17.55 19.5 17C19.5 16.45 19.125 16 18.6667 16H5.33333C4.875 16 4.5 16.45 4.5 17C4.5 17.55 4.875 18 5.33333 18ZM5.33333 13H18.6667C19.125 13 19.5 12.55 19.5 12C19.5 11.45 19.125 11 18.6667 11H5.33333C4.875 11 4.5 11.45 4.5 12C4.5 12.55 4.875 13 5.33333 13ZM4.5 7C4.5 7.55 4.875 8 5.33333 8H18.6667C19.125 8 19.5 7.55 19.5 7C19.5 6.45 19.125 6 18.6667 6H5.33333C4.875 6 4.5 6.45 4.5 7Z'
          className={className}
        />
      </svg>
    </>
  );
};

export default MenuIcon;
