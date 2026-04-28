import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

/* ─── Types ────────────────────────────────────────── */
export type Route = '/' | '/menu' | '/reservaciones' | '/reservar';

interface RouterContextValue {
  path: Route;
  navigate: (to: Route) => void;
}

/* ─── Context ──────────────────────────────────────── */
const RouterContext = createContext<RouterContextValue>({
  path: '/',
  navigate: () => {},
});

export function useRouter() {
  return useContext(RouterContext);
}

/* ─── Provider ─────────────────────────────────────── */
export function RouterProvider({ children }: { children: React.ReactNode }) {
  const getPath = (): Route => {
    const p = window.location.pathname as Route;
    const valid: Route[] = ['/', '/menu', '/reservaciones', '/reservar'];
    return valid.includes(p) ? p : '/';
  };

  const [path, setPath] = useState<Route>(getPath);

  const navigate = useCallback((to: Route) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const onPop = () => setPath(getPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

/* ─── Link component ───────────────────────────────── */
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: Route;
  children: React.ReactNode;
}

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

/* ─── Routes / Route ───────────────────────────────── */
export function Routes({ children }: { children: React.ReactNode }) {
  const { path } = useRouter();

  let matched: React.ReactNode = null;
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const { path: routePath, element } = child.props as { path: string; element: React.ReactNode };
    if (matched) return;
    if (routePath === path) matched = element;
    if (routePath === '*' && !matched) matched = element;
  });

  return <>{matched}</>;
}

export function Route(_props: { path: string; element: React.ReactNode }) {
  return null; // handled by Routes
}
