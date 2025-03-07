export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      album: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      cluster_mapping: {
        Row: {
          centroid: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          centroid: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          centroid?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      image: {
        Row: {
          album_id: string | null
          created_at: string
          description: string | null
          id: string
          image_bucket_id: string
          image_features: string | null
          image_name: string
          is_face_detection: boolean
          labels: Json | null
          location: unknown | null
          updated_at: string
          uploader_id: string | null
        }
        Insert: {
          album_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_bucket_id: string
          image_features?: string | null
          image_name: string
          is_face_detection?: boolean
          labels?: Json | null
          location?: unknown | null
          updated_at?: string
          uploader_id?: string | null
        }
        Update: {
          album_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_bucket_id?: string
          image_features?: string | null
          image_name?: string
          is_face_detection?: boolean
          labels?: Json | null
          location?: unknown | null
          updated_at?: string
          uploader_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_uploader_id_fkey"
            columns: ["uploader_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      person: {
        Row: {
          cluster_id: number | null
          coordinate: Json
          created_at: string
          embedding: string
          id: number
          image_id: string
          user_id: string
        }
        Insert: {
          cluster_id?: number | null
          coordinate: Json
          created_at?: string
          embedding: string
          id?: number
          image_id: string
          user_id: string
        }
        Update: {
          cluster_id?: number | null
          coordinate?: Json
          created_at?: string
          embedding?: string
          id?: number
          image_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "person_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "cluster_mapping"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "image"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          avatar_url: string | null
          created_at: string
          dob: string | null
          email: string
          id: string
          is_done_label_form: boolean
          name: string
          survey_answers: string[] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          dob?: string | null
          email: string
          id?: string
          is_done_label_form?: boolean
          name: string
          survey_answers?: string[] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          dob?: string | null
          email?: string
          id?: string
          is_done_label_form?: boolean
          name?: string
          survey_answers?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      video_chunk: {
        Row: {
          chunk_bucket_id: string
          chunk_name: string
          id: string
          video_id: string
        }
        Insert: {
          chunk_bucket_id: string
          chunk_name: string
          id?: string
          video_id: string
        }
        Update: {
          chunk_bucket_id?: string
          chunk_name?: string
          id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_chunk_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video_render"
            referencedColumns: ["id"]
          },
        ]
      }
      video_image: {
        Row: {
          image_id: string
          video_id: string
        }
        Insert: {
          image_id: string
          video_id: string
        }
        Update: {
          image_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_image_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "image"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_image_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video_render"
            referencedColumns: ["id"]
          },
        ]
      }
      video_render: {
        Row: {
          created_at: string
          id: string
          progress: number
          request_user_id: string
          schema: Json | null
          status: Database["public"]["Enums"]["video_render_status"]
          thumbnail_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          progress?: number
          request_user_id: string
          schema?: Json | null
          status?: Database["public"]["Enums"]["video_render_status"]
          thumbnail_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          progress?: number
          request_user_id?: string
          schema?: Json | null
          status?: Database["public"]["Enums"]["video_render_status"]
          thumbnail_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_render_request_user_id_fkey"
            columns: ["request_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      video_render_status: "pending" | "in_progress" | "completed" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
