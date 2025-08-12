import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const ChevronRightIcon = ({
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
          d='M8.625 5.25L15.375 12L8.625 18.75'
          stroke='#27265C'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </>
  );
};

export default ChevronRightIcon;
