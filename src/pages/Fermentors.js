import React, { useState, useEffect } from "react";
import { Layout } from "../components";
import { FermentorData } from "../components";
import { useFermentorEvents } from "../hooks";
import { useApi } from "../context";
const Fermentors = () => {
  let api = useApi();
  let { fermentorEvents, hasError, errorMessage } = useFermentorEvents();
  const handleLoadEvent = async (url) => {
    // useFermentorEvents(url/÷)
    let results = await api.getFermentorEvents(url);
    console.log(results);
  };
  return (
    <Layout>
      <>
        <div className="px-20 h-screen pt-20">
            {/* Fermentor graphical represnentation */}
          <div className="h-[70%] w-full bg-gray-100">Grapph</div>
          {/* Fermentor list */}
          <div className="h-[20%] w-full bg-blue-100 flex overflow-scroll">
            {FermentorData?.map((item) => (
              <div
                onClick={() => handleLoadEvent(item.url)}
                className="w-1/4 border-r border-gray-100 text-gray-800 hover:text-white hover:transition-all  hover:translate-y-1 hover:scale-110 hover:bg-blue-400 duration-300 ease-in-out delay-150 cursor-pointer"
              >
                <div className="text-center my-16">{item.fermentor}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Fermentors;
