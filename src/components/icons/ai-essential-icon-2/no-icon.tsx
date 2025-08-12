import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const NoIcon = ({
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
          d='M6.41789 6.41789C6.80842 6.02737 7.44158 6.02737 7.83211 6.41789L12 10.5858L16.1679 6.41789C16.5584 6.02737 17.1916 6.02737 17.5821 6.41789C17.9726 6.80842 17.9726 7.44158 17.5821 7.83211L13.4142 12L17.5821 16.1679C17.9726 16.5584 17.9726 17.1916 17.5821 17.5821C17.1916 17.9726 16.5584 17.9726 16.1679 17.5821L12 13.4142L7.83211 17.5821C7.44158 17.9726 6.80842 17.9726 6.41789 17.5821C6.02737 17.1916 6.02737 16.5584 6.41789 16.1679L10.5858 12L6.41789 7.83211C6.02737 7.44158 6.02737 6.80842 6.41789 6.41789Z'
          className={className}
        />
      </svg>
    </>
  );
};

export default NoIcon;
