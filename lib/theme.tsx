"use client"

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
    systemTheme: 'dark' | 'light'
}

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
    systemTheme: 'dark'
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    enableSystem = true,
    disableTransitionOnChange = false,
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme)
    const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('dark')

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = () => {
            setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
        }

        handleChange()

        if (enableSystem) {
            mediaQuery.addEventListener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        }
    }, [enableSystem])

    useEffect(() => {
        const root = window.document.documentElement

        if (disableTransitionOnChange) {
            root.classList.add('[&_*]:!transition-none')
            setTimeout(() => root.classList.remove('[&_*]:!transition-none'), 0)
        }

        root.classList.remove('light', 'dark')

        const activeTheme = theme === 'system' ? systemTheme : theme
        root.classList.add(activeTheme)

        root.style.colorScheme = activeTheme
    }, [theme, systemTheme, disableTransitionOnChange])

    return (
        <ThemeProviderContext.Provider
            value={{ theme, setTheme, systemTheme }}
        >
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export type { Theme, ThemeProviderProps }