"use client";

import * as React from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxItem {
  title: string;
  caption: string;
  image: string;
  alt: string;
}

export interface CaseStudyLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxItem[];
  currentIndex: number;
  onIndexChange: (newIndex: number) => void;
  systemLabel?: string;
}

export function CaseStudyLightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onIndexChange,
  systemLabel = "System UI Inspection",
}: CaseStudyLightboxProps) {
  const total = items.length;
  const currentItem = items[currentIndex];

  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);

  // Reset loading & error state whenever slide index changes
  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
  }, [currentIndex]);

  // Preload adjacent images (prev & next) for snappy response
  React.useEffect(() => {
    if (!isOpen || total <= 1) return;

    const nextIndex = (currentIndex + 1) % total;
    const prevIndex = (currentIndex - 1 + total) % total;

    const preload = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    if (items[nextIndex]?.image) preload(items[nextIndex].image);
    if (items[prevIndex]?.image) preload(items[prevIndex].image);
  }, [isOpen, currentIndex, items, total]);

  const handlePrev = React.useCallback(() => {
    if (total <= 1) return;
    onIndexChange((currentIndex - 1 + total) % total);
  }, [currentIndex, onIndexChange, total]);

  const handleNext = React.useCallback(() => {
    if (total <= 1) return;
    onIndexChange((currentIndex + 1) % total);
  }, [currentIndex, onIndexChange, total]);

  // Keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          handlePrev();
          break;
        case "Home":
          e.preventDefault();
          onIndexChange(0);
          break;
        case "End":
          e.preventDefault();
          onIndexChange(total - 1);
          break;
      }
    },
    [handleNext, handlePrev, onIndexChange, total]
  );

  // Touch gesture handling (swipe left/right, swipe down to dismiss)
  const touchState = React.useRef<{
    startX: number;
    startY: number;
    startTime: number;
  } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchState.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchState.current.startX;
    const deltaY = touch.clientY - touchState.current.startY;
    const deltaTime = Date.now() - touchState.current.startTime;

    // Reset touch ref
    touchState.current = null;

    // Reject long holds
    if (deltaTime > 800) return;

    // Horizontal swipe: threshold 45px, mostly horizontal
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
      return;
    }

    // Vertical swipe down to dismiss: threshold 70px down
    if (deltaY > 70 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
      onClose();
    }
  };

  if (!currentItem) return null;

  const counterString = `${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        {/* Backdrop overlay */}
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-[#0a0f1d]/95 backdrop-blur-xl transition-opacity duration-200 animate-in fade-in"
        />

        {/* Modal content dialog */}
        <DialogPrimitive.Content
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={onClose}
          aria-describedby="lightbox-caption"
          className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 md:p-8 outline-none select-none overflow-hidden"
        >
          {/* Accessible screen reader announcement for slide changes */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {`Image ${currentIndex + 1} of ${total}: ${currentItem.title}. ${currentItem.caption}`}
          </div>

          {/* TOP BAR: System identifier, counter badge & close button */}
          <header
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex items-center justify-between gap-4 w-full max-w-7xl mx-auto shrink-0 pb-2"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[var(--color-slate)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
                {systemLabel}
              </span>
              <span className="font-mono text-xs md:text-sm font-medium tracking-wider text-[var(--color-gold)] px-2.5 py-0.5 rounded bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 tabular-nums">
                {counterString}
              </span>
            </div>

            {/* Close button with clear WCAG hit target >= 44x44px */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close full-screen image inspection"
                className="group inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3.5 py-2 rounded-full border border-white/15 bg-white/5 text-[var(--color-slate)] hover:text-white hover:border-[var(--color-gold)]/50 hover:bg-white/10 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]"
              >
                <span className="text-xs uppercase tracking-wider mr-1.5 hidden sm:inline text-[var(--color-slate)] group-hover:text-white">
                  Close
                </span>
                <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-[var(--color-slate)] mr-1">
                  Esc
                </kbd>
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </header>

          {/* MAIN STAGE: Image canvas with side navigation buttons */}
          <main className="relative flex-1 flex items-center justify-center w-full max-w-7xl mx-auto my-auto min-h-0 py-2">
            {/* Previous button (Desktop & Tablet left edge) */}
            {total > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous image"
                className="absolute left-0 sm:left-2 z-20 hidden sm:inline-flex items-center justify-center min-w-[48px] min-h-[48px] rounded-full bg-[#1A2642]/80 hover:bg-[#2A354E] border border-white/15 text-white/80 hover:text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
            )}

            {/* Center Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-h-[62vh] sm:max-h-[68vh] md:max-h-[72vh] flex items-center justify-center"
            >
              {/* Loading Spinner */}
              {isLoading && !hasError && (
                <div
                  role="status"
                  aria-label="Loading high resolution screenshot"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--color-slate)]"
                >
                  <Loader2 className="w-8 h-8 animate-spin text-[var(--color-gold)]" />
                  <span className="text-xs tracking-wider uppercase">Loading image...</span>
                </div>
              )}

              {/* Error State */}
              {hasError && (
                <div
                  role="alert"
                  className="flex flex-col items-center justify-center gap-3 p-6 text-center rounded-lg border border-red-500/30 bg-red-950/20 text-[var(--color-pearl)] max-w-md"
                >
                  <AlertCircle className="w-8 h-8 text-red-400" />
                  <p className="text-sm font-medium">Failed to load screenshot.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setHasError(false);
                      setIsLoading(true);
                      setRetryCount((prev) => prev + 1);
                    }}
                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* High-Resolution Screenshot */}
              <div
                className={cn(
                  "relative w-full h-full flex items-center justify-center transition-opacity duration-300",
                  isLoading ? "opacity-0" : "opacity-100"
                )}
              >
                <Image
                  key={`${currentItem.image}-${retryCount}`}
                  src={currentItem.image}
                  alt={currentItem.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
                  className="object-contain rounded-lg shadow-2xl border border-white/10"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                  }}
                />
              </div>
            </div>

            {/* Next button (Desktop & Tablet right edge) */}
            {total > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
                className="absolute right-0 sm:right-2 z-20 hidden sm:inline-flex items-center justify-center min-w-[48px] min-h-[48px] rounded-full bg-[#1A2642]/80 hover:bg-[#2A354E] border border-white/15 text-white/80 hover:text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            )}
          </main>

          {/* BOTTOM BAR: Contextual storytelling caption + navigation pills */}
          <footer
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-4xl mx-auto shrink-0 pt-2"
          >
            <div className="rounded-xl border border-white/15 bg-[#11192B]/90 backdrop-blur-md p-4 sm:p-5 shadow-2xl">
              {/* Mobile Previous / Next Toolbar */}
              {total > 1 && (
                <div className="flex sm:hidden items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="inline-flex items-center gap-1 min-h-[44px] px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-[var(--color-pearl)] active:bg-white/15"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {items.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onIndexChange(idx)}
                        aria-label={`Jump to image ${idx + 1}`}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          idx === currentIndex
                            ? "w-6 bg-[var(--color-gold)]"
                            : "bg-white/30 hover:bg-white/60"
                        )}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next image"
                    className="inline-flex items-center gap-1 min-h-[44px] px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-[var(--color-pearl)] active:bg-white/15"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Title & Contextual Caption */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6">
                <div className="space-y-1.5 flex-1">
                  <DialogPrimitive.Title className="text-base sm:text-lg font-light text-[var(--color-pearl)] flex items-center gap-2">
                    <span className="font-mono text-xs text-[var(--color-gold)] tabular-nums">
                      {counterString}
                    </span>
                    <span className="font-medium text-[var(--color-pearl)]">
                      {currentItem.title}
                    </span>
                  </DialogPrimitive.Title>

                  <p
                    id="lightbox-caption"
                    className="text-xs sm:text-sm text-[var(--color-pearl)]/85 leading-relaxed font-normal"
                  >
                    {currentItem.caption}
                  </p>
                </div>

                {/* Desktop Step Jump Indicators */}
                {total > 1 && (
                  <div
                    role="tablist"
                    aria-label="Screenshots"
                    className="hidden sm:flex items-center gap-2 shrink-0 pt-1"
                  >
                    {items.map((it, idx) => (
                      <button
                        key={it.title}
                        type="button"
                        role="tab"
                        aria-selected={idx === currentIndex}
                        onClick={() => onIndexChange(idx)}
                        aria-label={`Image ${idx + 1}: ${it.title}`}
                        title={`Image ${idx + 1}: ${it.title}`}
                        className={cn(
                          "h-2 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]",
                          idx === currentIndex
                            ? "w-8 bg-[var(--color-gold)]"
                            : "w-2.5 bg-white/30 hover:bg-white/60"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </footer>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
