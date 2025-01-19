import { useCallback, useEffect, useState } from 'react';

interface ErrorOptions {
  isShowing: boolean;
  errorType: string | null;
  message: string;
}

const useErrorHook = (options: ErrorOptions) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleError = useCallback((errorType: string | null, message: string) => {
    setErrorMessage(message);
    setShowError(true);
  }, []);

  useEffect(() => {
    if (showError && !options.isShowing) {
      setShowError(false);
    }
  }, [showError, options.isShowing]);

  return { handleError, showError, errorMessage };
};

export default useErrorHook;