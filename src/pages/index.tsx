import { type NextPage } from "next";
import Head from "next/head";
import "@total-typescript/ts-reset";


import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  console.log(hello);

  return (
    <>
      <Head>
        <title>Politoed</title>
        <meta name="description" content="Pokemon VGC team builder" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-ta/b.svg" color="#5bbad5"/>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-4xl font-bold text-white">Politoed</h1>
        <p className="text-white">{hello?.data?.greeting}</p>
      </main>
    </>
  );
};

export default Home;
