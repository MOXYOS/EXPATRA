"use client"
import { useTranslations } from "next-intl"
import { motion, useInView, animate } from "framer-motion"
import { useRef, useEffect } from "react"
import { fadeUp } from "@/lib/animations"
import { Users, FileCheck, Landmark, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

function Counter({ from, to, duration = 2.5 }: { from: number; to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.floor(value).toLocaleString() + (to >= 1000 ? "+" : "")
          }
        }
      })
      return () => controls.stop()
    }
  }, [from, to, inView, duration])

  return <span ref={ref}>{from}</span>
}

export function StatsRow() {
  const t = useTranslations("stats")

  const stats = [
    { value: 5000, label: t("advised"), prefix: "", icon: <Users className="size-6 text-accent" /> },
    { value: 3200, label: t("visas"), prefix: "", icon: <FileCheck className="size-6 text-accent" /> },
    { value: 50, label: t("fdi"), prefix: "$", icon: <Landmark className="size-6 text-accent" /> },
    { value: 2000, label: t("health"), prefix: "", icon: <Heart className="size-6 text-accent" /> }
  ]

  return (
    <div className="relative z-20 -mt-16 mx-4 sm:mx-8 lg:mx-auto max-w-7xl">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-primary/10 border border-white/50">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "flex flex-col items-center justify-center p-8 text-center rounded-[2rem] transition-all duration-500 hover:bg-surface group",
              idx % 2 === 0 ? "bg-surface/50" : "bg-transparent"
            )}
          >
            <div className="mb-4 bg-white size-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="font-display text-4xl font-black text-primary mb-1 flex items-center tracking-tight">
              {stat.prefix}
              <Counter from={0} to={stat.value} />
              {stat.label === t("fdi") && "M"}
            </div>
            <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest leading-none opacity-80">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
