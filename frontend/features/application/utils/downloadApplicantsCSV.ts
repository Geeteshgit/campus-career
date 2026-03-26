import { Job } from "@/features/job";
import { exportCSV } from "@/shared/utils/exportCSV";
import { getApplicantsForJob } from "../api/applications.api";
import { Applicant, Application } from "../types/application.types";

export const downloadApplicantsCSV = async (job: Job) => {
    try {
      const { applicants }: { applicants: Application[] } =
        await getApplicantsForJob(job._id);

      if (!applicants.length) {
        alert("No applicants found for this job.");
        return;
      }

      const formatted: Applicant[] = applicants.map((applicant) => ({
        enrollmentNumber: applicant.enrollmentNumber,
        name: applicant.name,
        email: applicant.email,
        phone: applicant.phone,
        program: applicant.program,
        year: applicant.year,
        batch: applicant.batch,
        specialization: applicant.specialization,
        cgpa: applicant.cgpa,
        appliedOn: new Date(applicant.createdAt).toLocaleDateString("en-GB"),
      }));

      exportCSV(formatted, `${job.company}_${job.role}_Applicants.csv`);
    } catch (err) {
      console.error("Download CSV error:", err);
    }
  };