import { AutonomousVehicleDemo } from "@/app/components/demos/AutonomousVehicleDemo";
import {
  ArchitectureBox,
  DemoPanel,
  ProjectSection,
  ProjectShell,
} from "@/app/components/ProjectShell";

export const metadata = {
  title: "Autonomous Vehicle AI | Wilson Ali",
  description:
    "CARLA-based simulation of autonomous driving using computer vision, reinforcement learning, and sensor fusion.",
};

export default function AutonomousVehiclePage() {
  return (
    <ProjectShell
      title="Autonomous Vehicle AI — CARLA Simulation"
      tag="Computer Vision / Reinforcement Learning"
      description="Implementing self-driving car behaviour using CARLA simulation environments. Demonstrates advanced sensor fusion, computer vision pipelines, and reinforcement learning for real-time obstacle detection and lane decision-making — the hardest class of AI engineering."
      tech={[
        "Python",
        "CARLA Simulator",
        "PyTorch",
        "OpenCV",
        "Reinforcement Learning",
        "Sensor Fusion",
        "LiDAR",
        "Camera Vision",
      ]}
    >
      <ProjectSection title="Why this project matters">
        <p>
          Autonomous vehicle engineering sits at the intersection of computer
          vision, real-time decision systems, and safety-critical AI. Building
          and training agents inside CARLA — the open-source AV simulator used
          by Waymo and academic labs worldwide — proves you can handle
          multi-modal sensor data, low-latency inference, and edge-case
          reasoning that most AI engineers never touch.
        </p>
        <p>
          Recruiters at Tesla, Waymo, Mobileye, and NVIDIA treat CARLA
          experience as a direct signal of production-readiness. The combination
          of reinforcement learning, sensor fusion, and real-time CV makes this
          the most technically dense project you can include in a portfolio.
        </p>
      </ProjectSection>

      <ProjectSection title="System Architecture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ArchitectureBox
            title="Perception Pipeline"
            steps={[
              {
                label: "Sensor Fusion",
                description:
                  "Combine RGB camera, depth camera, LiDAR point cloud, and radar into a unified scene representation.",
              },
              {
                label: "Object Detection",
                description:
                  "YOLOv8 real-time inference identifies vehicles, pedestrians, and traffic signs per frame.",
              },
              {
                label: "Semantic Segmentation",
                description:
                  "DeepLabV3 segments drivable surface, lane markings, and obstacles at pixel level.",
              },
              {
                label: "Depth Estimation",
                description:
                  "LiDAR point cloud fused with stereo depth to build a 3D occupancy grid.",
              },
            ]}
          />
          <ArchitectureBox
            title="Decision & Control"
            steps={[
              {
                label: "State Encoding",
                description:
                  "Ego vehicle pose, velocity, heading, and nearby agent states encoded as observation vector.",
              },
              {
                label: "RL Policy (PPO)",
                description:
                  "Proximal Policy Optimisation agent learns lane-keeping, overtaking, and emergency braking.",
              },
              {
                label: "Waypoint Planner",
                description:
                  "Converts policy output to smooth trajectory using cubic spline interpolation.",
              },
              {
                label: "PID Controller",
                description:
                  "Low-level throttle, brake, and steering actuation tracks planned waypoints.",
              },
            ]}
          />
        </div>
      </ProjectSection>

      <ProjectSection title="How top competitors present this">
        <p>
          The strongest AV portfolios (Andrej Karpathy, comma.ai engineers,
          top Kaggle AV competitors) show three things: a live or recorded
          simulation, a clear diagram of the sensor pipeline, and a quantified
          result such as collision rate, miles-per-intervention, or reward
          curve convergence. The interactive canvas below demonstrates the
          core lane-change decision loop — the same logic that underpins
          production AV systems.
        </p>
      </ProjectSection>

      <ProjectSection title="Live Simulation">
        <DemoPanel title="CARLA-style autonomous agent — real-time sensor fusion & decision loop">
          <AutonomousVehicleDemo />
        </DemoPanel>
      </ProjectSection>

      <ProjectSection title="Production Wiring">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Simulation environment:</strong> CARLA 0.9.15 on Ubuntu
            with NVIDIA GPU; Python client API drives ego vehicle and spawns
            NPCs.
          </li>
          <li>
            <strong>Training:</strong> PPO via Stable-Baselines3; reward shaping
            penalises collisions, lane violations, and sharp steering.
          </li>
          <li>
            <strong>Model serving:</strong> TorchScript-exported policy runs
            at 20 Hz inside the CARLA tick loop.
          </li>
          <li>
            <strong>Logging:</strong> Weights &amp; Biases tracks reward curves,
            collision events, and video rollouts per checkpoint.
          </li>
          <li>
            <strong>Transfer to real hardware:</strong> ROS 2 bridge maps the
            trained policy to a physical RC platform for hardware-in-the-loop
            validation.
          </li>
        </ul>
      </ProjectSection>
    </ProjectShell>
  );
}
