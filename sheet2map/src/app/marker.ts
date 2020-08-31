type GUID = string & {
  isGuid: true
};

function guid(guid: string) : GUID {
    return  guid as GUID; // maybe add validation that the parameter is an actual guid ?
}

export class Marker {
  id: GUID;
  data: [];
}
