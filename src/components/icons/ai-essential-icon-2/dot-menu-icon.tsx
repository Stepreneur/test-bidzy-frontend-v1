import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const DotMenuIcon = ({
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
        <circle
          cx='11.5'
          cy='11.5'
          r='1.5'
          className={className}
        />
        <circle
          cx='11.5'
          cy='5.5'
          r='1.5'
          className={className}
        />
        <circle
          cx='11.5'
          cy='17.5'
          r='1.5'
          className={className}
        />
      </svg>
    </>
  );
};

export default DotMenuIcon;
