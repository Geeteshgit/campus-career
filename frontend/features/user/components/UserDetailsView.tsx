// Shared UI Components
import Button from "@/shared/ui/Button";

// Local Imports
import type { User } from "../types/user.types";
import InfoRow from "@/shared/ui/InfoRow";

type UserDetailsViewProps = {
  data: User;
  onEdit: () => void;
};

const UserDetailsView = ({ data, onEdit }: UserDetailsViewProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-neutral-800">
          Personal Details
        </h2>
        <Button variant="primary" onClick={onEdit}>
          Edit
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <InfoRow label="Name" value={data.name ?? ""} />
        <InfoRow label="Email" value={data.email ?? ""} />
      </div>

      <InfoRow label="Phone Number" value={data.phone ?? ""} />
    </div>
  );
};

export default UserDetailsView;
