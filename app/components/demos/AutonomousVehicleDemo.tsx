"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Obstacle = { x: number; y: number; w: number; h: number; vx: number };
type Particle = { x: number; y: number; life: number; vx: number; vy: number };

const LANE_Y = [100, 150, 200];
const CAR_X = 80;
const CAR_W = 48;
const CAR_H = 24;
const CANVAS_W = 600;
const CANVAS_H = 300;

function makeObstacle(): Obstacle {
  const lane = LANE_Y[Math.floor(Math.random() * LANE_Y.length)];
  return {
    x: CANVAS_W + 40,
    y: lane - 12,
    w: 44,
    h: 22,
    vx: -(2.5 + Math.random() * 2),
  };
}

export function AutonomousVehicleDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    carY: LANE_Y[1] - CAR_H / 2,
    targetY: LANE_Y[1] - CAR_H / 2,
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    frame: 0,
    score: 0,
    decision: "CRUISE",
    speed: 60,
  });
  const [display, setDisplay] = useState({ score: 0, decision: "CRUISE", speed: 60 });
  const rafRef = useRef<number>(0);

  const detectAndDecide = useCallback(() => {
    const s = stateRef.current;
    const currentLaneIdx = LANE_Y.findIndex(
      (y) => Math.abs(y - (s.carY + CAR_H / 2)) < 30
    );
    const safeLaneIdx = currentLaneIdx === -1 ? 1 : currentLaneIdx;

    const threat = s.obstacles.find(
      (o) =>
        o.x < CAR_X + CAR_W + 140 &&
        o.x > CAR_X &&
        Math.abs(o.y + o.h / 2 - (s.carY + CAR_H / 2)) < 30
    );

    if (threat) {
      const options = [0, 1, 2].filter((i) => {
        if (i === safeLaneIdx) return false;
        return !s.obstacles.some(
          (o) =>
            o.x < CAR_X + CAR_W + 100 &&
            o.x > CAR_X - 20 &&
            Math.abs(o.y + o.h / 2 - LANE_Y[i]) < 30
        );
      });
      if (options.length > 0) {
        const best = options.reduce((a, b) =>
          Math.abs(b - safeLaneIdx) < Math.abs(a - safeLaneIdx) ? b : a
        );
        s.targetY = LANE_Y[best] - CAR_H / 2;
        s.decision = "LANE CHANGE";
        s.speed = 58;
      } else {
        s.decision = "BRAKE";
        s.speed = 30;
      }
    } else {
      s.decision = "CRUISE";
      s.speed = 60;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      s.frame++;

      if (s.frame % 90 === 0) s.obstacles.push(makeObstacle());
      s.obstacles.forEach((o) => { o.x += o.vx; });
      s.obstacles = s.obstacles.filter((o) => o.x > -60);

      s.carY += (s.targetY - s.carY) * 8 * dt;

      if (s.frame % 2 === 0) detectAndDecide();

      s.score += dt * 10;

      for (let i = 0; i < 2; i++) {
        s.particles.push({
          x: CAR_X,
          y: s.carY + CAR_H / 2 + (Math.random() - 0.5) * 6,
          life: 1,
          vx: -(20 + Math.random() * 15),
          vy: (Math.random() - 0.5) * 8,
        });
      }
      s.particles.forEach((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 3;
      });
      s.particles = s.particles.filter((p) => p.life > 0);

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      ctx.setLineDash([20, 14]);
      LANE_Y.forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(0, y + 25);
        ctx.lineTo(CANVAS_W, y + 25);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      ctx.strokeStyle = "#555";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, 75); ctx.lineTo(CANVAS_W, 75); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 225); ctx.lineTo(CANVAS_W, 225); ctx.stroke();

      const scanX = CAR_X + CAR_W;
      const scanRange = 160;
      const grad = ctx.createLinearGradient(scanX, 0, scanX + scanRange, 0);
      grad.addColorStop(0, "rgba(0,255,180,0.12)");
      grad.addColorStop(1, "rgba(0,255,180,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(scanX, s.carY - 10, scanRange, CAR_H + 20);

      s.particles.forEach((p) => {
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = "#00ffb4";
        ctx.fillRect(p.x, p.y, 3, 2);
      });
      ctx.globalAlpha = 1;

      s.obstacles.forEach((o) => {
        const isClose =
          o.x < CAR_X + CAR_W + 160 &&
          Math.abs(o.y + o.h / 2 - (s.carY + CAR_H / 2)) < 35;
        ctx.fillStyle = isClose ? "#ff4444" : "#888";
        ctx.fillRect(o.x, o.y, o.w, o.h);
        ctx.fillStyle = isClose ? "#ff9999" : "#aaa";
        ctx.fillRect(o.x + 4, o.y + 4, o.w - 8, 4);
        if (isClose) {
          ctx.strokeStyle = "rgba(255,68,68,0.4)";
          ctx.lineWidth = 1;
          ctx.strokeRect(o.x - 4, o.y - 4, o.w + 8, o.h + 8);
        }
      });

      const cx = CAR_X;
      const cy = s.carY;
      ctx.fillStyle = s.decision === "BRAKE" ? "#ff8800" : "#00ffb4";
      ctx.fillRect(cx, cy, CAR_W, CAR_H);
      ctx.fillStyle = "#001a10";
      ctx.fillRect(cx + 8, cy + 4, CAR_W - 16, CAR_H - 10);
      ctx.fillStyle = "#00ffb4";
      ctx.fillRect(cx - 6, cy + 4, 6, 5);
      ctx.fillRect(cx - 6, cy + CAR_H - 9, 6, 5);
      ctx.fillRect(cx + CAR_W, cy + 4, 6, 5);
      ctx.fillRect(cx + CAR_W, cy + CAR_H - 9, 6, 5);

      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, CANVAS_W, 40);
      ctx.fillStyle = "#00ffb4";
      ctx.font = "bold 11px monospace";
      ctx.fillText(`DECISION: ${s.decision}`, 12, 16);
      ctx.fillText(`SPEED: ${Math.round(s.speed)} km/h`, 12, 30);
      ctx.fillText(`OBSTACLES: ${s.obstacles.length}`, 180, 16);
      ctx.fillText(`SCORE: ${Math.round(s.score)}m`, 180, 30);
      ctx.fillText(`SENSOR RANGE: 160px`, 340, 16);
      ctx.fillText(`LANE: ${LANE_Y.findIndex((y) => Math.abs(y - (s.carY + CAR_H / 2)) < 30) + 1}/3`, 340, 30);

      setDisplay({ score: Math.round(s.score), decision: s.decision, speed: Math.round(s.speed) });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [detectAndDecide]);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden border-2 border-white/30">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="w-full"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
        <div className="border border-white/20 bg-white/5 p-3">
          <div className="text-white/50 uppercase tracking-wider">Decision</div>
          <div className={`mt-1 text-sm font-bold ${display.decision === "BRAKE" ? "text-orange-400" : display.decision === "LANE CHANGE" ? "text-yellow-400" : "text-emerald-400"}`}>
            {display.decision}
          </div>
        </div>
        <div className="border border-white/20 bg-white/5 p-3">
          <div className="text-white/50 uppercase tracking-wider">Speed</div>
          <div className="mt-1 text-sm font-bold text-white">{display.speed} km/h</div>
        </div>
        <div className="border border-white/20 bg-white/5 p-3">
          <div className="text-white/50 uppercase tracking-wider">Distance</div>
          <div className="mt-1 text-sm font-bold text-white">{display.score}m</div>
        </div>
      </div>
      <p className="text-xs text-white/40 font-mono">
        ↑ Live CARLA-style simulation — autonomous agent detects obstacles via sensor fusion and executes lane-change or braking decisions in real time.
      </p>
    </div>
  );
}
