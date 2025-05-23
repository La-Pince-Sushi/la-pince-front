import React from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { IParsedError } from '../types'; // Assurez-vous que le chemin d'importation est correct

// Options par défaut pour les toasts
const defaultToastOptions: ToastOptions = {
  position: "top-right",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

// Interface pour le contenu des toasts qui peuvent avoir un message principal et des détails
export interface IToastContent {
  message: string;
  details?: string[];
}

// Composant interne pour formater le contenu du toast
const FormattedToastContent: React.FC<IToastContent> = ({ message, details }) => (
  <div>
    <strong>{message}</strong>
    {details && details.length > 0 && (
      <>
        {details.map((detail, index) => (
          <React.Fragment key={index}>
            <br />
            {detail}
          </React.Fragment>
        ))}
      </>
    )}
  </div>
);

export const showErrorToast = (parsedError: IParsedError, options?: ToastOptions) => {
  toast.error(
    <FormattedToastContent message={parsedError.message} details={parsedError.details} />,
    { autoClose: 3000, ...defaultToastOptions, ...options }
  );
};

export const showSuccessToast = (content: string | IToastContent, options?: ToastOptions) => {
  if (typeof content === 'string') {
    toast.success(<FormattedToastContent message={content} />, { autoClose: 2000, ...defaultToastOptions, ...options });
  } else {
    toast.success(<FormattedToastContent message={content.message} details={content.details} />, { autoClose: 2000, ...defaultToastOptions, ...options });
  }
};

export const showInfoToast = (content: string | IToastContent, options?: ToastOptions) => {
  if (typeof content === 'string') {
    toast.info(<FormattedToastContent message={content} />, { autoClose: 4000, ...defaultToastOptions, ...options });
  } else {
    toast.info(<FormattedToastContent message={content.message} details={content.details} />, { autoClose: 4000, ...defaultToastOptions, ...options });
  }
};

export const showWarningToast = (content: string | IToastContent, options?: ToastOptions) => {
  if (typeof content === 'string') {
    toast.warn(<FormattedToastContent message={content} />, { autoClose: 4000, ...defaultToastOptions, ...options });
  } else {
    toast.warn(<FormattedToastContent message={content.message} details={content.details} />, { autoClose: 4000, ...defaultToastOptions, ...options });
  }
};