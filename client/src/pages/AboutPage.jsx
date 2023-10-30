import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-white ">
      <div
        className="w-full h-[400px] relative min-h-[100%] bg-cover mb-5"
        style={{ backgroundImage: "url('../src/assets/image/bg-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-3 font-bold text-white text-7xl">About Us</div>
            <div className="flex flex-wrap p-0 text-white list-none ">
              <div className="flex justify-center uppercase">
                <div className="pr-2 font-semibold text-orange-500 cursor-pointer hover:opacity-70">
                  Home
                </div>
                <div className="pr-2 font-semibold text-orange-500 cursor-pointer hover:opacity-70 before:content-['/'] before:pr-2 before:text-white before:opacity-70">
                  Pages
                </div>
                <div className="font-semibold before:content-['/'] before:pr-2 before:opacity-70">
                  About
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="grid h-full grid-cols-2 px-5">
          <div className="flex-1 col-span-2 lg:col-span-1">
            <div className="grid grid-cols-2 gap-2">
              <img
                src="../src/assets/image/banner8.jpg"
                alt=""
                className="w-full rounded-lg"
              />
              <img
                src="../src/assets/image/banner.jpg"
                alt=""
                className="w-4/5 mt-auto rounded-lg"
              />
              <img
                src="../src/assets/image/pixzolo-photography-Qtd5z7g4thc-unsplash.jpg"
                alt=""
                className="w-5/6 ml-auto rounded-lg "
              />
              <img
                src="../src/assets/image/banner2.jpg"
                alt=""
                className="w-full rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center flex-1 w-full h-full col-span-2 p-8 lg:col-span-1">
            <div>
              <h5 className="relative inline-block pr-4 text-3xl font-extrabold text-primary font-dancing">
                About Us{" "}
                <span className="absolute left-full border w-[100px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
              </h5>
              <h1 className="mb-5 text-4xl font-bold ">
                Welcome to <span>||</span> FoodvietBlog
              </h1>
              <p className="mb-4 text-base">
                In this space, I am always sharing fresh, flavorful, (mostly)
                healthy recipes that I love to make and eat in my real, actual,
                every day life. If I wouldn’t eat it in real life, I won’t put
                in on the blog. My goal is to inspire you with food that is both
                approachable AND exciting, whether you’re cooking for yourself,
                your family, your roommates, or your friends. I want you to be
                so excited about these recipes that you eagerly await 5pm when
                you can go home from work and start cooking.
              </p>
              <p className="mb-4 text-base">
                On a related note, I absolutely LOVE seeing the food that you’re
                making. It will make my day if you tag @pinchofyum in your
                Instagram photos and stories! We love to shout out our favorites
                on Fridays with our Reader Awards on Instagram Stories.
              </p>
              <div className="grid grid-cols-2 mb-4 ">
                <div className="pl-3 mt-6">
                  <div className="flex items-center px-3 border-l-4 border-primary ">
                    <h1 className="text-5xl font-bold text-primary ">15</h1>
                    <div className="flex flex-col pl-4">
                      <p className="text-gray-800">Years of</p>
                      <h6 className="font-bold uppercase">EXPERIENCE</h6>
                    </div>
                  </div>
                </div>
                <div className="pl-3 mt-6 ">
                  <div className="flex items-center px-3 border-l-4 border-primary ">
                    <h1 className="text-5xl font-bold text-primary ">50</h1>
                    <div className="flex flex-col pl-4">
                      <p className="text-gray-800">Popularf</p>
                      <h6 className="font-bold uppercase">MASTER CHEFS</h6>
                    </div>
                  </div>
                </div>
              </div>
              <button className="px-12 py-4 mt-2 text-lg font-medium text-white uppercase rounded bg-primary">
                Read more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-12 pb-4 mx-auto">
        <div className="text-center ">
          <h5 className="relative inline-block pr-8 mb-2 text-3xl font-extrabold text-primary font-dancing">
            <span className="absolute right-full border w-[80px] top-1/2 -translate-x-1/2 h-[1px] border-primary"></span>
            Team Members{" "}
            <span className="absolute left-full border w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
          </h5>
          <h1 className="mb-12 text-4xl font-bold">Our Master Chefs</h1>
        </div>
        <div className="grid grid-cols-1 mx-6 md:grid-cols-4 gap-x-5">
          <div className="hover:h-full h-[calc(100%-38px)] overflow-hidden bg-white rounded-lg shadow-sm transition-all duration-200 ease-in group">
            <div className="flex flex-col items-center ">
              <div className="w-64 h-64 m-6 overflow-hidden transition-all rounded-full">
                <img
                  src="../src/assets/image/team-1.jpg"
                  alt=""
                  className="object-cover w-full h-full transition-all rounded-full group-hover:scale-125 "
                />
              </div>
              <h5 className="text-lg font-bold">Full Name</h5>
              <small>Designation</small>
              <div className="flex justify-center mt-4">
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
              </div>
            </div>
          </div>
          <div className="hover:h-full h-[calc(100%-38px)] overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-200 ease-in group">
            <div className="flex flex-col items-center ">
              <div className="w-64 h-64 m-6 overflow-hidden transition-all rounded-full">
                <img
                  src="../src/assets/image/team-1.jpg"
                  alt=""
                  className="object-cover w-full h-full transition-all rounded-full group-hover:scale-125 "
                />
              </div>
              <h5 className="text-lg font-bold">Full Name</h5>
              <small>Designation</small>
              <div className="flex justify-center mt-4">
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
              </div>
            </div>
          </div>
          <div className="hover:h-full h-[calc(100%-38px)] overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-200 ease-in group">
            <div className="flex flex-col items-center ">
              <div className="w-64 h-64 m-6 overflow-hidden transition-all rounded-full">
                <img
                  src="../src/assets/image/team-1.jpg"
                  alt=""
                  className="object-cover w-full h-full transition-all rounded-full group-hover:scale-125 "
                />
              </div>
              <h5 className="text-lg font-bold">Full Name</h5>
              <small>Designation</small>
              <div className="flex justify-center mt-4">
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
              </div>
            </div>
          </div>
          <div className="hover:h-full h-[calc(100%-38px)] overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-200 ease-in group">
            <div className="flex flex-col items-center ">
              <div className="w-64 h-64 m-6 overflow-hidden transition-all rounded-full">
                <img
                  src="../src/assets/image/team-1.jpg"
                  alt=""
                  className="object-cover w-full h-full transition-all rounded-full group-hover:scale-125 "
                />
              </div>
              <h5 className="text-lg font-bold">Full Name</h5>
              <small>Designation</small>
              <div className="flex justify-center mt-4">
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
                <div className="flex items-center justify-center mx-1 text-lg font-bold text-white cursor-pointer bg-primary w-9 h-9 rounded-t-2xl">
                  x
                </div>
              </div>
            </div>
          </div>

          {/* <div className="h-auto bg-white">
            <div className="flex flex-col ">
              <div className="">
                <img src="../src/assets/image/testimonial-2.jpg" alt="" />
              </div>
              <h5>Full Name</h5>
              <small>Designation</small>
            </div>
          </div>
          <div className="h-auto bg-white">
            <div className="flex flex-col ">
              <div className="">
                <img src="../src/assets/image/testimonial-2.jpg" alt="" />
              </div>
              <h5>Full Name</h5>
              <small>Designation</small>
            </div>
          </div> */}
          {/* <div className="h-auto bg-white">
            <div className="flex flex-col ">
              <div className="">
                <img src="../src/assets/image/testimonial-2.jpg" alt="" />
              </div>
              <h5>Full Name</h5>
              <small>Designation</small>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
