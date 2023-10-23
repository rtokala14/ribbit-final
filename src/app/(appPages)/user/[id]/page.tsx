export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <div>Username: {params.id}</div>;
}
