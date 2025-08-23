import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const ChevronDownIcon = ({
  width = '24',
  height = '24',
  viewBox = '0 0 24 24',
  fill = 'none',
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
        fill={fill}
        {...props}
      >
        <path
          d='M5.25 8.625L12 15.375L18.75 8.625'
          stroke='#27265C'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </>
  );
};

export default ChevronDownIcon;
