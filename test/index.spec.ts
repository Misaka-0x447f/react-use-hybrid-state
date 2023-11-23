import { renderHook, act } from '@testing-library/react-hooks';
import { useHybridState } from '../src';

describe('useData', () => {
  test('should fetch data and update state', () => {
    const { result } = renderHook(() => useHybridState(false));
    const [state, setState, stateRef] = result.current;

    act(() => {
      setState(true);
    });

    expect(stateRef.current).toEqual(true);
    expect(state).toEqual(false);
  });
});
