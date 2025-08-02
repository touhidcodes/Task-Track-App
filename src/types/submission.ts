export interface TStudent {
  id: string;
  username: string;
  email: string;
}

export interface TAssignment {
  id: string;
  title: string;
}

export interface TSubmissionWithStudent {
  id: string;
  submissionUrl: string;
  note?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  feedback?: string;
  createdAt: string;
  updatedAt?: string;

  student: TStudent;
  studentId: string;

  assignment: TAssignment;
  assignmentId: string;
}
