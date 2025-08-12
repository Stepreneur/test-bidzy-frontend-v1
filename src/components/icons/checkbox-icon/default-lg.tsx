import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const CheckBoxLgIcon = ({
  width = '20',
  height = '20',
  viewBox = '0 0 20 20',
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
        fill='none'
        xmlns={xmlns}
      >
        <rect
          x='0.5'
          y='0.5'
          width={width}
          height={height}
          rx='3.5'
          stroke='#B1B1B1'
        />
      </svg>
    </>
  );
};

export default CheckBoxLgIcon;
