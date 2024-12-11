import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import useSWR from "swr";

export default function Dashboard() {
  // GET request to fetch table data🐳
  const [table, setTable] = useState<string>("");
  const fetcher = (url: string, init: RequestInit | undefined) =>
    fetch(url, init).then((res) => res.json());
  const { data } = useSWR("http://localhost:8080/v1/table", (url) =>
    fetcher(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
  );

  useEffect(() => {
    if (data?.status) setTable(data.data);
  }, [data]);
  // GET request to fetch table data🐳

  const [openHeader, setOpenHeader] = useState<boolean>(true);

  return (
    <div className="bg-lightGray min-h-screen w-full relative left-0 right-0 p-4 font-poppins flex flex-col gap-4">
      <div
        className={`inset-x-4 bg-lightGray absolute z-10 duration-1000 ${
          openHeader ? "w-[97.5%]" : "h-24 w-24 rounded-bottom-right-2xl"
        }`}
      >
        <div
          className={`bg-gradient-to-b from-tealBright to-teal-300 text-black rounded-xl py-3 px-5 flex items-center justify-between duration-1000 h-20  ${
            openHeader ? "w-full" : "w-20"
          }`}
        >
          <div className="flex items-center gap-5">
            <img
              onClick={() => setOpenHeader(!openHeader)}
              src="/logo.webp"
              className="h-10 w-10 rounded-full cursor-pointer"
              alt="logo"
            />
            <div
              className={`${
                !openHeader ? "scale-0" : "delay-500"
              } duration-500 flex gap-4`}
            >
              <div className="flex items-center gap-2">
                <h2 className="font-light text-2xl text-zinc-800">
                  Welcome in,
                </h2>
                <h1 className="font-semibold text-2xl">Muhammad Mifta</h1>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex flex-col justify-end ${
                !openHeader ? "scale-0" : "delay-500"
              } duration-500`}
            >
              <h1 className="font-semibold text-2xl -mb-2 text-end">
                Free Account
              </h1>
              <h2 className="font-light text-zinc-800 text-end">
                Limited Features
              </h2>
            </div>
            <div
              onClick={() => setOpenHeader(false)}
              className={`text-4xl text-teal-800 cursor-pointer duration-300 hover:text-white ${
                !openHeader ? "scale-0" : " delay-500"
              }`}
            >
              <IoIosCloseCircleOutline />
            </div>
          </div>
          {/* <h1 className="font-inter italic absolute left-1/2 -translate-x-[50%] bg-clip-text text-transparent bg-gradient-to-r from-zinc-600 to-zinc-800 text-lg">
          PowerSync
        </h1> */}
        </div>
      </div>
      <div
        className={`rounded-xl bg-gradient-to-t from-tealBright to-teal-300 h-[120vh] left-4 right-4 flex flex-col justify-center items-center duration-700 absolute ${
          openHeader ? "top-28" : "top-4 delay-700"
        }`}
      >
        {table ? <h1>Dashboard</h1> : <GoToUpload />}
      </div>
    </div>
  );
}

function GoToUpload() {
  return (
    <>
      <img className="h-2/3 mb-5" src="/characters/1.png" alt="" />
      <h1 className="text-3xl font-semibold -mb-1">
        It looks like you haven’t uploaded your CSV file yet.
      </h1>
      <h2 className="text-xl font-light">
        To get started, please upload your appliance data so we can begin
        optimizing your energy usage.
      </h2>
      <Link className="text-xl mt-4 hover:underline font-bold" to={"/upload"}>
        Upload CSV Now
      </Link>
    </>
  );
}
