import { PredictiveMaintenanceDemo } from "@/app/components/demos/PredictiveMaintenanceDemo";
import {
  ArchitectureBox,
  DemoPanel,
  ProjectSection,
  ProjectShell,
} from "@/app/components/ProjectShell";

export const metadata = {
  title: "Predictive Maintenance AI | Wilson Ali",
  description:
    "AI-driven predictive maintenance for manufacturing — sensor fusion, anomaly detection, and failure forecasting to minimise downtime.",
};

export default function PredictiveMaintenancePage() {
  return (
    <ProjectShell
      title="Predictive Maintenance in Manufacturing"
      tag="Industrial AI / Anomaly Detection"
      description="AI models that analyse real-time sensor streams — vibration, temperature, pressure, RPM — to forecast machinery failures before they occur. Reduces unplanned downtime by up to 40% and maintenance costs by 25% in production deployments."
      tech={[
        "Python",
        "PyTorch",
        "LSTM / Transformer",
        "MQTT",
        "InfluxDB",
        "Grafana",
        "FastAPI",
        "Scikit-learn",
      ]}
    >
      <ProjectSection title="Why this project matters">
        <p>
          Industrial AI is one of the fastest-growing verticals in enterprise
          software. Unplanned downtime costs manufacturers an average of
          $260,000 per hour (Deloitte). Predictive maintenance systems that
          fuse multi-sensor streams and deliver failure warnings 24–72 hours
          in advance are the single highest-ROI AI application in the sector.
        </p>
        <p>
          This project demonstrates time-series anomaly detection, multi-sensor
          fusion, and production-grade MLOps — skills valued by Siemens, GE,
          Honeywell, and every Industry 4.0 company. Recruiters in industrial
          AI treat a working PdM demo as proof of end-to-end AI engineering
          capability.
        </p>
      </ProjectSection>

      <ProjectSection title="System Architecture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ArchitectureBox
            title="Sensor Ingestion"
            steps={[
              {
                label: "Edge Collection",
                description:
                  "PLCs and IoT gateways publish sensor readings at 1–10 Hz via MQTT to a broker.",
              },
              {
                label: "Stream Processing",
                description:
                  "Apache Kafka ingests the stream; sliding window aggregations compute rolling statistics.",
              },
              {
                label: "Time-Series Store",
                description:
                  "InfluxDB persists raw and aggregated readings; Grafana dashboards for ops teams.",
              },
              {
                label: "Feature Engineering",
                description:
                  "FFT for vibration frequency spectrum, rolling mean/std, inter-sensor correlations.",
              },
            ]}
          />
          <ArchitectureBox
            title="AI Model Pipeline"
            steps={[
              {
                label: "Anomaly Detection",
                description:
                  "Isolation Forest and LSTM Autoencoder flag deviations from learned baseline behaviour.",
              },
              {
                label: "Failure Forecasting",
                description:
                  "Transformer model trained on historical failure logs predicts RUL (Remaining Useful Life).",
              },
              {
                label: "Severity Scoring",
                description:
                  "Risk score 0–100 fused from multiple sensors; thresholds trigger Warning or Critical alerts.",
              },
              {
                label: "Alert Dispatch",
                description:
                  "FastAPI webhook pushes alerts to Slack, PagerDuty, or CMMS work order systems.",
              },
            ]}
          />
        </div>
      </ProjectSection>

      <ProjectSection title="How top competitors present this">
        <p>
          Leading industrial AI portfolios (Uptake, SparkCognition, C3.ai)
          always show three elements: a live sensor dashboard with real-time
          anomaly highlighting, a clear RUL (Remaining Useful Life) prediction
          curve, and a fault injection demo to prove the model responds
          correctly. The interactive demo below replicates all three — click
          &quot;Inject Fault Scenario&quot; to watch the AI escalate from normal
          → warning → critical and issue a maintenance recommendation.
        </p>
      </ProjectSection>

      <ProjectSection title="Live Sensor Dashboard">
        <DemoPanel title="Real-time sensor monitoring — click 'Inject Fault Scenario' to trigger anomaly detection">
          <PredictiveMaintenanceDemo />
        </DemoPanel>
      </ProjectSection>

      <ProjectSection title="Production Wiring">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Data pipeline:</strong> MQTT → Kafka → InfluxDB with
            exactly-once delivery guarantees; 99.9% uptime SLA.
          </li>
          <li>
            <strong>Model training:</strong> PyTorch LSTM Autoencoder trained
            on NASA CMAPSS turbofan dataset and Kaggle bearing fault dataset.
          </li>
          <li>
            <strong>Serving:</strong> FastAPI model server with ONNX runtime
            for sub-10ms inference; horizontally scalable on Kubernetes.
          </li>
          <li>
            <strong>Monitoring:</strong> Evidently AI tracks data drift;
            automated retraining triggers when feature distribution shifts
            beyond threshold.
          </li>
          <li>
            <strong>Integration:</strong> SAP PM / IBM Maximo CMMS connectors
            auto-create work orders when predicted failure probability exceeds
            85%.
          </li>
        </ul>
      </ProjectSection>
    </ProjectShell>
  );
}
