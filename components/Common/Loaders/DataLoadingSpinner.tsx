import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

type DataLoadingSpinnerProps = {
  main?: boolean;
  small?: boolean;
  noPadding?: boolean;
};

const DataLoadingSpinner = ({ main = true, small, noPadding }: DataLoadingSpinnerProps) => {
  const spinnerSize = small ? { width: '20px', height: '20px' } : { width: '30px', height: '30px' };
  return (
    <div className={`items-center justify-center ${noPadding ? '' : 'loaderWrapper'} ${main ? 'main' : ''}`}>
      <ProgressSpinner style={spinnerSize} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>
  );
};

export default DataLoadingSpinner;