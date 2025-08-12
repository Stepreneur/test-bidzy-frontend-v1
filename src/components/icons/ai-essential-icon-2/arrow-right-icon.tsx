import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const ArrowRightIcon = ({
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
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M11.2408 5.34923C11.6002 4.9299 12.2315 4.88134 12.6508 5.24076L19.6508 11.2408C19.8725 11.4307 20 11.7081 20 12C20 12.2919 19.8725 12.5693 19.6508 12.7593L12.6508 18.7593C12.2315 19.1187 11.6002 19.0701 11.2408 18.6508C10.8813 18.2315 10.9299 17.6002 11.3492 17.2408L17.4634 12L11.3492 6.75927C10.9299 6.39985 10.8813 5.76855 11.2408 5.34923Z'
          className={className}
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M4.1001 12C4.1001 11.5029 4.50304 11.1 5.0001 11.1L19.0001 11.1C19.4972 11.1 19.9001 11.5029 19.9001 12C19.9001 12.497 19.4972 12.9 19.0001 12.9L5.0001 12.9C4.50304 12.9 4.1001 12.497 4.1001 12Z'
          className={className}
        />
      </svg>
    </>
  );
};

export default ArrowRightIcon;
