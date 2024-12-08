// ThemeToggle.tsx
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full bg-black/20 backdrop-blur-lg border border-white/10 
                     hover:bg-white/10 hover:border-white/20 transition-all
                     dark:bg-white/20 dark:hover:bg-black/20"
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-500 
                          dark:-rotate-90 dark:scale-0 text-white" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-500 
                          dark:rotate-0 dark:scale-100 text-white" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}