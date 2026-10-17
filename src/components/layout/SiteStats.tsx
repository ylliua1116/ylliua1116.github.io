"use client";

import { useEffect, useRef, useState } from "react";
import { useLocaleStore } from "@/lib/stores/localeStore";
import { BarChart3, ExternalLink } from "lucide-react";

/** Display site totals returned by GoatCounter, never a fabricated number. */
export default function SiteStats({
  small = false,
  lastUpdated,
}: {
  small?: boolean;
  lastUpdated?: string;
}) {
  const code = (process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || "").trim();
  const validCode = /^[a-zA-Z0-9-]+$/.test(code);
  const zh = useLocaleStore((state) => state.locale) === "zh";
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !validCode) return;
    const controller = new AbortController();
    fetch(`https://${code}.goatcounter.com/counter/TOTAL.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Public visitor counter unavailable");
        return response.json();
      })
      .then((data: { count?: unknown }) => {
        if (typeof data.count === "string" && /^[0-9][0-9 ,.]*$/.test(data.count.trim())) {
          setCount(data.count);
        } else {
          setFailed(true);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, [inView, validCode, code]);

  return (
    <div
      ref={ref}
      className={`site-end-stats relative overflow-hidden rounded-2xl border border-violet-200/80 dark:border-violet-400/20 bg-gradient-to-br from-[#faf5ff] via-[#ffffff] to-[#f3ebff] dark:from-[#382849] dark:via-[#291d3a] dark:to-[#48325c] ${small ? "px-4 py-4" : "px-5 py-5 sm:px-6 sm:py-6"}`}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-400/10 blur-2xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-serif font-semibold text-primary">Yuli Liu</p>
          <p className="mt-1 text-xs text-violet-600 dark:text-violet-200/75">
            © 2026 · {zh ? "学术个人主页" : "Academic homepage"}
          </p>
          {lastUpdated && (
            <p className="mt-2 text-xs text-neutral-500 dark:text-violet-200/75">
              {zh ? "网站最后更新" : "Site last updated"}: {lastUpdated}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-violet-800 dark:text-violet-100">
          <BarChart3 size={17} aria-hidden="true" />
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs">{zh ? "访问量" : "Site visits"}</span>
            <span className="font-mono text-lg font-bold tabular-nums">{count ?? "—"}</span>
            {!validCode && (
              <span className="text-[10px] text-neutral-500 dark:text-violet-200/65">
                {zh ? "统计尚未配置" : "Counter not configured"}
              </span>
            )}
            {validCode && failed && count === null && (
              <span className="text-[10px] text-neutral-500 dark:text-violet-200/65">
                {zh ? "暂时无法读取" : "Count unavailable"}
              </span>
            )}
          </div>
          {validCode && count !== null && (
            <a
              href={`https://${code}.goatcounter.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 p-1 hover:opacity-70"
              aria-label={zh ? "查看访问统计" : "Open site analytics"}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
