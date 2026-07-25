'use client'

import { useTheme } from 'next-themes'

// Hook de conveniência que centraliza o acesso ao tema da aplicação.
// O provider real (ThemeProvider do next-themes) fica em app/providers.tsx;
// este arquivo existe para que os componentes importem sempre da mesma
// fonte (@/contexts/ThemeContext) caso a implementação de tema mude no futuro.
export function useAppTheme() {
  const { theme, setTheme, systemTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return { theme, setTheme, toggleTheme, systemTheme }
}
