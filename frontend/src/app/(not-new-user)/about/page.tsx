type PageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: PageProps) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <>Page</>;
}
