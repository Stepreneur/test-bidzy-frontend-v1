import { twMerge } from 'tailwind-merge';
import { IconSVGProps } from '../types/icon-svg';

const DeleteIcon = ({
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
          d='M16.7251 7.22215C17.1547 7.65173 17.1547 8.34821 16.7251 8.77779L8.7777 16.7252C8.34813 17.1547 7.65164 17.1547 7.22207 16.7252C6.79249 16.2956 6.79249 15.5991 7.22207 15.1695L15.1694 7.22215C15.599 6.79258 16.2955 6.79258 16.7251 7.22215Z'
          className={className}
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M16.7251 16.7252C16.2955 17.1548 15.5991 17.1548 15.1695 16.7252L7.2221 8.77782C6.79252 8.34825 6.79252 7.65177 7.2221 7.22219C7.65168 6.79261 8.34816 6.79261 8.77773 7.22219L16.7251 15.1696C17.1547 15.5991 17.1547 16.2956 16.7251 16.7252Z'
          className={className}
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M11.9999 3.85002C7.49878 3.85002 3.8499 7.4989 3.8499 12C3.8499 16.5011 7.49878 20.15 11.9999 20.15C16.501 20.15 20.1499 16.5011 20.1499 12C20.1499 7.4989 16.501 3.85002 11.9999 3.85002ZM2.1499 12C2.1499 6.56002 6.5599 2.15002 11.9999 2.15002C17.4399 2.15002 21.8499 6.56002 21.8499 12C21.8499 17.44 17.4399 21.85 11.9999 21.85C6.5599 21.85 2.1499 17.44 2.1499 12Z'
          className={className}
        />
      </svg>
    </>
  );
};

export default DeleteIcon;
