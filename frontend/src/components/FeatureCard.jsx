import React from 'react';

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-neutral-800 p-6 hover:scale-105 transition-transform rounded-lg shadow-lg hover:shadow-xl duration-300">
      <div className="flex  hover:text-orange-300 transition-colors duration-300 select-none justify-center items-center mb-4 text-neutral-500">
        {icon}
      </div>
      <h3 className="text-xl select-none font-semibold text-white mb-2 text-center">{title}</h3>
      <p className="text-neutral-400 text-center">{description}</p>
    </div>
  );
}

export default FeatureCard;
