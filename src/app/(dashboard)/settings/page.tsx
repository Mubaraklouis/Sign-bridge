import { Sun, Volume2, Vibrate } from "lucide-react";

const SettingPage = () => {
  return (
    <>
      <div className="flex flex-col h-full md:mt-8 mt-4">
        <div className="p-4 flex-1">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white dark:bg-[#22262b] rounded-lg shadow-lg border p-4 text-black dark:text-white">
              <h2 className="font-medium mb-4 ">Accessibility</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun size={20} />
                    <span>High Contrast Mode</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 size={20} />
                    <span>Sound Feedback</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Vibrate size={20} />
                    <span>Haptic Feedback</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#22262b] dark:text-white rounded-lg shadow-lg border p-4 text-black">
              <h2 className="font-medium mb-4 ">Text Size</h2>
              <input type="range" className="w-full" min="12" max="24" />
            </div>
            <div className="bg-white dark:bg-[#22262b] text-white rounded-lg shadow-lg border p-4">
              <h2 className="font-medium mb-4 text-black dark:text-white">
                Language
              </h2>
              <select className="w-full p-2 rounded border border-gray-200 text-black dark:text-white">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
