import { SentimentDemo } from "@/app/components/demos/SentimentDemo";
import {
  ArchitectureBox,
  DemoPanel,
  ProjectSection,
  ProjectShell,
} from "@/app/components/ProjectShell";

export const metadata = {
  title: "Sentiment Analysis Project | Wilson Ali",
  description:
    "Social media sentiment analysis project using NLP and text mining to classify posts as positive, negative, or neutral.",
};

export default function SentimentAnalysisPage() {
  return (
    <ProjectShell
      title="Sentiment Analysis of Social Media Data"
      tag="NLP / Text Mining"
      description="Use Twitter or Reddit datasets to classify posts as positive, negative, or neutral. This project teaches foundational NLP, text preprocessing, and how text mining applies to real-world brand monitoring and public opinion analysis."
      tech={["Python", "TextBlob", "SpaCy", "Pandas", "Matplotlib", "Gemini API"]}
    >
      <ProjectSection title="Why this project matters">
        <p>
          Sentiment analysis is one of the most recruiter-friendly entry points
          into AI. It demonstrates that you can clean unstructured text, extract
          meaning, and turn opinions into actionable metrics. Brands use it to
          monitor product launches, track competitor mentions, and respond to
          crises in real time.
        </p>
        <p>
          In this example, the pipeline ingests raw social posts, normalizes
          text, scores sentiment, and aggregates results into a dashboard that
          shows trend shifts over time.
        </p>
      </ProjectSection>

      <ProjectSection title="System Architecture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ArchitectureBox
            title="Data Pipeline"
            steps={[
              {
                label: "Ingest",
                description:
                  "Collect posts from Twitter/X or Reddit APIs, store raw text with metadata.",
              },
              {
                label: "Preprocess",
                description:
                  "Remove URLs, mentions, lowercase, tokenize, and remove stop words.",
              },
              {
                label: "Classify",
                description:
                  "Run TextBlob/SpaCy scoring or call Gemini for nuanced sentiment.",
              },
              {
                label: "Visualize",
                description:
                  "Render time-series sentiment charts and topic breakdowns.",
              },
            ]}
          />
          <ArchitectureBox
            title="Frontend Flow"
            steps={[
              {
                label: "Input",
                description:
                  "User pastes a tweet or Reddit comment into the text field.",
              },
              {
                label: "Request",
                description:
                  "Next.js API route forwards the text to the Python classifier.",
              },
              {
                label: "Response",
                description:
                  "Classifier returns label, confidence score, and key phrases.",
              },
              {
                label: "Display",
                description:
                  "UI renders the sentiment badge and explains the reasoning.",
              },
            ]}
          />
        </div>
      </ProjectSection>

      <ProjectSection title="How competitors present this">
        <p>
          Top AI portfolios (e.g., ProjectPro, Analytics Vidhya, DeepNeuro.dev)
          present sentiment projects with three things: a clear business outcome
          (brand monitoring), a live demo input box, and a results chart.
          Recruiters respond best when the UI shows both the raw prediction and
          the business interpretation, not just accuracy metrics.
        </p>
      </ProjectSection>

      <ProjectSection title="Working UI Sample">
        <DemoPanel title="Try the sentiment classifier">
          <SentimentDemo />
        </DemoPanel>
      </ProjectSection>

      <ProjectSection title="Production Wiring">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Backend:</strong> FastAPI or Flask endpoint running the
            TextBlob/SpaCy model or a fine-tuned Hugging Face transformer.
          </li>
          <li>
            <strong>LLM option:</strong> Replace the rule-based model with a
            Gemini API call for sarcasm and context-aware sentiment.
          </li>
          <li>
            <strong>Storage:</strong> Supabase PostgreSQL to store historical
            sentiment trends and user feedback.
          </li>
          <li>
            <strong>Deployment:</strong> Dockerized classifier on Vercel or a
            small VPS behind the Next.js frontend.
          </li>
        </ul>
      </ProjectSection>
    </ProjectShell>
  );
}
