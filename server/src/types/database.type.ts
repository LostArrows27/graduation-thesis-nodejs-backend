import { Database } from "../supabase/database.types";

export type ImageMetaData = Database["public"]["Tables"]["image"]["Row"] & {
  labels: Labels | undefined | null;
};

export type Labels = {
  event_labels: Label[];
  action_labels: Label[];
  location_labels: Label[];
};

export type Label = { [key: string]: number };
