import React, { useEffect } from "react";

function Discord() {

  useEffect(() => {
    window.location.href = "https://discord.gg/ag7tnjNd6R";
  }, []);

  return (
    <div>
      <h2>Discord</h2>
    </div>
  );
}

export default Discord;