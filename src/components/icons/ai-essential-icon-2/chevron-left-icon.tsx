import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const ChevronLeftIcon = ({
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
          d='M15.375 5.25L8.625 12L15.375 18.75'
          stroke='#27265C'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </>
  );
};

export default ChevronLeftIcon;
