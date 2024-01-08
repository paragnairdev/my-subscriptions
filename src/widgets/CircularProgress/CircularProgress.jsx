import React, { useEffect, useState } from 'react';
import './CircularProgress.scss';

const sizeMappings = {
  xs: { svgSize: 50 },
  sm: { svgSize: 100 },
  md: { svgSize: 150 },
  lg: { svgSize: 200 },
};

const CircularProgress = ({
  progress = 0,
  size = 'md',
  color = 'blue',
  children
}) => {
  const [animate, setAnimate] = useState(false);
  const validSize = sizeMappings[size] ? size : 'md';
  const { svgSize } = sizeMappings[validSize];
  const strokeWidth = svgSize * 0.1;

  const radius = svgSize / 2 - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;
  let finalOffset = circumference - (progress / 100) * circumference;

  // If progress is 100%, create a small gap
  const gapSize = 20; // Adjust this value for the size of the gap
  if (progress === 100) {
    finalOffset = gapSize;
  }

  console.log('finalOffset', finalOffset, 'circumference', circumference, 'progress', progress);

  // Calculate font size as a percentage of the radius
  const fontSize = radius * 0.5; // Adjust this value as needed

  useEffect(() => {
    // Trigger the animation once the component mounts
    setAnimate(true);
  }, []); 

  const renderContent = () => {
    if (children) {
      // Render custom content in the center
      return (
        <foreignObject x="0" y="0" width={svgSize} height={svgSize}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {children}
          </div>
        </foreignObject>
      );
    }
    // Render default progress text
    return (
      <text
        className="circular-progress__text"
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize}
      >
        {`${progress}%`}
      </text>
    );
  };

  return (
    <svg width={svgSize} height={svgSize} className={`circular-progress circular-progress--size-${size} circular-progress--color-${color}`} style={{ '--initial-offset': circumference, '--final-offset': finalOffset }}>
      <circle
        className="circular-progress__background"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={svgSize / 2}
        cy={svgSize / 2}
      />
      <circle
        className={`circular-progress__bar ${animate ? 'circular-progress__animate' : ''}`}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={finalOffset}
        r={radius}
        cx={svgSize / 2}
        cy={svgSize / 2}
        transform={`rotate(-95 ${svgSize / 2} ${svgSize / 2})`}
      />
        {renderContent()}
    </svg>
  );
};

export default CircularProgress;
