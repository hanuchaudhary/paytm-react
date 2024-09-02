import React from 'react';

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex justify-center items-center mb-4 text-orange-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2 text-center">{title}</h3>
      <p className="text-zinc-400 text-center">{description}</p>
    </div>
  );
}

export default FeatureCard;
