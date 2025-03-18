import { ImageMetaData } from "../../src/types/database.type";

export const mockImageMetaData: ImageMetaData[] = [
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "1",
    image_bucket_id: "image_bucket_1",
    image_name: "image_name_1",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Thanksgiving: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [
        {
          running: 0.5,
          walking: 0.2,
        },
      ],
      location_labels: [{ beach: 0.8, coast: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "2",
    image_bucket_id: "image_bucket_2",
    image_name: "image_name_2",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Thanksgiving: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [
        {
          running: 0.5,
          walking: 0.2,
        },
      ],
      location_labels: [{ beach: 0.9, forest: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "3",
    image_bucket_id: "image_bucket_3",
    image_name: "image_name_3",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Thanksgiving: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [
        {
          running: 0.5,
          walking: 0.2,
        },
      ],
      location_labels: [{ beach: 0.9, ocean: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "4",
    image_bucket_id: "image_bucket_4",
    image_name: "image_name_4",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Marathon: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [
        {
          smiling: 0.5,
          talking: 0.2,
        },
      ],
      location_labels: [{ beach: 0.5, pond: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "5",
    image_bucket_id: "image_bucket_5",
    image_name: "image_name_5",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Concert: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [],
      location_labels: [{ zoo: 0.5, park: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "6",
    image_bucket_id: "image_bucket_6",
    image_name: "image_name_6",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          "Pool Party": 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [],
      location_labels: [{ zoo: 0.6, museum: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "7",
    image_bucket_id: "image_bucket_7",
    image_name: "image_name_7",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [],
      action_labels: [],
      location_labels: [{ highschool: 0.5, primaryschool: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "8",
    image_bucket_id: "image_bucket_8",
    image_name: "image_name_8",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [],
      action_labels: [],
      location_labels: [{ "festival ground": 0.5, festival: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "9",
    image_bucket_id: "image_bucket_9",
    image_name: "image_name_9",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [],
      action_labels: [],
      location_labels: [{ forest: 0.6, tree: 0.2 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "10",
    image_bucket_id: "image_bucket_10",
    image_name: "image_name_10",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [],
      action_labels: [],
      location_labels: [{ kindergarten: 0.6, tree: 0.2 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
];

// create a complete mock image from the image metadata
export const mockImageForVideoContent = [
  ...mockImageMetaData,
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "1",
    image_bucket_id: "image_bucket_1",
    image_name: "image_name_1",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Thanksgiving: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [
        {
          running: 0.5,
          walking: 0.2,
        },
      ],
      location_labels: [{ beach: 0.8, coast: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "1",
    image_bucket_id: "image_bucket_1",
    image_name: "image_name_1",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Thanksgiving: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [
        {
          running: 0.5,
          walking: 0.2,
        },
      ],
      location_labels: [{ beach: 0.8, coast: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "1",
    image_bucket_id: "image_bucket_1",
    image_name: "image_name_1",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Thanksgiving: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [
        {
          running: 0.5,
          walking: 0.2,
        },
      ],
      location_labels: [{ beach: 0.8, coast: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "1",
    image_bucket_id: "image_bucket_1",
    image_name: "image_name_1",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Thanksgiving: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [
        {
          running: 0.5,
          walking: 0.2,
        },
      ],
      location_labels: [{ beach: 0.8, coast: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "1",
    image_bucket_id: "image_bucket_1",
    image_name: "image_name_1",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Thanksgiving: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [
        {
          running: 0.5,
          walking: 0.2,
        },
      ],
      location_labels: [{ beach: 0.8, coast: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
  {
    album_id: null,
    created_at: Date.now().toString(),
    description: null,
    id: "1",
    image_bucket_id: "image_bucket_1",
    image_name: "image_name_1",
    image_features: null,
    is_face_detection: false,
    labels: {
      event_labels: [
        {
          Thanksgiving: 0.5,
          "New Year Celebrations": 0.2,
        },
      ],
      action_labels: [
        {
          running: 0.5,
          walking: 0.2,
        },
      ],
      location_labels: [{ beach: 0.8, coast: 0.1 }],
    },
    location: "",
    updated_at: Date.now().toString(),
    uploader_id: null,
  },
];
