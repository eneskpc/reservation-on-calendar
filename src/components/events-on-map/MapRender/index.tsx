import ILatLngLiteral from "models/common/ILatLngLiteral";
import Map from "components/map";
import { Status } from "@googlemaps/react-wrapper";

type MapRenderProps = {
  status: Status;
  locations: ILatLngLiteral[];
};

const MapRender = ({ status, locations }: MapRenderProps) => {
  if (!locations || locations.length === 0) {
    return (
      <div className="bg-purple-400 flex justify-center items-center h-full">
        <div className="ei-spinner h-8 w-8"></div>
      </div>
    );
  }

  const zoom = 11;

  switch (status) {
    case Status.LOADING:
      return (
        <div className="bg-purple-400 flex justify-center items-center h-full">
          <div className="ei-spinner h-8 w-8"></div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="flex justify-center items-center h-full">
          <strong>Failure</strong>
        </div>
      );
    case Status.SUCCESS:
      const centerLocation = locations.find((l) => l.isCurrent) || locations[0];
      return <Map center={centerLocation} zoom={zoom} locations={locations} />;
  }
};

export default MapRender;
