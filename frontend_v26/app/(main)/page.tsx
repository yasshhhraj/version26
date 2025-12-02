import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="h-full w-full  ">
      <main className="flex h-full w-full relative flex-col ">
        <Navbar />
        <div className=" w-full h-full shrink-0 relative ">
          <div className="rounded-full w-72 h-72  bg-[#4600BE] absolute top-1/4 right-1/6 blur-[300px] "></div>
          <div className="rounded-full w-72 h-72  bg-[#4600BE] absolute bottom-1/4 left-1/5 blur-[300px] "></div>
          <div></div>
        </div>
        <div className="bg-blue-700 shrink-0 w-full h-full relative ">
          <div className="rounded-full w-52 h-52  bg-gray-800  absolute top-1/3 right-1/4 blur-[128px] "></div>
          <div className="rounded-full w-52 h-52  bg-gray-800  absolute bottom-1/4 left-1/5 blur-[128px] "></div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
