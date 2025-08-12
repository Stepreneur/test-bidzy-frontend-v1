import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const MoveHorizontalIcon = ({
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
          d='M18 13C19.1 13 20 13.9 20 15C20 16.1 19.1 17 18 17C16.9 17 16 16.1 16 15C16 13.9 16.9 13 18 13ZM10 15C10 16.1 10.9 17 12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15ZM4 15C4 16.1 4.9 17 6 17C7.1 17 8 16.1 8 15C8 13.9 7.1 13 6 13C4.9 13 4 13.9 4 15ZM8 9C8 7.9 7.1 7 6 7C4.9 7 4 7.9 4 9C4 10.1 4.9 11 6 11C7.1 11 8 10.1 8 9ZM10 9C10 10.1 10.9 11 12 11C13.1 11 14 10.1 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9ZM16 9C16 10.1 16.9 11 18 11C19.1 11 20 10.1 20 9C20 7.9 19.1 7 18 7C16.9 7 16 7.9 16 9Z'
          className={className}
        />
      </svg>
    </>
  );
};

export default MoveHorizontalIcon;
