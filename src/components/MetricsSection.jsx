import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const metrics = [
  {
    id: 1,
    value: 150,
    label: "Espaces Verts Transformés",
    suffix: "+",
    icon: "🌿",
  },
  {
    id: 2,
    value: 5000,
    label: "Arbres Plantés",
    suffix: "+",
    icon: "🌳",
  },
  {
    id: 3,
    value: 100,
    label: "Communautés Impactées",
    suffix: "+",
    icon: "👥",
  },
  {
    id: 4,
    value: 25,
    label: "Partenaires",
    suffix: "+",
    icon: "🤝",
  },
];

const MetricCard = ({ metric, isVisible }) => {
  const { value, label, suffix, icon } = metric;
  const [count, setCount] = React.useState(0);
  const duration = 2000;
  const steps = 60;
  const stepValue = value / steps;
  const stepDuration = duration / steps;

  useEffect(() => {
    if (isVisible) {
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setCount(Math.min(Math.floor(stepValue * currentStep), value));
        if (currentStep === steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isVisible, value, stepValue, stepDuration]);

  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-number">
        {count}
        {suffix}
      </div>
      <div className="metric-label">{label}</div>
    </div>
  );
};

const MetricsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="metrics-section">
      <div className="container">
        <div className="section-title">
          <h2>Our Impact</h2>
          <p>
            Discover the scale of our action for green transformation and
            sustainable urban development.
          </p>
        </div>

        <div ref={ref} className="metrics-grid">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} isVisible={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
