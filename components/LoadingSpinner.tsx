
import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className, size = 24, color = '#FFFFFF' }) => (
  <div className={className}>
    <RotatingLines
      visible={true}
      width={String(size)}
      strokeColor={color}
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="loading"
    />
  </div>
);
