export type ImageMetaData = {
  id: number;
  message_id?: string;
  labels?: Labels;
  image_bucket_id?: string;
  image_name?: string;
};

export type Labels = {
  event_labels: Label[];
  action_labels: Label[];
  location_labels: Label[];
};

export type Label = { [key: string]: number };
