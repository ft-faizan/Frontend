// // pages/dashboard/components/DonutChart.jsx
// import { useRef, useEffect, useState } from "react";
// import { SEGMENTS_META } from "../constants/segmentsMeta";

// function DonutChart({ stats, loading }) {
//   const canvasRef = useRef(null);
//   const rafRef = useRef(null);
//   const progressRef = useRef(0);
//   const [hovered, setHovered] = useState(null);

//   const segments = SEGMENTS_META.map((m) => ({
//     ...m,
//     value: stats?.[m.key] || 0,
//   }));
//   const total = segments.reduce((s, d) => s + d.value, 0);

//   const draw = (progress, hoveredSeg = null) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     const dpr = window.devicePixelRatio || 1;
//     const SIZE = 240;
//     canvas.width = SIZE * dpr;
//     canvas.height = SIZE * dpr;
//     canvas.style.width = SIZE + "px";
//     canvas.style.height = SIZE + "px";
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     const cx = SIZE / 2;
//     const cy = SIZE / 2;
//     const OR = 94;
//     const IR = 58;
//     const GAP = 0.032;

//     ctx.clearRect(0, 0, SIZE, SIZE);

//     if (total === 0) {
//       ctx.beginPath();
//       ctx.arc(cx, cy, OR, 0, Math.PI * 2);
//       ctx.arc(cx, cy, IR, 0, Math.PI * 2, true);
//       ctx.fillStyle = "#1a1d2a";
//       ctx.fill();
//       ctx.fillStyle = "#4b5563";
//       ctx.font = "13px Inter, sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText("No data yet", cx, cy);
//       return;
//     }

//     let angle = -Math.PI / 2;
//     segments.forEach((seg) => {
//       if (seg.value === 0) return;
//       const full = (seg.value / total) * Math.PI * 2;
//       const slice = Math.max(0, full * progress - GAP);
//       if (slice <= 0) return;
//       const isHov = hoveredSeg?.label === seg.label;
//       const outerR = isHov ? OR + 7 : OR;
//       const innerR = isHov ? IR - 3 : IR;
//       const g = ctx.createLinearGradient(cx - outerR, cy - outerR, cx + outerR, cy + outerR);
//       g.addColorStop(0, seg.color + "cc");
//       g.addColorStop(1, seg.color);
//       ctx.beginPath();
//       ctx.arc(cx, cy, outerR, angle + GAP / 2, angle + slice + GAP / 2);
//       ctx.arc(cx, cy, innerR, angle + slice + GAP / 2, angle + GAP / 2, true);
//       ctx.closePath();
//       ctx.shadowColor = seg.color;
//       ctx.shadowBlur = isHov ? 22 : 14;
//       ctx.fillStyle = g;
//       ctx.fill();
//       ctx.shadowBlur = 0;
//       angle += full;
//     });

//     [OR + 7, IR - 8].forEach((r) => {
//       ctx.beginPath();
//       ctx.arc(cx, cy, r, 0, Math.PI * 2);
//       ctx.strokeStyle = "#1e2130";
//       ctx.lineWidth = 1;
//       ctx.stroke();
//     });

//     ctx.beginPath();
//     ctx.arc(cx, cy, IR - 1, 0, Math.PI * 2);
//     ctx.fillStyle = "#0a0c12";
//     ctx.fill();

//     if (hoveredSeg) {
//       ctx.fillStyle = hoveredSeg.color;
//       ctx.font = "bold 26px Inter, sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText(hoveredSeg.value.toLocaleString(), cx, cy - 10);
//       ctx.fillStyle = "#9ca3af";
//       ctx.font = "500 10px Inter, sans-serif";
//       ctx.fillText(hoveredSeg.pct + "%", cx, cy + 8);
//       ctx.fillStyle = "#6b7280";
//       ctx.font = "500 9px Inter, sans-serif";
//       const label = hoveredSeg.label.length > 12 ? hoveredSeg.label.slice(0, 11) + "…" : hoveredSeg.label;
//       ctx.fillText(label, cx, cy + 22);
//     } else {
//       const displayed = Math.floor(total * progress);
//       ctx.fillStyle = "#ffffff";
//       ctx.font = "bold 30px Inter, sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText(displayed.toLocaleString(), cx, cy - 9);
//       ctx.fillStyle = "#6b7280";
//       ctx.font = "500 11px Inter, sans-serif";
//       ctx.fillText("Total Items", cx, cy + 13);
//     }
//   };

//   useEffect(() => {
//     if (loading) return;
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     progressRef.current = 0;
//     const start = performance.now();
//     const duration = 1100;
//     const tick = (now) => {
//       const t = Math.min(1, (now - start) / duration);
//       const p = 1 - Math.pow(1 - t, 3);
//       progressRef.current = p;
//       draw(p);
//       if (t < 1) rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [stats?.platform, stats?.custom, stats?.folders, loading]);

//   const getHoveredSegment = (e) => {
//     const canvas = canvasRef.current;
//     if (!canvas || progressRef.current < 0.98) return null;
//     const rect = canvas.getBoundingClientRect();
//     const SIZE = 240;
//     const mx = ((e.clientX - rect.left) / rect.width) * SIZE;
//     const my = ((e.clientY - rect.top) / rect.height) * SIZE;
//     const cx = SIZE / 2, cy = SIZE / 2;
//     const dx = mx - cx, dy = my - cy;
//     const dist = Math.sqrt(dx * dx + dy * dy);
//     if (dist > 100 || dist < 52) return null;
//     let ang = Math.atan2(dy, dx);
//     if (ang < -Math.PI / 2) ang += Math.PI * 2;
//     let start = -Math.PI / 2;
//     for (const seg of segments) {
//       if (seg.value === 0) continue;
//       const slice = (seg.value / total) * Math.PI * 2;
//       if (ang >= start && ang < start + slice) return seg;
//       start += slice;
//     }
//     return null;
//   };

//   const handleMouseMove = (e) => {
//     const seg = getHoveredSegment(e);
//     if (seg) {
//       const pct = Math.round((seg.value / total) * 100);
//       const next = { ...seg, pct };
//       setHovered(next);
//       draw(progressRef.current, next);
//     } else {
//       setHovered(null);
//       draw(progressRef.current, null);
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center">
//       {loading ? (
//         <div className="w-[240px] h-[240px] rounded-full bg-gradient-to-br from-[#1a1d2a] to-[#0f1117] animate-pulse" />
//       ) : (
//         <canvas
//           ref={canvasRef}
//           onMouseMove={handleMouseMove}
//           onMouseLeave={() => {
//             setHovered(null);
//             draw(progressRef.current, null);
//           }}
//           className="cursor-crosshair"
//           style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.5))" }}
//         />
//       )}
//       <p className="text-[11px] text-gray-600 mt-4 tracking-wide">
//         hover to explore segments
//       </p>
//     </div>
//   );
// }

// export default DonutChart;













// pages/dashboard/components/DonutChart.jsx
import { useRef, useEffect, useState } from "react";
import { SEGMENTS_META } from "../constants/segmentsMeta";

function DonutChart({ stats, loading }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const progressRef = useRef(0);
  const [hovered, setHovered] = useState(null);

  // ✅ Smooth hover: track per-segment hover progress (0→1)
  const hoverProgressRef = useRef({}); // { [label]: 0..1 }
  const hoveredLabelRef = useRef(null);
  const hoverRafRef = useRef(null);

  const segments = SEGMENTS_META.map((m) => ({
    ...m,
    value: stats?.[m.key] || 0,
  }));
  const total = segments.reduce((s, d) => s + d.value, 0);

  const draw = (progress, hoveredSeg = null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const SIZE = 240;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = SIZE + "px";
    canvas.style.height = SIZE + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const OR = 94;
    const IR = 58;
    const GAP = 0.032;

    ctx.clearRect(0, 0, SIZE, SIZE);

    if (total === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, OR, 0, Math.PI * 2);
      ctx.arc(cx, cy, IR, 0, Math.PI * 2, true);
      ctx.fillStyle = "#f1f5f9";
      ctx.fill();
      ctx.fillStyle = "#94a3b8";
      ctx.font = "13px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("No data yet", cx, cy);
      return;
    }

    let angle = -Math.PI / 2;
    segments.forEach((seg) => {
      if (seg.value === 0) return;
      const full = (seg.value / total) * Math.PI * 2;
      const slice = Math.max(0, full * progress - GAP);
      if (slice <= 0) return;

      // ✅ Smooth hover: use interpolated hover progress per segment
      const hp = hoverProgressRef.current[seg.label] || 0;
      const outerR = OR + 7 * hp;
      const innerR = IR - 3 * hp;

      const g = ctx.createLinearGradient(cx - outerR, cy - outerR, cx + outerR, cy + outerR);
      g.addColorStop(0, seg.color + "cc");
      g.addColorStop(1, seg.color);
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, angle + GAP / 2, angle + slice + GAP / 2);
      ctx.arc(cx, cy, innerR, angle + slice + GAP / 2, angle + GAP / 2, true);
      ctx.closePath();
      ctx.shadowColor = seg.color;
      // ✅ Smooth hover: interpolate shadow blur
      ctx.shadowBlur = 8 + 8 * hp;
      ctx.fillStyle = g;
      ctx.fill();
      ctx.shadowBlur = 0;
      angle += full;
    });

    [OR + 7, IR - 8].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    ctx.beginPath();
    ctx.arc(cx, cy, IR - 1, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    if (hoveredSeg) {
      ctx.fillStyle = hoveredSeg.color;
      ctx.font = "bold 26px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(hoveredSeg.value.toLocaleString(), cx, cy - 10);
      ctx.fillStyle = "#64748b";
      ctx.font = "500 10px Inter, sans-serif";
      ctx.fillText(hoveredSeg.pct + "%", cx, cy + 8);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "500 9px Inter, sans-serif";
      const label = hoveredSeg.label.length > 12 ? hoveredSeg.label.slice(0, 11) + "…" : hoveredSeg.label;
      ctx.fillText(label, cx, cy + 22);
    } else {
      const displayed = Math.floor(total * progress);
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 30px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(displayed.toLocaleString(), cx, cy - 9);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "500 11px Inter, sans-serif";
      ctx.fillText("Total Items", cx, cy + 13);
    }
  };

  // ✅ Smooth hover: RAF loop that interpolates each segment's hover progress
  const runHoverAnimation = () => {
    if (hoverRafRef.current) cancelAnimationFrame(hoverRafRef.current);

    const SPEED = 0.12; // 0..1 per frame — controls smoothness
    let needsMore = true;

    const tick = () => {
      needsMore = false;
      const activeLabel = hoveredLabelRef.current;

      segments.forEach((seg) => {
        const current = hoverProgressRef.current[seg.label] || 0;
        const target = activeLabel === seg.label ? 1 : 0;
        const next = current + (target - current) * SPEED;
        const snapped = Math.abs(next - target) < 0.004 ? target : next;
        if (snapped !== current) needsMore = true;
        hoverProgressRef.current[seg.label] = snapped;
      });

      draw(progressRef.current, hoveredLabelRef.current
        ? segments.find((s) => s.label === hoveredLabelRef.current) && {
            ...segments.find((s) => s.label === hoveredLabelRef.current),
            pct: Math.round(
              ((segments.find((s) => s.label === hoveredLabelRef.current)?.value || 0) / total) * 100
            ),
          }
        : null
      );

      if (needsMore) hoverRafRef.current = requestAnimationFrame(tick);
    };

    hoverRafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (loading) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    progressRef.current = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = 1 - Math.pow(1 - t, 3);
      progressRef.current = p;
      draw(p);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (hoverRafRef.current) cancelAnimationFrame(hoverRafRef.current);
    };
  }, [stats?.platform, stats?.custom, stats?.folders, loading]);

  const getHoveredSegment = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || progressRef.current < 0.98) return null;
    const rect = canvas.getBoundingClientRect();
    const SIZE = 240;
    const mx = ((e.clientX - rect.left) / rect.width) * SIZE;
    const my = ((e.clientY - rect.top) / rect.height) * SIZE;
    const cx = SIZE / 2, cy = SIZE / 2;
    const dx = mx - cx, dy = my - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 100 || dist < 52) return null;
    let ang = Math.atan2(dy, dx);
    if (ang < -Math.PI / 2) ang += Math.PI * 2;
    let start = -Math.PI / 2;
    for (const seg of segments) {
      if (seg.value === 0) continue;
      const slice = (seg.value / total) * Math.PI * 2;
      if (ang >= start && ang < start + slice) return seg;
      start += slice;
    }
    return null;
  };

  const handleMouseMove = (e) => {
    const seg = getHoveredSegment(e);
    const label = seg?.label || null;

    // ✅ Only trigger animation when hovered segment changes
    if (label !== hoveredLabelRef.current) {
      hoveredLabelRef.current = label;
      if (seg) {
        const pct = Math.round((seg.value / total) * 100);
        setHovered({ ...seg, pct });
      } else {
        setHovered(null);
      }
      runHoverAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (hoveredLabelRef.current !== null) {
      hoveredLabelRef.current = null;
      setHovered(null);
      runHoverAnimation();
    }
  };

  // ✅ Cursor: pointer over a segment, default over center hole
  const handleCursorStyle = (e) => {
    const seg = getHoveredSegment(e);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = seg ? "pointer" : "default";
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {loading ? (
        <div className="w-[240px] h-[240px] rounded-full bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] animate-pulse" />
      ) : (
        <canvas
          ref={canvasRef}
          onMouseMove={(e) => {
            handleMouseMove(e);
            handleCursorStyle(e);
          }}
          onMouseLeave={handleMouseLeave}
          style={{ filter: "drop-shadow(0 8px 20px rgba(47,112,235,0.12))" }}
        />
      )}
      <p className="text-[11px] text-slate-400 mt-4 tracking-wide">
        hover to explore segments
      </p>
    </div>
  );
}

export default DonutChart;