"use client"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const langs = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇨🇴" }
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    // Basic replacement for locales. 
    // For root path "/" it might just be "/" if default locale isn't prefixed.
    // Handling that case:
    let newPath = pathname;
    if (pathname === '/' || pathname === `/${locale}`) {
      newPath = `/${newLocale}`;
    } else if (pathname.startsWith(`/${locale}/`)) {
      newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
    } else {
      // If default locale is not prefixed
      newPath = `/${newLocale}${pathname}`;
    }
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-1 border rounded-full p-1 bg-surface/50 backdrop-blur-sm">
      {langs.map(lang => (
        <motion.button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          whileTap={{ scale: 0.9 }}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            locale === lang.code 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={lang.code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5"
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </motion.span>
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  )
}
