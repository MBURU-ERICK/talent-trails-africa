export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "17.1"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          cover_note: string
          created_at: string
          id: string
          opportunity_id: string
          status: string
          talent_id: string
        }
        Insert: {
          cover_note?: string
          created_at?: string
          id?: string
          opportunity_id: string
          status?: string
          talent_id: string
        }
        Update: {
          cover_note?: string
          created_at?: string
          id?: string
          opportunity_id?: string
          status?: string
          talent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_attempts: {
        Row: {
          answers: Json
          assessment_id: string
          created_at: string
          id: string
          score: number
          user_id: string
        }
        Insert: {
          answers: Json
          assessment_id: string
          created_at?: string
          id?: string
          score: number
          user_id: string
        }
        Update: {
          answers?: Json
          assessment_id?: string
          created_at?: string
          id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_attempts_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions: {
        Row: {
          assessment_id: string
          correct: number
          id: string
          options: Json
          question: string
        }
        Insert: {
          assessment_id: string
          correct: number
          id?: string
          options: Json
          question: string
        }
        Update: {
          assessment_id?: string
          correct?: number
          id?: string
          options?: Json
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          category: string
          id: string
          questions: Json
          title: string
        }
        Insert: {
          category: string
          id: string
          questions: Json
          title: string
        }
        Update: {
          category?: string
          id?: string
          questions?: Json
          title?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json
          id: string
          record_id: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          record_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          record_id?: string | null
        }
        Relationships: []
      }
      credential_reviews: {
        Row: {
          created_at: string
          credential_id: string
          decision: string
          id: string
          notes: string
          reviewer_id: string
        }
        Insert: {
          created_at?: string
          credential_id: string
          decision: string
          id?: string
          notes: string
          reviewer_id: string
        }
        Update: {
          created_at?: string
          credential_id?: string
          decision?: string
          id?: string
          notes?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credential_reviews_credential_id_fkey"
            columns: ["credential_id"]
            isOneToOne: false
            referencedRelation: "credentials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credential_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credentials: {
        Row: {
          created_at: string
          id: string
          name: string
          path: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          path: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          path?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_profiles: {
        Row: {
          company_name: string
          created_at: string
          description: string
          user_id: string
          website: string
        }
        Insert: {
          company_name: string
          created_at?: string
          description?: string
          user_id: string
          website?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          description?: string
          user_id?: string
          website?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_requests: {
        Row: {
          created_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mentors: {
        Row: {
          availability: string
          demo: boolean
          expertise: string[]
          id: string
          name: string
          title: string
        }
        Insert: {
          availability: string
          demo?: boolean
          expertise: string[]
          id?: string
          name: string
          title: string
        }
        Update: {
          availability?: string
          demo?: boolean
          expertise?: string[]
          id?: string
          name?: string
          title?: string
        }
        Relationships: []
      }
      mentorship_requests: {
        Row: {
          created_at: string
          id: string
          mentor_id: string
          message: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mentor_id: string
          message: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mentor_id?: string
          message?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_requests_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentorship_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          company: string
          created_at: string
          deadline: string
          demo: boolean
          description: string
          employer_id: string | null
          experience: number
          id: string
          location: string
          skills: string[]
          status: string
          title: string
          type: string
        }
        Insert: {
          company: string
          created_at?: string
          deadline: string
          demo?: boolean
          description: string
          employer_id?: string | null
          experience?: number
          id?: string
          location: string
          skills?: string[]
          status?: string
          title: string
          type?: string
        }
        Update: {
          company?: string
          created_at?: string
          deadline?: string
          demo?: boolean
          description?: string
          employer_id?: string | null
          experience?: number
          id?: string
          location?: string
          skills?: string[]
          status?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          created_at: string
          description: string
          id: string
          title: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          title: string
          url?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          title?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          education: string
          experience: number
          id: string
          interests: string
          languages: string
          location: string
          name: string
          passport_ref: string
          preferences: string
          shared: boolean
          skills: string[]
          title: string
        }
        Insert: {
          created_at?: string
          education?: string
          experience?: number
          id: string
          interests?: string
          languages?: string
          location?: string
          name?: string
          passport_ref?: string
          preferences?: string
          shared?: boolean
          skills?: string[]
          title?: string
        }
        Update: {
          created_at?: string
          education?: string
          experience?: number
          id?: string
          interests?: string
          languages?: string
          location?: string
          name?: string
          passport_ref?: string
          preferences?: string
          shared?: boolean
          skills?: string[]
          title?: string
        }
        Relationships: []
      }
      readiness_progress: {
        Row: {
          complete: boolean
          task: string
          user_id: string
        }
        Insert: {
          complete?: boolean
          task: string
          user_id: string
        }
        Update: {
          complete?: boolean
          task?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "readiness_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      readiness_tasks: {
        Row: {
          id: string
          official_confirmation: boolean
          title: string
          url: string
        }
        Insert: {
          id: string
          official_confirmation?: boolean
          title: string
          url: string
        }
        Update: {
          id?: string
          official_confirmation?: boolean
          title?: string
          url?: string
        }
        Relationships: []
      }
      saved_opportunities: {
        Row: {
          created_at: string
          opportunity_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          opportunity_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          opportunity_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_opportunities_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_opportunities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      talent_profiles: {
        Row: {
          created_at: string
          user_id: string
          work_experience: string
        }
        Insert: {
          created_at?: string
          user_id: string
          work_experience?: string
        }
        Update: {
          created_at?: string
          user_id?: string
          work_experience?: string
        }
        Relationships: [
          {
            foreignKeyName: "talent_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_skills: {
        Row: {
          skill_id: string
          status: string
          user_id: string
        }
        Insert: {
          skill_id: string
          status?: string
          user_id: string
        }
        Update: {
          skill_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "talent_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "talent_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      impact_counts: { Args: never; Returns: Json }
      review_credential: {
        Args: { approved: boolean; credential: string; note: string }
        Returns: undefined
      }
      review_employer: {
        Args: { applicant: string; approved: boolean }
        Returns: undefined
      }
      submit_assessment: {
        Args: { assessment: string; responses: Json }
        Returns: number
      }
    }
    Enums: {
      app_role: "talent" | "employer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["talent", "employer", "admin"],
    },
  },
} as const
