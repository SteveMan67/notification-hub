interface PluginCardProps {
  id: string;
  title: string;
  description: string;
  connected: boolean;
}

export function PluginCard() {
  return (
    <div className="plugin-card">
      <div className="info">
        <p id="status"></p>
        <p id="title"></p>
        <p id="description"></p>
      </div>
      <div className="right-info">
        <a id="configure">Configure</a>
        <div className="arrow">
          <img src="/assets/icons/arrow-right.svg" />
        </div>
      </div>
    </div>
  );
}
