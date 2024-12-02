import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

export default function ResponsiveContainer({
  children,
  className = '',
  maxWidth = 'xl',
  padding = true,
}: ResponsiveContainerProps) {
  return (
    <div 
      className={`
        w-full mx-auto 
        ${padding ? 'px-4 sm:px-6 lg:px-8' : ''} 
        ${maxWidthClasses[maxWidth]} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}