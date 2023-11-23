import { isFunction, isObjectLike } from 'lodash-es';
import {
  useCallback,
  useRef,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';

/**
 * @author 447f@misaka.com
 * this hook allows reading an updated state value
 * immediately by an extra ref.
 * write to this ref is **not allowed** and should
 * trigger an error.
 * @example
 * >>>
 * const [value, setValue, valueRef] = useHybridState(null)
 * const submit = () => {
 *   // here we need to upload the latest value immediately.
 *   updateValueByPostV1(valueRef.current)
 * }
 * const change = (offset: number) => {
 *   // and here, since no need of immediately update,
 *   // we use the value.
 *   setValue(value + offset)
 * }
 *
 * // in the render part use of reactively value is required.
 * return (
 *   <div>{value}</div>
 * )
 */
export const useHybridState = <T>(initialValue: T) => {
  const [state, setState] = useState(initialValue);
  const ref = useRef(initialValue);
  const set = useCallback((val: T) => {
    if (isFunction(val)) {
      ref.current = val(ref.current);
    } else {
      ref.current = val;
    }
    setState(val);
  }, []);
  const refBehindProxy = useMemo(
    () =>
      new Proxy(ref, {
        set: () => {
          throw new Error(
            "Do not change value of this ref, it's readonly. Instead, use the set method."
          );
        },
      }),
    []
  );
  return [state, set, refBehindProxy] as [
    typeof state,
    Dispatch<SetStateAction<T>>,
    {
      readonly current: T;
    },
  ];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useHybridUpdateState = <T>(initialValue: T) => {
  const [state, setState, stateRef] = useHybridState<Partial<T>>(initialValue);
  const updateState = (partialState: Partial<T>) => {
    if (!isObjectLike(partialState)) {
      console.error(
        'useHybridUpdateState: partialState seems not an object and cannot be updated at this time: ',
        partialState
      );
      throw new Error('useHybridUpdateState: Check error above.');
    }
    setState(prevState => Object.assign({}, prevState, partialState));
  };
  return { state, updateState, stateRef, setState };
};
