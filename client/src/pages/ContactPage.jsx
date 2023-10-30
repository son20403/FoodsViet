import React from "react";

const ContactPage = () => {
  return (
    <div className="bg-white">
      <div
        className="w-full h-[400px] relative min-h-[100%] bg-cover mb-5"
        style={{ backgroundImage: "url('../src/assets/image/bg-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-3 font-bold text-white text-7xl">Contact Us</div>
            <div className="flex flex-wrap p-0 text-white list-none ">
              <div className="flex justify-center uppercase">
                <div className="pr-2 font-semibold text-orange-500 cursor-pointer hover:opacity-70">
                  Home
                </div>
                <div className="pr-2 font-semibold text-orange-500 cursor-pointer hover:opacity-70 before:content-['/'] before:pr-2 before:text-white before:opacity-70">
                  Pages
                </div>
                <div className="font-semibold before:content-['/'] before:pr-2 before:opacity-70">
                  Contact
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-12 pb-4 mx-auto">
        <div className="text-center ">
          <h5 className="relative inline-block pr-8 mb-2 text-3xl font-extrabold text-primary font-dancing">
            <span className="absolute right-full border w-[80px] top-1/2 -translate-x-1/2 h-[1px] border-primary"></span>
            Contact Us{" "}
            <span className="absolute left-full border w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
          </h5>
          <h1 className="mb-12 text-4xl font-bold">Contact For Any Query</h1>
        </div>
        <div className="page-content">
          <div className="grid w-full grid-cols-3">
            <div className="">
              <h5 className="relative inline-block pr-8 mb-2 text-3xl font-extrabold text-primary font-dancing">
                Booking
                <span className="absolute left-full border w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
              </h5>

              <p className="mb-4 text-base">book@example.com</p>
            </div>
            <div className="">
              <h5 className="relative inline-block pr-8 mb-2 text-3xl font-extrabold text-primary font-dancing">
                General
                <span className="absolute left-full border w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
              </h5>

              <p className="mb-4 text-base">book@example.com</p>
            </div>
            <div className="">
              <h5 className="relative inline-block pr-8 mb-2 text-3xl font-extrabold text-primary font-dancing">
                Technical
                <span className="absolute left-full border w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
              </h5>

              <p className="mb-4 text-base">book@example.com</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 mx-5 mt-10 md:grid-cols-2">
            <div className="w-full">
              <img
                src="../src/assets/image/pixzolo-photography-Qtd5z7g4thc-unsplash.jpg"
                alt=""
                className="object-cover w-full h-full rounded-lg "
              />
            </div>
            <div className="w-full">
              <form action="" className="flex flex-col">
                <div className="flex">
                  <div className="w-2/4 px-4 py-3">
                    <div className="relative">
                      <input
                        type="text"
                        id="floating_outlined"
                        className="block h-[calc(3.5rem+2px)] py-4 px-3 w-full text-base text-gray-900 bg-[#fff] rounded-sm border border-[#ced4da] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="floating_outlined"
                        className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Your name
                      </label>
                    </div>
                  </div>
                  <div className="w-2/4 px-4 py-3">
                    <div className="relative">
                      <input
                        type="text"
                        id="floating_outlined"
                        className="block h-[calc(3.5rem+2px)] py-4 px-3 w-full text-base text-gray-900 bg-[#fff] rounded-sm border border-[#ced4da] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="floating_outlined"
                        className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Your email
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 py-3">
                  <div className="relative">
                    <input
                      type="text"
                      id="floating_outlined"
                      className="block h-[calc(3.5rem+2px)] py-4 px-3 w-full text-base text-gray-900 bg-[#fff] rounded-sm border border-[#ced4da] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_outlined"
                      className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Your name
                    </label>
                  </div>
                </div>
                <div className="w-full px-4 py-3">
                  <div className="relative">
                    <textarea
                      type="text"
                      id="floating_outlined"
                      className="block h-[150px] py-4 px-3 w-full text-base text-gray-900 bg-[#fff] rounded-sm border border-[#ced4da] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_outlined"
                      className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Your name
                    </label>
                  </div>
                </div>
                <div className="w-full px-4 py-3">
                  <button className="w-full py-4 text-lg font-semibold text-white rounded-sm bg-primary">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
