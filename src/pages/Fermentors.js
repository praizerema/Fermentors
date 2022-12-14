/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Layout } from "../components";
import { FermentorData } from "../components";
import { useApi } from "../context";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
const Fermentors = () => {
  const [currentCount, setCurrentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fermentorEvents, setFermentorEvents] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [timeSeries, setTimeSeries] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastEvents, setLastEvents] = useState({});
  const [fermentationStatus, setFermentationStatus] = useState(false);

  let api = useApi();
  // Handle Fermentor click
  const handleLoadEvent = (item, count) => {
    let url = item.url;
    setCurrentCount(count);
    //Fetch fermentor event
    const fetchEvent = async (url) => {
      setIsLoading(true);
      setHasError(false);
      let results = null;
      results = await api.getFermentorEvents(url);
      if (results.success) {
        let { data } = results;
        setFermentorEvents(data);
      } else {
        let { message } = results;
        setHasError(true);
        setErrorMessage(message);
      }
      setIsLoading(false);
    };
    fetchEvent(url);
  };
  //   Load fermentor one by default
  useEffect(() => {
    handleLoadEvent(FermentorData[0], 1);
  }, []);
  //   Structure graph data and get last events for a running fermentor
  useEffect(() => {
    if (fermentorEvents !== null) {
      let phArr = [];
      let tempArr = [];
      let doArr = [];
      let startRunArr = [];
      let endRunArr = [];
      let fermentorSeries;

      fermentorEvents?.map((fermentorEvent) => {
        if (fermentorEvent.event_type === "MeasurePh") {
          phArr.push({
            time: fermentorEvent?.timestamp,
            value: fermentorEvent?.event_properties[0].value,
          });
        }
        if (fermentorEvent.event_type === "MeasureTemperature") {
          tempArr.push({
            time: fermentorEvent?.timestamp,
            value: fermentorEvent?.event_properties[0].value,
          });
        }

        if (fermentorEvent.event_type === "MeasureDO") {
          doArr.push({
            time: fermentorEvent?.timestamp,
            value: fermentorEvent?.event_properties[0].value,
          });
        }
        if (fermentorEvent.event_type === "StartRun") {
          startRunArr.push(fermentorEvent);
        }
        if (fermentorEvent.event_type === "EndRun") {
          endRunArr.push(fermentorEvent);
        }
      });
      fermentorSeries = [
        { name: "Temperature", color: "#f2286c", data: tempArr },
        { name: "Dissolved Oxygen", color: "#24cc8b", data: doArr },
        { name: "pH", color: "#ffa816", data: phArr },
      ];
      setTimeSeries(fermentorSeries);
      let startPlusEnd = startRunArr.length + endRunArr.length;
      if (startPlusEnd % 2 === 1) {
        setFermentationStatus(true);
        setLastEvents({
          temperature: tempArr[tempArr.length - 1]?.value,
          dissolved_oxygen: doArr[doArr.length - 1]?.value,
          pH: phArr[phArr.length - 1]?.value,
        });
      } else {
        setFermentationStatus(false);
      }
    }
  }, [fermentorEvents]);

  return (
    <Layout>
      <>
        <div className="lg:px-20 px-5 h-screen pt-20">
          {/* Fermentor graphical represnentation view*/}
          <div className="h-[75%] w-full bg-gray-100 overflow-y-scroll">
            {/* Is loading view */}
            {isLoading && (
              <>
                <div className="text-4xl text-center py-32 text-gray-700">
                  Loading...
                </div>
              </>
            )}
            {/* Success Event view */}
            {!hasError && !isLoading ? (
              <div className="grid md:grid-cols-4 gap-4">
                <div className="lg:col-span-3 col-span-4 md:px-6 py-6">
                  <h1 className="text-3xl font-bold text-center text-gray-700">
                    Fermentor {currentCount}
                  </h1>

                  <div className="w-full h-[400px] mt-6">
                    <ResponsiveContainer>
                      <LineChart
                        margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="time"
                          domain={["dataMin", "auto"]}
                          name="Time"
                          tickFormatter={(unixTime) =>
                            moment(unixTime).format("HH:mm:ss Do")
                          }
                          tickCount={22}
                          type="number"
                        >
                          <Label
                            value={"Time"}
                            position="insideBottom"
                            offset={-6}
                            style={{ textAnchor: "middle" }}
                          />
                        </XAxis>

                        <YAxis>
                          <Label
                            value={"Value"}
                            position="insideLeft"
                            offset={25}
                            angle={-90}
                            style={{ textAnchor: "middle" }}
                          />
                        </YAxis>
                        <Tooltip
                          labelFormatter={function (value) {
                            return `Time: ${new Date (value)}`;
                          }}
                        />

                        <Legend layout="horizontal" align="right" />
                        {timeSeries?.map((s) => (
                          <Line
                            dataKey="value"
                            data={s.data}
                            name={s.name}
                            key={s.name}
                            stroke={s.color}
                            strokeWidth="2.5px"
                            type="monotoneX"
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="lg:col-span-1 col-span-4 md:py-16 py-3 text-lg px-5 space-y-2">
                  <div>
                    <span>Status: </span>
                    <span
                      className={`${
                        fermentationStatus ? "text-red-700" : "text-green-700"
                      } font-bold`}
                    >
                      {fermentationStatus ? "Running" : "Ended"}
                    </span>
                  </div>
                  {fermentationStatus && (
                    <>
                      <div className="text-[#f2286c]">
                        <span>Temperature: </span>
                        <span className="font-bold">
                          {lastEvents.temperature}
                        </span>
                      </div>
                      <div className="text-[#24cc8b]">
                        <span>Dissolved Oxygen: </span>
                        <span className="font-bold">
                          {lastEvents.dissolved_oxygen}
                        </span>
                      </div>
                      <div className="text-[#ffa816]">
                        <span>pH: </span>{" "}
                        <span className="font-bold">{lastEvents.pH}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
            {/* hasError view */}
            {hasError && !isLoading ? (
              <>
                <div className="text-4xl text-center py-32 text-red-800">
                  {errorMessage}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {/* Fermentor list */}
          <div className="w-full h-[20%] mt-5 overflow-x-scroll overflow-y-hidden">
            <div className=" inline-flex  space-x-4">
              {FermentorData?.map((item, index) => (
                <div
                  onClick={() => handleLoadEvent(item, index + 1)}
                  key={index}
                  className={` w-[250px] py-10 border-r border-gray-100 text-gray-600 cursor-pointer bg-blue-100 rounded-md duration-300 ease-in-out delay-150 transition-all ${
                    currentCount === index + 1
                      ? "translate-y-1 scale-20 bg-blue-400 text-white"
                      : ""
                  }`}
                >
                  <div className="text-center pb-6">Fermentor {index + 1}</div>
                  <div className="text-center ">{item.fermentor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Fermentors;
