/* eslint-disable react/prop-types */
import { FC, useState, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./styles.module.scss";

export type Props = RouteComponentProps;

// Session state type
type SessionState = "stopped" | "running" | "paused";

// Live Biometric Card Component
interface LiveBiometricCardProps {
  sessionState: SessionState;
  duration: number;
}

const LiveBiometricCard: FC<LiveBiometricCardProps> = ({
  sessionState,
  duration,
}) => {
  // Format duration as MM:SS
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const biometricData = [
    {
      id: "hrv",
      title: "Heart Rate Variability",
      value: "39.89",
      unit: "ms",
      status: "critical", // red
      optimal: "65-75 ms",
    },
    {
      id: "gsr",
      title: "Galvanic Skin Response",
      value: "48.4",
      unit: "μS",
      status: "optimal", // green
      optimal: "40-50 μS",
    },
    {
      id: "temp",
      title: "Temperature",
      value: "36.6",
      unit: "°C",
      status: "optimal", // green
      optimal: "36.5-37.2°C",
    },
    {
      id: "eye",
      title: "Eye Movement",
      value: "12",
      unit: "mv",
      status: "optimal", // green
      optimal: "10-15 mv",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "critical":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className={styles.liveBiometricCard}>
      <div className={styles.biometricHeader}>
        <div className={styles.biometricTitle}>
          <h3>Live Biometric Monitoring</h3>
          <div className={styles.sessionInfo}>
            <span>Oct 15, 14:00 - Active Session</span>
          </div>
        </div>
        <div className={styles.biometricStatus}>
          <div className={styles.durationDisplay}>
            Duration: {formatDuration(duration)}
          </div>
          {(sessionState === "running" || sessionState === "paused") && (
            <div className={styles.liveIndicator}>
              <div
                className={`${styles.liveDot} ${
                  sessionState === "running" ? styles.active : ""
                }`}
              />
              <span className={styles.liveText}>LIVE</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.statusZones}>
        <h4>Status Zones</h4>
        <div className={styles.statusZoneItems}>
          <div className={styles.statusZone}>
            <div className={`${styles.statusDot} ${styles.optimal}`} />
            <span>Optimal Range</span>
          </div>
          <div className={styles.statusZone}>
            <div className={`${styles.statusDot} ${styles.warning}`} />
            <span>Warning Range</span>
          </div>
          <div className={styles.statusZone}>
            <div className={`${styles.statusDot} ${styles.critical}`} />
            <span>Critical Range</span>
          </div>
        </div>
      </div>

      <div className={styles.biometricMetrics}>
        {biometricData.map((metric) => (
          <div key={metric.id} className={styles.biometricMetric}>
            <div className={styles.metricHeader}>
              <span className={styles.metricTitle}>{metric.title}</span>
              <div
                className={styles.metricStatus}
                style={{ backgroundColor: getStatusColor(metric.status) }}
              />
            </div>
            <div className={styles.metricValue}>
              <span className={styles.value}>{metric.value}</span>
              <span className={styles.unit}>{metric.unit}</span>
            </div>
            <div className={styles.metricOptimal}>
              Optimal: {metric.optimal}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.hrvAnalysis}>
        <div className={styles.analysisHeader}>
          <h4>Heart Rate Variability Analysis</h4>
          <div className={styles.analysisTabs}>
            <button
              type="button"
              className={`${styles.analysisTab} ${styles.active}`}
            >
              Current Session
            </button>
            <button type="button" className={styles.analysisTab}>
              Historical Data
            </button>
          </div>
        </div>
        <div className={styles.hrvChart}>
          <div className={styles.chartContainer}>
            <div className={styles.chartLine}>
              <svg width="100%" height="80" viewBox="0 0 400 80">
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 50 Q 50 30 100 40 T 200 45 T 300 35 T 400 30"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 0 50 Q 50 30 100 40 T 200 45 T 300 35 T 400 30 L 400 80 L 0 80 Z"
                  fill="url(#chartGradient)"
                />
                <circle cx="350" cy="35" r="4" fill="#8b5cf6" />
              </svg>
            </div>
            <div className={styles.chartAxis}>
              <span>14:00</span>
              <span>14:15</span>
              <span>14:30</span>
              <span>14:32 (Current)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Emotion Trend Card Component
const EmotionTrendCard: FC = () => {
  const emotionHighlights = [
    {
      id: "anxiety-detected",
      emoji: "😔",
      text: "Anxiety detected 3x this session",
    },
    {
      id: "flat-affect",
      emoji: "😐",
      text: "Flat affect noted in intro (HRV < 40)",
    },
    {
      id: "anxiety-spike",
      emoji: "😰",
      text: "Anxiety Spike @ 14:32",
    },
    {
      id: "positive-response",
      emoji: "🙂",
      text: "Positive response during imagery @ 14:48",
    },
  ];

  return (
    <div className={styles.emotionTrendCard}>
      <h3>Emotion trend highlights</h3>
      <div className={styles.emotionHighlights}>
        {emotionHighlights.map((item) => (
          <div key={item.id} className={styles.emotionHighlight}>
            <span className={styles.emotionEmoji}>{item.emoji}</span>
            <span className={styles.emotionText}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Patient Card Component
interface PatientCardProps {
  sessionState: SessionState;
  onSessionStateChange: (newState: SessionState) => void;
}

const PatientCard: FC<PatientCardProps> = ({
  sessionState,
  onSessionStateChange,
}) => {
  const getButtonText = () => {
    if (sessionState === "paused") return "Resume";
    if (sessionState === "running") return "Pause";
    return "Start";
  };

  const handlePauseSession = () => {
    if (sessionState === "running") {
      onSessionStateChange("paused");
    } else if (sessionState === "paused") {
      onSessionStateChange("running");
    } else {
      onSessionStateChange("running");
    }
  };

  const handleEndSession = () => {
    onSessionStateChange("stopped");
  };

  if (sessionState === "stopped") {
    return (
      <div className={styles.patientCard}>
        <div className={styles.sessionEndedMessage}>
          <h3>Session Ended</h3>
          <p>Session has been successfully ended.</p>
          <button
            type="button"
            className={styles.restartButton}
            onClick={() => onSessionStateChange("running")}
          >
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.patientCard}>
      <div className={styles.patientHeader}>
        <div className={styles.avatar}>
          <span>SM</span>
        </div>
        <div className={styles.patientInfo}>
          <h2>Sophie Müller</h2>
          <div className={styles.patientMeta}>
            <span>20 years old</span>
            <span className={styles.diagnosis}>GAD</span>
          </div>
        </div>
      </div>

      <div className={styles.sessionDetails}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Last session</span>
          <span className={styles.value}>Oct 15</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Progress</span>
          <span className={styles.value}>Week 5 of 10</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Treatment plan</span>
          <span className={styles.value}>CBT + Biofeedback</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Next session</span>
          <span className={styles.value}>Oct 22, 14:00</span>
        </div>
      </div>

      <div className={styles.treatmentFocus}>
        <h3>Current Treatment Focus</h3>
        <p>
          Managing workplace anxiety and developing coping strategies for
          performance stress
        </p>
        <div className={styles.sessionInfo}>
          Session 12 of 20 • Twice weekly
        </div>
      </div>

      <div className={styles.sessionControls}>
        <button
          type="button"
          className={`${styles.controlButton} ${styles.pauseButton} ${
            sessionState === "paused" ? styles.resumed : ""
          }`}
          onClick={handlePauseSession}
        >
          {getButtonText()}
        </button>
        <button
          type="button"
          className={`${styles.controlButton} ${styles.endButton}`}
          onClick={handleEndSession}
        >
          End Session
        </button>
      </div>
    </div>
  );
};

const SessionData: FC<Props> = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("live");
  const [sessionState, setSessionState] = useState<SessionState>("stopped");
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (sessionState === "running") {
      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sessionState]);

  const handleSessionStateChange = (newState: SessionState) => {
    setSessionState(newState);
    if (newState === "stopped") {
      setDuration(0);
    }
  };

  return (
    <div className={styles.sessionData}>
      <Helmet title="Session Data - Healura" />
      <div className={styles.header}>
        <h1>Session Data</h1>
        <p>Real-time patient monitoring and session analytics</p>
      </div>

      {/* Centered Tabs */}
      <div className={styles.centeredContent}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === "live" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("live")}
          >
            Live Session
          </button>
          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === "review" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("review")}
          >
            Session Review
          </button>
          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === "historical" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("historical")}
          >
            Historical Data
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "live" && (
          <div className={styles.tabContent}>
            <div className={styles.liveSessionContainer}>
              <div className={styles.cardRow}>
                <div className={styles.leftColumn}>
                  <PatientCard
                    sessionState={sessionState}
                    onSessionStateChange={handleSessionStateChange}
                  />
                  {sessionState !== "stopped" && <EmotionTrendCard />}
                </div>
                {sessionState !== "stopped" && (
                  <div className={styles.rightColumn}>
                    <LiveBiometricCard
                      sessionState={sessionState}
                      duration={duration}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "review" && (
          <div className={styles.tabContent}>
            <h3>Session Review</h3>
            <p>Session review content will be displayed here.</p>
          </div>
        )}

        {activeTab === "historical" && (
          <div className={styles.tabContent}>
            <h3>Historical Data</h3>
            <p>Historical data content will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionData;
