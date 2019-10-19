import React from 'react';
import 'styled-components/macro';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
0% {
    background-color: rgba(165, 165, 165, 0.1);
}
50% {
    background-color: rgba(165, 165, 165, 0.3);
}
100% {
    background-color: rgba(165, 165, 165, 0.1);
}
`;

const SkeletonItem = styled.div<{
  height?: string;
  marginBottom?: string;
  width?: string;
}>`
  background: #ccc;
  border-radius: 3px;
  width: ${props => props.width || '50%'};
  height: ${props => props.height || '24px'};
  margin-bottom: ${props => props.marginBottom || '16px'};
  animation: ${pulse} 1s infinite ease-in-out;
`;

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
  isLoading: boolean;
}

const Skeleton = (props: SkeletonProps) => {
  const { className, children, isLoading } = props;
  if (isLoading) {
    return (
      <div
        className={className}
        css={`
          background: #f1f1f1;
          max-width: 100%;
          height: 600px;
          position: relative;
          padding: 2rem;
          overflow: hidden;
        `}
      >
        <SkeletonItem height="144px" width="144px" />
        <SkeletonItem width="80%" />
        <SkeletonItem width="80%" />
        <SkeletonItem width="80%" />
        <SkeletonItem width="80%" />
        <SkeletonItem width="80%" />
        <SkeletonItem width="80%" />
        <SkeletonItem width="80%" />
        <SkeletonItem width="80%" />
        <SkeletonItem width="80%" marginBottom="24px" />
        <SkeletonItem height="350px" width="100%" />
      </div>
    );
  }

  return <div className={className}>{children}</div>;
};

export default Skeleton;
