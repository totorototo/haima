import {
  ClientOnly,
  FileUploader,
  HeatMaps,
  Layout,
  SpatialScene,
  Stats,
} from "../../components";
import { AutoSizer } from "react-virtualized";

import style from "../../styles/tbd.Style";

function Haisma({ className }) {
  return (
    <div className={className}>
      <Layout>
        <div className={"container"}>
          <div className={"file-uploader-container child"}>
            <FileUploader />
          </div>
          <div className={"scene-container child"}>
            <ClientOnly>
              <AutoSizer>
                {({ width, height }) => (
                  <SpatialScene width={width} height={height} />
                )}
              </AutoSizer>
            </ClientOnly>
          </div>
          <div className={"heatmap-container child"}>
            <ClientOnly>
              <HeatMaps />
            </ClientOnly>
          </div>
          <div className={"stats-container child"}>
            <ClientOnly>
              <AutoSizer>
                {({ width, height }) => <Stats width={width} height={height} />}
              </AutoSizer>
            </ClientOnly>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default style(Haisma);
