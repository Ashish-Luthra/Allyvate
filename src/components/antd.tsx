import type { ReactNode } from 'react';

type SpinProps = {
  size?: 'small' | 'default' | 'large';
};

type AlertProps = {
  message: ReactNode;
  description?: ReactNode;
  type?: 'success' | 'info' | 'warning' | 'error';
  showIcon?: boolean;
};

export function Spin({ size = 'default' }: SpinProps) {
  return (
    <div
      aria-label="Loading"
      className={`spin spin-${size}`}
      role="status"
    />
  );
}

export function Alert({ message, description, type = 'info', showIcon = false }: AlertProps) {
  return (
    <section className={`alert alert-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      {showIcon ? <span aria-hidden="true" className="alert-icon">{iconByType[type]}</span> : null}
      <div>
        <h2>{message}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </section>
  );
}

const iconByType = {
  error: '!',
  info: 'i',
  success: 'ok',
  warning: '!',
};
