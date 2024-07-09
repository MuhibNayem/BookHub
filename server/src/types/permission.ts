export interface Permission {
  id: number;
  role: string;
  resourceType: string;
  canRead: boolean;
  canWrite: boolean;
}
