import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('LanguageContext', () => {
  it('provides default language and translations', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe('en');
    expect(result.current.t).toBeTruthy();
    expect(result.current.setLanguage).toBeInstanceOf(Function);
  });

  it('changes language and persists to localStorage', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLanguage('it'));
    expect(result.current.language).toBe('it');
    expect(localStorage.getItem('language')).toBe('it');
  });
});

