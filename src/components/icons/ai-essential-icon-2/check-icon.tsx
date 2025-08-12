import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const CheckIcon = ({
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
          d='M8.9999 16.17L5.5299 12.7C5.34292 12.513 5.08933 12.4079 4.8249 12.4079C4.56048 12.4079 4.30688 12.513 4.1199 12.7C3.93292 12.8869 3.82788 13.1405 3.82788 13.405C3.82788 13.5359 3.85367 13.6655 3.90377 13.7865C3.95388 13.9075 4.02732 14.0174 4.1199 14.11L8.2999 18.29C8.6899 18.68 9.3199 18.68 9.7099 18.29L20.2899 7.70996C20.4769 7.52298 20.5819 7.26938 20.5819 7.00496C20.5819 6.74053 20.4769 6.48693 20.2899 6.29996C20.1029 6.11298 19.8493 6.00793 19.5849 6.00793C19.3205 6.00793 19.0669 6.11298 18.8799 6.29996L8.9999 16.17Z'
          className={className}
        />
      </svg>
    </>
  );
};

export default CheckIcon;
