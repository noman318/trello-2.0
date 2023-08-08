"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/boardStore";
import fetchSuggestion from "@/lib/fetchSuggestion";
import formatTodoForAI from "@/lib/formatTodoForAI";

const Header = () => {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  // formatTodoForAI wortking properly
  // useEffect(() => {
  //   const todos = formatTodoForAI(board);
  //   console.log("todos from Fetch suggestion in useEffect function", todos);
  // }, [board]);

  // useEffect(() => {
  //   if (board.columns.size === 0) return;
  //   // setLoading(true);

  //   const fetchSuggestionFunction = async () => {
  //     // const suggestions = await fetchSuggestion(board);
  //     // setSuggestion(suggestions);
  //     setLoading(false);
  //   };
  //   fetchSuggestionFunction();
  // }, [board]);
  // console.log("suggestion in Header", suggestion);
  return (
    <header>
      <div className="flex flex-col items-center p-5 md:flex-row bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055d1] rounded-md filter blur-3xl opacity-50 -z-50" />
        <Image
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Trello-logo-blue.svg/2560px-Trello-logo-blue.svg.png"
          }
          alt="Trello_log"
          width={300}
          height={100}
          className="object-contain pb-10 w-44 md:w-56 md:pb-0"
        />
        <div className="flex items-center justify-end w-full space-x-2 md:space-x-5">
          <form className="flex items-center flex-1 p-2 space-x-2 md:space-x-5 bg-white rounded-md shadow-md md:flex-initial">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 p-2 outline-none text-sm w-full"
            />
            <button hidden type="submit">
              Search
            </button>
          </form>
          <Avatar name="Noman Shaikh" size="45" round color="#0055d1" />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center p-5 p text-sm font-light shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055d1]">
          <UserCircleIcon
            className={`inline-block w-10 h-10 text-[#0055d1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading ? suggestion : "My day to day tasks are..."}
        </p>
      </div>
    </header>
  );
};

export default Header;
{
  /* <div className="flex items-center justify-end flex-1 w-full space-x-5">
          <form className="flex items-center flex-1 p-2 space-x-5 bg-white rounded-md shadow-md md:flex-initial">
            <MagnifyingGlassIcon
              // className="w-6 h-6 text-gray-400"
              className="w-6 h-6 text-gray-400 mb-2 md:mb-0 md:mr-2 sm:w-3 sm:h-6"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 p-2 outline-none"
            />
            <button hidden type="submit">
              Search
            </button>
          </form>
          <Avatar name="Noman Shaikh" size="50" round color="#0055d1" />
        </div> */
}
