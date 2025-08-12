import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const CheckedBoxIcon = ({
  width = '16',
  height = '16',
  viewBox = '0 0 16 16',
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
          width={width}
          height={height}
          rx='4'
          fill='#82BCFF'
        />
        <path
          d='M6.00002 10.7801L3.68668 8.46672C3.56203 8.34207 3.39297 8.27204 3.21668 8.27204C3.0404 8.27204 2.87133 8.34207 2.74668 8.46672C2.62203 8.59137 2.552 8.76043 2.552 8.93672C2.552 9.024 2.56919 9.11044 2.6026 9.19108C2.636 9.27172 2.68496 9.345 2.74668 9.40672L5.53335 12.1934C5.79335 12.4534 6.21335 12.4534 6.47335 12.1934L13.5267 5.14005C13.6513 5.0154 13.7214 4.84634 13.7214 4.67005C13.7214 4.49377 13.6513 4.3247 13.5267 4.20005C13.402 4.0754 13.233 4.00537 13.0567 4.00537C12.8804 4.00537 12.7113 4.0754 12.5867 4.20005L6.00002 10.7801Z'
          fill='white'
        />
      </svg>
    </>
  );
};

export default CheckedBoxIcon;
