import UpdateMember from "@/component/dashboard-component/payroll/UpdateMember";

const page = ({ params }: { params: { id: number } }) => {
  return <UpdateMember id={params?.id} />;
};

export default page;
