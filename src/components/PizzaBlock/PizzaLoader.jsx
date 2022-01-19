import React from "react";
import ContentLoader from "react-content-loader";

function PizzaLoader() {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="136" cy="135" r="120" />
      <rect x="-1" y="267" rx="6" ry="6" width="280" height="26" />
      <rect x="-1" y="311" rx="6" ry="6" width="280" height="84" />
      <rect x="0" y="412" rx="6" ry="6" width="83" height="32" />
      <rect x="133" y="405" rx="19" ry="19" width="140" height="43" />
    </ContentLoader>
  );
}

export default PizzaLoader;
