import { useState, forwardRef } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="password-input-wrapper">
        <input
          {...props}
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={`input ${className}`}
        />
        <span
          className="password-toggle"
          onClick={toggleVisibility}
          title={showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
        >
          {showPassword ? <VisibilityOff fontSize="medium" /> : <Visibility fontSize="medium" />}
        </span>
      </div>
    );
  }
);