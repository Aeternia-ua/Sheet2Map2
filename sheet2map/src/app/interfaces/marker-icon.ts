// export interface NewMarkerIcon {
//   getIcon(): string;
//   setIcon(icon: string): void;
//   getPrefix(): string;
//   setPrefix(prefix: string): void;
//   getMarkerColor(): string;
//   setMarkerColor(color: string): void;
// }
export interface MarkerIcon {
  icon: string;
  prefix: string;
  markerColor: string;
}

export interface AgmMarkerIcon {
  anchor?: string;
  labelOrigin?: string;
  origin?: string;
  scaledSize?: string;
  size?: string;
  icon?: any;
  label: any;
  url?: any;
}
