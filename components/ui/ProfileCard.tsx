'use client';

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER = 'linear-gradient(145deg,#7c6af730 0%,#4fc9fa22 100%)';
const ANIM = { INIT_DUR: 1200, INIT_X: 70, INIT_Y: 60, BETA_OFF: 20, ENTER_MS: 180 };
const clamp = (v: number, mn = 0, mx = 100) => Math.min(Math.max(v, mn), mx);
const round = (v: number, p = 3) => parseFloat(v.toFixed(p));
const adjust = (v: number, fMn: number, fMx: number, tMn: number, tMx: number) =>
  round(tMn + ((tMx - tMn) * (v - fMn)) / (fMx - fMn));

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '/photo-1.png',
  iconUrl,
  grainUrl,
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = 'Bhasit Gupta',
  title = 'AI/ML Developer',
  handle = 'mr_bhasit',
  status = 'Available for work',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;
    let rafId: number | null = null, running = false, lastTs = 0;
    let cx = 0, cy = 0, tx = 0, ty = 0;
    const TAU = 0.14, INIT_TAU = 0.6;
    let initUntil = 0;

    const setVars = (x: number, y: number) => {
      const shell = shellRef.current, wrap = wrapRef.current;
      if (!shell || !wrap) return;
      const w = shell.clientWidth || 1, h = shell.clientHeight || 1;
      const px = clamp((100 / w) * x), py = clamp((100 / h) * y);
      const c = { '--pointer-x': `${px}%`, '--pointer-y': `${py}%`, '--background-x': `${adjust(px,0,100,35,65)}%`, '--background-y': `${adjust(py,0,100,35,65)}%`, '--pointer-from-center': `${clamp(Math.hypot(py-50,px-50)/50,0,1)}`, '--pointer-from-top': `${py/100}`, '--pointer-from-left': `${px/100}`, '--rotate-x': `${round(-(px-50)/5)}deg`, '--rotate-y': `${round((py-50)/4)}deg` };
      for (const [k, v] of Object.entries(c)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number) => {
      if (!running) return;
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1000; lastTs = ts;
      const tau = ts < initUntil ? INIT_TAU : TAU;
      const k = 1 - Math.exp(-dt / tau);
      cx += (tx - cx) * k; cy += (ty - cy) * k;
      setVars(cx, cy);
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05 || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else { running = false; lastTs = 0; if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
    };
    const start = () => { if (running) return; running = true; lastTs = 0; rafId = requestAnimationFrame(step); };

    return {
      setImmediate(x: number, y: number) { cx = x; cy = y; setVars(cx, cy); },
      setTarget(x: number, y: number) { tx = x; ty = y; start(); },
      toCenter() { const s = shellRef.current; if (s) this.setTarget(s.clientWidth/2, s.clientHeight/2); },
      beginInitial(d: number) { initUntil = performance.now() + d; start(); },
      getCurrent() { return { x: cx, y: cy, tx, ty }; },
      cancel() { if (rafId) cancelAnimationFrame(rafId); rafId = null; running = false; lastTs = 0; },
    };
  }, [enableTilt]);

  const offs = (e: PointerEvent, el: HTMLElement) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  const onMove = useCallback((e: PointerEvent) => { const s = shellRef.current; if (s && tiltEngine) { const { x, y } = offs(e, s); tiltEngine.setTarget(x, y); } }, [tiltEngine]);
  const onEnter = useCallback((e: PointerEvent) => {
    const s = shellRef.current; if (!s || !tiltEngine) return;
    s.classList.add('active', 'entering');
    if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
    enterTimerRef.current = window.setTimeout(() => s.classList.remove('entering'), ANIM.ENTER_MS);
    const { x, y } = offs(e, s); tiltEngine.setTarget(x, y);
  }, [tiltEngine]);
  const onLeave = useCallback(() => {
    const s = shellRef.current; if (!s || !tiltEngine) return;
    tiltEngine.toCenter();
    const check = () => {
      const { x, y, tx: ttx, ty: tty } = tiltEngine.getCurrent();
      if (Math.hypot(ttx-x, tty-y) < 0.6) { s.classList.remove('active'); leaveRafRef.current = null; }
      else leaveRafRef.current = requestAnimationFrame(check);
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(check);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const s = shellRef.current; if (!s) return;
    s.addEventListener('pointerenter', onEnter as any);
    s.addEventListener('pointermove', onMove as any);
    s.addEventListener('pointerleave', onLeave as any);
    const iX = (s.clientWidth || 0) - ANIM.INIT_X, iY = ANIM.INIT_Y;
    tiltEngine.setImmediate(iX, iY); tiltEngine.toCenter(); tiltEngine.beginInitial(ANIM.INIT_DUR);
    return () => {
      s.removeEventListener('pointerenter', onEnter as any);
      s.removeEventListener('pointermove', onMove as any);
      s.removeEventListener('pointerleave', onLeave as any);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel(); s.classList.remove('entering');
    };
  }, [enableTilt, tiltEngine, onMove, onEnter, onLeave]);

  const cardStyle = useMemo(() => ({
    '--icon': iconUrl ? `url(${iconUrl})` : 'none',
    '--grain': grainUrl ? `url(${grainUrl})` : 'none',
    '--inner-gradient': innerGradient ?? DEFAULT_INNER,
    '--behind-glow-color': behindGlowColor ?? 'rgba(124,106,247,0.6)',
    '--behind-glow-size': behindGlowSize ?? '50%',
  }), [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle as React.CSSProperties}>
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            {/* Shine/glare removed — original photo colors preserved */}
            <div className="pc-content pc-avatar-content">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="avatar"
                src={avatarUrl}
                alt={`${name} avatar`}
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {showUserInfo && (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={miniAvatarUrl || avatarUrl} alt={`${name} mini`} loading="lazy" />
                    </div>
                    <div className="pc-user-text">
                      <div className="pc-handle">{handle}</div>
                      <div className="pc-status">{status}</div>
                    </div>
                  </div>
                  <button className="pc-contact-btn" onClick={onContactClick} type="button" aria-label={`Contact ${name}`}>
                    {contactText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
