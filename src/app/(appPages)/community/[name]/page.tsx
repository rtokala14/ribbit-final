export default async function Page({
  params,
}: {
  params: {
    name: string;
  };
}) {
  return <div>Community Name: {params.name}</div>;
}
