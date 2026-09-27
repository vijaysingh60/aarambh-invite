export type RSVPStatus = "PENDING" | "ATTENDING" | "NOT_ATTENDING";
export type ContributionStatus = "PENDING" | "VERIFIED" | "REJECTED";
export type AdminRole = "ADMIN" | "SUPER_ADMIN" | "VIEWER";

export interface IStudent {
  _id: string;
  name: string;
  rollNumber: string;
  batch: string;
  background?: string;
  email?: string;
  mobile?: string;
  profilePhoto?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRSVP {
  _id: string;
  studentId?: string;
  name: string;
  rollNumber: string;
  batch: string;
  mobile?: string;
  email?: string;
  status: RSVPStatus;
  notes?: string;
  checkedIn?: boolean;
  checkedInAt?: string;
  checkedInBy?: string;
  submittedAt: string;
  updatedAt: string;
}

export interface IContribution {
  _id: string;
  studentId?: string;
  name: string;
  rollNumber?: string;
  batch?: string;
  amount?: number;
  transactionId?: string;
  paymentDate?: string;
  status: ContributionStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEventSettings {
  _id: string;
  eventName: string;
  university: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  description?: string;
  contacts: Array<{ name: string; phone: string }>;
  contributionReceiver: string;
  contributionBatch: string;
  contributionPhone: string;
  contributionRequired: boolean;
  scisConnectUrl?: string;
  qrCodeUrl?: string;
  updatedAt: string;
}

export interface IEventSchedule {
  _id: string;
  time: string;
  title: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface IAuditLog {
  _id: string;
  adminId?: string;
  adminName?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface DashboardStats {
  totalStudents: number;
  attending: number;
  notAttending: number;
  pending: number;
  verifiedContributions: number;
  pendingContributions: number;
  checkedIn: number;
  totalContributionAmount: number;
}
