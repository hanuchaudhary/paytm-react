import React from "react";

const FeatureCard = ({image, title}) => {
  return (
    <div>
      <div className="card relative border border-zinc-500">
        <div className="overflow-hidden">
          <img
            className=""
            src={image}
            alt=""
          />
        </div>
        <div className="absolute z-1 top-0 p-5 md:p-11">
          <div >
            <img className="w-20 md:w-40"
              src="https://web-images.credcdn.in/v2/_next/assets/images/landing/desktop/snp-logo-final.png"
              alt=""
            />
          </div>
          <h1 className="md:text-5xl text-xl lg:text-2xl font-semibold my-2 lg:my-3 md:my-6">{title}</h1>
          <div className="uppercase text-sm border border-zinc-400 font-semibold md:py-4 py-2 md:px-8 px-3 inline-block">
            Know more
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
