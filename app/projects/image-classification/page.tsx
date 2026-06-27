import { ImageClassifierDemo } from "@/app/components/demos/ImageClassifierDemo";
import {
  ArchitectureBox,
  DemoPanel,
  ProjectSection,
  ProjectShell,
} from "@/app/components/ProjectShell";

export const metadata = {
  title: "Image Classification Project | Wilson Ali",
  description:
    "Image classification with transfer learning using ResNet or VGG to classify animals, plants, or medical images.",
};

export default function ImageClassificationPage() {
  return (
    <ProjectShell
      title="Image Classification with Transfer Learning"
      tag="Computer Vision"
      description="Classify animals, plants, or medical images using deep learning models such as ResNet or VGG. This project demonstrates transfer learning, model fine-tuning, and the end-to-end deployment of a computer vision pipeline."
      tech={[
        "Python",
        "TensorFlow",
        "Keras",
        "ResNet",
        "VGG",
        "OpenCV",
        "Gemini Vision",
      ]}
    >
      <ProjectSection title="Why this project matters">
        <p>
          Image classification is the classic proof that you can work with deep
          learning. By using transfer learning on a pre-trained ResNet or VGG
          model, you can achieve strong accuracy with a small dataset and show
          recruiters that you understand feature extraction, fine-tuning, and
          model evaluation.
        </p>
        <p>
          Practical use cases include medical imaging triage, quality control on
          manufacturing lines, wildlife monitoring, and e-commerce cataloging.
        </p>
      </ProjectSection>

      <ProjectSection title="System Architecture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ArchitectureBox
            title="Model Pipeline"
            steps={[
              {
                label: "Load Base Model",
                description:
                  "Start with ImageNet-pretrained ResNet50 or VGG16 weights.",
              },
              {
                label: "Freeze Backbone",
                description:
                  "Keep early convolutional layers frozen to reuse generic features.",
              },
              {
                label: "Add Head",
                  description:
                  "Replace the top classifier with a dense layer sized to your custom classes.",
              },
              {
                label: "Fine-Tune",
                description:
                  "Unfreeze later layers and train on the target dataset with a low learning rate.",
              },
            ]}
          />
          <ArchitectureBox
            title="Serving Flow"
            steps={[
              {
                label: "Upload",
                description:
                  "User drags or selects an image in the Next.js frontend.",
              },
              {
                label: "Preprocess",
                description:
                  "Resize, normalize, and augment the image before inference.",
              },
              {
                label: "Inference",
                description:
                  "TensorFlow/Keras model returns class probabilities.",
              },
              {
                label: "Explain",
                description:
                  "Show top-k predictions and optionally a Grad-CAM heatmap.",
              },
            ]}
          />
        </div>
      </ProjectSection>

      <ProjectSection title="How competitors present this">
        <p>
          Strong ML portfolios (e.g., Marcus Mayo, VimalDev) present image
          classification with a screenshot of the prediction panel, confidence
          bars, and the dataset used. The most effective pages also explain the
          model choice (ResNet vs. VGG), training accuracy, and one concrete use
          case such as medical imaging or defect detection.
        </p>
      </ProjectSection>

      <ProjectSection title="Working UI Sample">
        <DemoPanel title="Try the image classifier">
          <ImageClassifierDemo />
        </DemoPanel>
      </ProjectSection>

      <ProjectSection title="Production Wiring">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Training environment:</strong> Jupyter notebook or Google
            Colab with TensorFlow/Keras; track experiments with Weights & Biases.
          </li>
          <li>
            <strong>Model serving:</strong> TensorFlow Serving or a FastAPI
            endpoint with the saved model.
          </li>
          <li>
            <strong>Frontend:</strong> Next.js drag-and-drop upload with
            on-the-fly preview and confidence visualization.
          </li>
          <li>
            <strong>LLM option:</strong> For general image understanding, route
            images to Gemini Vision for natural-language descriptions as a
            fallback.
          </li>
        </ul>
      </ProjectSection>
    </ProjectShell>
  );
}
