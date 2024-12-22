export const App = () => {
  return (
    <div className="flex h-screen bg-gray-100 p-5">
      <div className="w-64 bg-white rounded-lg p-5 mr-5">
        <div className="text-2xl font-bold">MYDNA</div>
        <ul className="mt-5">
          <li className="p-2 cursor-pointer mb-1">Homepage</li>
          <li className="p-2 cursor-pointer mb-1">Statistics</li>
          <li className="p-2 cursor-pointer mb-1 bg-gray-100 rounded-lg">Analytics</li>
          <li className="p-2 cursor-pointer mb-1">Appointments</li>
          <li className="p-2 cursor-pointer mb-1">Messages 2</li>
        </ul>
        <div className="mt-5 font-bold">
          Connected Profiles
          <button className="ml-2 bg-gray-100 border-none rounded-lg py-1 px-2 cursor-pointer">
            Add another
          </button>
        </div>
        <div className="mt-5 font-bold">
          AI Powered Analytics
          <ul>
            <li className="p-2 cursor-pointer mb-1">Spectroscope Ready</li>
            <li className="p-2 cursor-pointer mb-1">DNA Profile In progress</li>
            <li className="p-2 cursor-pointer mb-1">Genetic Scanner In progress</li>
            <li className="p-2 cursor-pointer mb-1">General Analysis In progress</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5">
        <div className="bg-white rounded-md p-5 shadow-md">
            <div className="flex justify-between text-gray-700">
                <div className="text-xl font-bold">DNA Overview</div>
                <div className="flex gap-2 text-sm">
                    <span className="p-1 cursor-pointer rounded-md text-center hover:bg-gray-100">Day</span>
                    <span className="p-1 cursor-pointer rounded-md text-center hover:bg-gray-100">Week</span>
                    <span className="p-1 cursor-pointer rounded-md text-center hover:bg-gray-100">Month</span>
                </div>
            </div>
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <p className="mb-5">Good interaction with other molecules</p>
                    <button className="bg-gray-100 border-none rounded-lg py-2 px-3 cursor-pointer">Learn more</button>
                </div>
            </div>

        </div>
          <div className="flex gap-5">
              <div className="flex-1  bg-white rounded-md p-5 shadow-md flex flex-col">
                  <div className="flex flex-col text-gray-700">
                      <p className="text-base">Becca Kirby</p>
                      <p className="text-xs">Chicago, USA</p>
                  </div>
                  <div className="flex justify-between mt-3 text-sm text-gray-700">
                      <p>27 Analysis in progress</p>
                      <p>31 Active treatments</p>
                  </div>
                  <div className="mt-8 flex flex-col items-start text-gray-700">
                      <div className="flex mb-2 text-sm">
                          <p className="font-bold">Heartrate <span className="ml-1 font-normal">Average rate</span></p>
                      </div>
                      <div className="flex items-center justify-center h-24 text-4xl">92 bpm</div>
                  </div>
              </div>
              <div className="flex-1  bg-white rounded-md p-5 shadow-md text-gray-700">
                  <div className="flex justify-between">
                      <div className="text-xl font-bold">Researches</div>
                  </div>
                  <div className="flex flex-col mt-5 gap-2 text-sm">
                      <p> Sun Mon Tue Web Thu </p>
                      <p> Diagnosis of genetic diseases </p>
                      <p> Calculating the risk of diseases </p>
                      <p> Patterns in heredity </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};