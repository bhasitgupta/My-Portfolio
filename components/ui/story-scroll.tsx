'use client';

import React from 'react';

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
  id?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
  id,
  ...props
}) => (
  <section
    id={id}
    aria-label={ariaLabel}
    className={cx('relative min-h-screen w-full overflow-hidden', className)}
    style={{
      background: style.background || style.backgroundColor || 'var(--bg)',
      color: style.color || 'var(--text)',
      ...style,
    }}
    {...props}
  >
    <div
      className={cx(
        'relative flex min-h-screen w-full flex-col justify-between',
      )}
      style={{
        padding: 'clamp(2rem, 6vw, 5rem) clamp(2rem, 7vw, 6rem)',
        gap: '2.5rem',
      }}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  return (
    <main
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden', className)}
    >
      {children}
    </main>
  );
};

export default FlowArt;
