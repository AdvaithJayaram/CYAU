import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface NavigationState {
  previousPath: string | null;
  currentPath: string;
}

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    previousPath: null,
    currentPath: location.pathname,
  });

  useEffect(() => {
    setNavigationState((prev) => ({
      previousPath: prev.currentPath,
      currentPath: location.pathname,
    }));
  }, [location]);

  const navigateWithFallback = (
    path: string,
    options?: { fallback?: string; state?: any }
  ) => {
    try {
      navigate(path, { state: options?.state });
    } catch (error) {
      if (options?.fallback) {
        navigate(options.fallback);
      }
    }
  };

  const goBack = () => {
    if (navigationState.previousPath) {
      navigate(navigationState.previousPath);
    } else {
      navigate('/');
    }
  };

  return {
    navigate: navigateWithFallback,
    goBack,
    currentPath: navigationState.currentPath,
    previousPath: navigationState.previousPath,
  };
}