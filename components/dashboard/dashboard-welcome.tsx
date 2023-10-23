import Button from "../shared/button";

export default function DashboardWelcome() {
  return (
    <div className="my-4">
      <p>You don&lsquo;t have any datasets.</p>
      <Button>Create a dataset</Button>
    </div>
  );
}
