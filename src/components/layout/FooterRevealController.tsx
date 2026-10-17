"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Footer V7.0: in-flow reveal, never a fixed overlay.
 * Desktop split homepage: BOTH panes must reach their own bottom.
 * Other pages / mobile: document must reach the bottom.
 * Then require three distinct extra downward wheel/trackpad gestures.
 */
export default function FooterRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>("body > footer") ??
      document.querySelector<HTMLElement>("footer");
    if (!footer) return;

    const REQUIRED_GESTURES = 3;
    const BOTTOM_EPSILON = 8;
    const GESTURE_IDLE_MS = 170;
    const ARM_DELAY_MS = 160;
    const TRACKPAD_THRESHOLD_PX = 38;
    const REVEAL_MS = 520;

    let gestureCount = 0;
    let lastWheelAt = -Infinity;
    let wheelTravel = 0;
    let gestureRecorded = false;
    let armedAt = -Infinity;
    let isArmed = false;
    let open = false;
    let isRevealing = false;
    let revealFrame = 0;
    let touchY: number | null = null;
    let touchWasAtBottom = false;

    const scrollRoot = () =>
      document.scrollingElement ?? document.documentElement;

    const bottom = (element: Element) =>
      element.scrollHeight - element.clientHeight - element.scrollTop <= BOTTOM_EPSILON;

    const splitPanes = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return null;
      if (!document.querySelector(".home-split-scroll")) return null;
      const left = document.querySelector<HTMLElement>(".home-profile-pane");
      const right = document.querySelector<HTMLElement>(".home-content-pane");
      return left && right ? { left, right } : null;
    };

    const atContentEnd = () => {
      const panes = splitPanes();
      if (panes) return bottom(panes.left) && bottom(panes.right);
      return bottom(scrollRoot());
    };

    const stopRevealAnimation = () => {
      if (revealFrame) cancelAnimationFrame(revealFrame);
      revealFrame = 0;
      isRevealing = false;
    };

    const clearGestures = () => {
      gestureCount = 0;
      lastWheelAt = -Infinity;
      wheelTravel = 0;
      gestureRecorded = false;
    };

    const close = () => {
      stopRevealAnimation();
      open = false;
      footer.dataset.footerVisible = "false";
      footer.setAttribute("aria-hidden", "true");
      footer.inert = true;
      clearGestures();
    };

    const armIfReady = () => {
      if (!atContentEnd()) {
        isArmed = false;
        clearGestures();
        return false;
      }
      if (!isArmed) {
        isArmed = true;
        armedAt = performance.now();
      }
      return true;
    };

    const openFooter = () => {
      if (open || !atContentEnd()) return;
      open = true;
      // scrollHeight includes the contents even when CSS height = 0.
      const naturalHeight = footer.scrollHeight;
      footer.style.setProperty("--academic-footer-height", `${Math.max(1, naturalHeight)}px`);
      footer.dataset.footerVisible = "true";
      footer.setAttribute("aria-hidden", "false");
      footer.inert = false;

      // Growing an in-flow footer increases page height. Follow that growth
      // frame-by-frame, so the whole content moves UP instead of being covered.
      isRevealing = true;
      const started = performance.now();
      const followPageBottom = (now: number) => {
        if (!open) return;
        const root = scrollRoot();
        const y = Math.max(0, root.scrollHeight - root.clientHeight);
        window.scrollTo(0, y);
        if (now - started < REVEAL_MS) {
          revealFrame = requestAnimationFrame(followPageBottom);
        } else {
          revealFrame = 0;
          isRevealing = false;
        }
      };
      revealFrame = requestAnimationFrame(followPageBottom);
    };

    const registerDownwardGesture = () => {
      if (open) return;
      if (!armIfReady()) return;
      // Reaching the bottom and continuing in the SAME inertial scroll must
      // not trigger the Footer. We require a new intentional movement.
      if (performance.now() - armedAt < ARM_DELAY_MS) return;
      gestureCount += 1;
      if (gestureCount >= REQUIRED_GESTURES) openFooter();
    };

    footer.dataset.footerGated = "true";
    footer.dataset.footerVisible = "false";
    footer.setAttribute("aria-hidden", "true");
    footer.inert = true;
    footer.style.removeProperty("--academic-footer-height");
    armIfReady();

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY < -0.5) {
        if (open) close();
        else if (!atContentEnd()) { isArmed = false; clearGestures(); }
        return;
      }
      if (event.deltaY <= 0.5 || open) return;

      const panes = splitPanes();
      if (panes) {
        // A trackpad gesture can start on a pane gap or its padding.
        // Accept the entire main region once BOTH panes are at bottom.
        const main = document.querySelector("main");
        if (!main || !(event.target instanceof Node) ||
            !main.contains(event.target)) return;
      }
      if (!armIfReady()) return;

      const now = performance.now();
      if (now - lastWheelAt > GESTURE_IDLE_MS) {
        wheelTravel = 0;
        gestureRecorded = false;
      }
      lastWheelAt = now;

      // Normalize trackpad pixels and mouse-wheel lines.
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      wheelTravel += Math.min(160, event.deltaY * unit);
      if (!gestureRecorded && wheelTravel >= TRACKPAD_THRESHOLD_PX) {
        gestureRecorded = true;
        registerDownwardGesture();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchY = touch.clientY;
      touchWasAtBottom = atContentEnd();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchY === null) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      const dy = touchY - touch.clientY;
      touchY = null;
      if (dy < -40 && open) close();
      else if (dy > 42 && touchWasAtBottom) registerDownwardGesture();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement &&
          (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      const upward = ["ArrowUp", "PageUp", "Home"].includes(event.key) ||
        (event.key === " " && event.shiftKey);
      if (upward) { if (open) close(); return; }
      if (event.repeat) return;
      const downward = ["ArrowDown", "PageDown", "End"].includes(event.key) ||
        (event.key === " " && !event.shiftKey);
      if (downward && atContentEnd()) registerDownwardGesture();
    };

    const onScroll = () => {
      if (open) {
        if (isRevealing) return;
        const root = scrollRoot();
        const rootMax = Math.max(0, root.scrollHeight - root.clientHeight);
        // Dragging the main scrollbar back into the content closes Footer.
        if (rootMax - root.scrollTop > footer.scrollHeight + 25) close();
        return;
      }
      if (!atContentEnd()) {
        isArmed = false;
        clearGestures();
      } else {
        armIfReady();
      }
    };

    const onResize = () => {
      close();
      isArmed = false;
      footer.style.removeProperty("--academic-footer-height");
      armIfReady();
    };

    // capture: works with both nested independent panes, mouse wheel and
    // Mac trackpad wheel streams, even if another component stops bubbling.
    window.addEventListener("wheel", onWheel, { passive: true, capture: true });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);

    return () => {
      stopRevealAnimation();
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      footer.removeAttribute("data-footer-gated");
      footer.removeAttribute("data-footer-visible");
      footer.removeAttribute("aria-hidden");
      footer.inert = false;
      footer.style.removeProperty("--academic-footer-height");
    };
  }, [pathname]);

  return null;
}
