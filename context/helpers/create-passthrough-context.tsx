import { createContext, useContext } from 'react';

export function createPassThroughContext<T, P extends Record<string, unknown>>(
  useHook: (hookProps: P) => T
) {
  const context = createContext<T | undefined>(undefined);
  const { Provider } = context;

  const FirstProvider: React.FC<P> = props => {
    const hookProps = useHook(props);
    return <Provider value={hookProps}>{props.children}</Provider>;
  };

  const ConditionalProvider: React.FC<P> = props => {
    const hierarchicalValue = useContext(context);

    if (!hierarchicalValue) {
      return <FirstProvider {...props} />;
    }

    return <Provider value={hierarchicalValue}>{props.children}</Provider>;
  };

  const useHookContext = () => useContext(context) as T;

  return [ConditionalProvider, useHookContext] as const;
}
