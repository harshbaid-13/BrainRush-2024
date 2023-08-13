import Heading from "@components/Heading/Heading";
import React from "react";
// import logo from ".@/publi";

function Schedule() {
  return (
    <>
      <Heading title="Our Schedule" />
      <section class=" dark:text-headerText">
        <div class="container max-w-5xl px-4 py-12 mx-auto">
          <div class="grid gap-4 mx-4 sm:grid-cols-12">
            <div class="col-span-12 sm:col-span-3">
              <div class="text-center sm:text-left mb-14 mr-3 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-violet-400">
                <h3 class="text-4xl font-semibold text-headerText">
                  Kodikas-2K23
                </h3>
                <span class="text-sm font-bold tracking-wider uppercase dark:text-gray-400">
                  Vestibulum diam nunc
                </span>
                {/* <Image src={logo} alt="logo" /> */}
                <img
                  src="/assets/images/logo.png"
                  className="mt-10 mr-8"
                  id="logoTag"
                  alt="Kodikas Logo"
                />
              </div>
            </div>
            <div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
              <div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-headerText">
                <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-subHeaderText">
                  <h3 class="text-3xl font-semibold tracking-wide text-subHeaderText">
                    Donec porta enim vel{" "}
                  </h3>
                  <time class="text-xs tracking-wide uppercase dark:text-gray-400">
                    Dec 2020
                  </time>
                  <p class="mt-3">
                    Pellentesque feugiat ante at nisl efficitur, in mollis orci
                    scelerisque. Interdum et malesuada fames ac ante ipsum
                    primis in faucibus. Pellentesque feugiat ante at nisl
                    efficitur, in mollis orci scelerisque. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus.Pellentesque feugiat
                    ante at nisl efficitur, in mollis orci scelerisque. Interdum
                    et malesuada fames ac ante ipsum primis in
                    faucibus.Pellentesque feugiat ante at nisl efficitur, in
                    mollis orci scelerisque. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus. Pellentesque feugiat ante at nisl
                    efficitur, in mollis orci scelerisque. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus.
                  </p>
                </div>
                <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-subHeaderText">
                  <h3 class="text-3xl font-semibold tracking-wide text-subHeaderText">
                    Aliquam sit amet nunc ut
                  </h3>
                  <time class="text-xs tracking-wide uppercase dark:text-gray-400">
                    Jul 2019
                  </time>
                  <p class="mt-3">
                    Pellentesque feugiat ante at nisl efficitur, in mollis orci
                    scelerisque. Interdum et malesuada fames ac ante ipsum
                    primis in faucibus. Pellentesque feugiat ante at nisl
                    efficitur, in mollis orci scelerisque. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus.Pellentesque feugiat
                    ante at nisl efficitur, in mollis orci scelerisque. Interdum
                    et malesuada fames ac ante ipsum primis in
                    faucibus.Pellentesque feugiat ante at nisl efficitur, in
                    mollis orci scelerisque. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus. Pellentesque feugiat ante at nisl
                    efficitur, in mollis orci scelerisque. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus.
                  </p>
                </div>
                <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-subHeaderText">
                  <h3 class="text-3xl font-semibold tracking-wide text-subHeaderText">
                    Pellentesque habitant morbi
                  </h3>
                  <time class="text-xs tracking-wide uppercase dark:text-gray-400">
                    Jan 2016
                  </time>
                  <p class="mt-3">
                    Pellentesque feugiat ante at nisl efficitur, in mollis orci
                    scelerisque. Interdum et malesuada fames ac ante ipsum
                    primis in faucibus. Pellentesque feugiat ante at nisl
                    efficitur, in mollis orci scelerisque. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus.Pellentesque feugiat
                    ante at nisl efficitur, in mollis orci scelerisque. Interdum
                    et malesuada fames ac ante ipsum primis in
                    faucibus.Pellentesque feugiat ante at nisl efficitur, in
                    mollis orci scelerisque. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus. Pellentesque feugiat ante at nisl
                    efficitur, in mollis orci scelerisque. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus.
                  </p>
                </div>
                <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-subHeaderText">
                  <h3 class="text-3xl font-semibold tracking-wide text-subHeaderText">
                    Pellentesque habitant morbi
                  </h3>
                  <time class="text-xs tracking-wide uppercase dark:text-gray-400">
                    Jan 2016
                  </time>
                  <p class="mt-3">
                    Pellentesque feugiat ante at nisl efficitur, in mollis orci
                    scelerisque. Interdum et malesuada fames ac ante ipsum
                    primis in faucibus. Pellentesque feugiat ante at nisl
                    efficitur, in mollis orci scelerisque. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus.Pellentesque feugiat
                    ante at nisl efficitur, in mollis orci scelerisque. Interdum
                    et malesuada fames ac ante ipsum primis in
                    faucibus.Pellentesque feugiat ante at nisl efficitur, in
                    mollis orci scelerisque. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus. Pellentesque feugiat ante at nisl
                    efficitur, in mollis orci scelerisque. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Schedule;
