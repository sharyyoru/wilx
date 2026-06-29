"use client";

import { useEffect, useRef, useState } from "react";

type SensorId = "vibration" | "temperature" | "pressure" | "rpm";

type SensorState = {
  id: SensorId;
  label: string;
  unit: string;
  value: number;
  baseline: number;
  max: number;
  alert: number;
  history: number[];
  status: "normal" | "warning" | "critical";
};

const INITIAL_SENSORS: SensorState[] = [
  { id: "vibration", label: "Vibration", unit: "mm/s", value: 2.1, baseline: 2.0, max: 10, alert: 6, history: [], status: "normal" },
  { id: "temperature", label: "Temperature", unit: "°C", value: 68, baseline: 65, max: 120, alert: 90, history: [], status: "normal" },
  { id: "pressure", label: "Oil Pressure", unit: "bar", value: 3.8, baseline: 4.0, max: 8, alert: 2.5, history: [], status: "normal" },
  { id: "rpm", label: "Spindle RPM", unit: "rpm", value: 2980, baseline: 3000, max: 4000, alert: 3400, history: [], status: "normal" },
];

type Anomaly = { sensor: string; message: string; severity: "warning" | "critical"; time: string };

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function predict(sensors: SensorState[]): string {
  const critical = sensors.filter((s) => s.status === "critical");
  const warnings = sensors.filter((s) => s.status === "warning");
  if (critical.length >= 2) return "IMMINENT FAILURE — Maintenance required now";
  if (critical.length === 1) return `HIGH RISK — ${critical[0].label} critical. Inspect within 4h`;
  if (warnings.length >= 2) return "ELEVATED RISK — Schedule maintenance within 24h";
  if (warnings.length === 1) return `MONITOR — ${warnings[0].label} trending abnormal`;
  return "ALL SYSTEMS NOMINAL";
}

export function PredictiveMaintenanceDemo() {
  const [sensors, setSensors] = useState<SensorState[]>(INITIAL_SENSORS.map((s) => ({ ...s, history: Array(20).fill(s.value) })));
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [tick, setTick] = useState(0);
  const [injecting, setInjecting] = useState(false);
  const canvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({});

  useEffect(() => {
    const id = setInterval(() => {
      setSensors((prev) =>
        prev.map((s) => {
          const drift = injecting && (s.id === "vibration" || s.id === "temperature") ? 0.8 : 0;
          const noise = (Math.random() - 0.5) * (s.max * 0.03);
          const newVal = Math.max(0, Math.min(s.max, s.value + noise + drift));
          const newHistory = [...s.history.slice(-29), newVal];
          const ratio = s.id === "pressure" ? (s.baseline - newVal) / (s.baseline - s.alert) : (newVal - s.baseline) / (s.alert - s.baseline);
          const status: SensorState["status"] = ratio > 1.2 ? "critical" : ratio > 0.7 ? "warning" : "normal";

          if (status !== s.status && status !== "normal") {
            setAnomalies((a) => [
              { sensor: s.label, message: `${s.label} ${status}: ${newVal.toFixed(1)}${s.unit}`, severity: status, time: now() },
              ...a.slice(0, 4),
            ]);
          }

          return { ...s, value: newVal, history: newHistory, status };
        })
      );
      setTick((t) => t + 1);
    }, 600);
    return () => clearInterval(id);
  }, [injecting]);

  useEffect(() => {
    sensors.forEach((s) => {
      const canvas = canvasRefs.current[s.id];
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = s.status === "critical" ? "rgba(255,68,68,0.8)" : s.status === "warning" ? "rgba(255,170,0,0.8)" : "rgba(0,255,180,0.8)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      s.history.forEach((v, i) => {
        const x = (i / (s.history.length - 1)) * W;
        const y = H - (v / s.max) * H;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      const alertY = H - (s.alert / s.max) * H;
      ctx.strokeStyle = "rgba(255,68,68,0.3)";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, alertY); ctx.lineTo(W, alertY); ctx.stroke();
      ctx.setLineDash([]);
    });
  }, [sensors, tick]);

  const prediction = predict(sensors);
  const isAlert = prediction !== "ALL SYSTEMS NOMINAL";

  return (
    <div className="space-y-4">
      <div className={`border-2 p-3 font-mono text-xs font-bold uppercase tracking-wider ${isAlert ? "border-red-500/60 bg-red-500/10 text-red-400" : "border-emerald-500/60 bg-emerald-500/10 text-emerald-400"}`}>
        <span className="mr-2">{isAlert ? "⚠" : "✓"}</span>
        AI PREDICTION: {prediction}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sensors.map((s) => (
          <div key={s.id} className={`border p-3 ${s.status === "critical" ? "border-red-500/60 bg-red-500/5" : s.status === "warning" ? "border-yellow-500/60 bg-yellow-500/5" : "border-white/15 bg-white/2"}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white/70">{s.label}</span>
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 ${s.status === "critical" ? "bg-red-500/20 text-red-400" : s.status === "warning" ? "bg-yellow-500/20 text-yellow-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                {s.status}
              </span>
            </div>
            <div className="text-xl font-black font-mono text-white">
              {s.id === "rpm" ? Math.round(s.value) : s.value.toFixed(1)}
              <span className="ml-1 text-xs text-white/40">{s.unit}</span>
            </div>
            <canvas
              ref={(el) => { canvasRefs.current[s.id] = el; }}
              width={160}
              height={40}
              className="mt-2 w-full"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setInjecting((v) => !v)}
          className={`border-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${injecting ? "border-red-500 bg-red-500/20 text-red-400" : "border-white/40 bg-white/5 text-white/60 hover:border-white/80 hover:text-white"}`}
        >
          {injecting ? "⚠ Injecting Fault" : "Inject Fault Scenario"}
        </button>
        <button
          onClick={() => { setSensors(INITIAL_SENSORS.map((s) => ({ ...s, history: Array(20).fill(s.value) }))); setAnomalies([]); setInjecting(false); }}
          className="border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white"
        >
          Reset
        </button>
      </div>

      {anomalies.length > 0 && (
        <div className="border border-white/15 bg-black p-3 space-y-1 font-mono">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Anomaly Log</div>
          {anomalies.map((a, i) => (
            <div key={i} className={`text-xs flex justify-between ${a.severity === "critical" ? "text-red-400" : "text-yellow-400"}`}>
              <span>{a.message}</span>
              <span className="text-white/30">{a.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
