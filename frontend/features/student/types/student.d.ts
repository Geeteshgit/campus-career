export type Student = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  enrollmentNumber: string;
  program: string;
  year: string;
  cgpa: number;
  batch: string;
  specialization: string;
};