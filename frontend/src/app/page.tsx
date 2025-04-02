import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center min-h-screen gap-6 sm:p-12 font-sans mx-4 sm:mx-8">
        <div className="flex flex-col items-center sm:items-start gap-4 text-center sm:text-left pl-12">
          <Image
            className="dark:invert"
            src="/spoonfitLogo.svg"
            alt="SpoonFit Logo"
            width={80}
            height={80}
          />
          <h1 className="text-7xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Plan, Track & <br /> Manage Your Energy
          </h1>
          <p className="text-xl text-gray-600">
            Your life shouldn’t be more complicated than it already is. Spoonie Day
            offers a simple and intuitive interface, with AI-driven insights to help
            you identify patterns in your activities, optimize your energy, and plan
            your days more effectively.
          </p>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-black text-white gap-2 hover:bg-blue-700 font-semibold text-base h-12 px-6 sm:w-auto"
              href="/auth/login"
            >
              Login
            </a>
            <a
              className="rounded-full border border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-transparent font-semibold text-base h-12 px-6 w-full sm:w-auto"
              href="#"
            >
              Explore More
            </a>
          </div>

          <div className="border border-black rounded-md p-6 mt-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-left">
                <Image
                  className="dark:invert"
                  src="/sun.svg"
                  alt="SpoonFit Logo"
                  width={28}
                  height={20}
                />
                <p className="text-sm text-gray-600">
                  Content for the first column goes here.
                </p>
              </div>
              <div className="flex flex-col items-left">
                <Image
                  className="dark:invert"
                  src="/eyes.svg"
                  alt="SpoonFit Logo"
                  width={28}
                  height={20}
                />
                <p className="text-sm text-gray-600">
                  Content for the second column goes here.
                </p>
              </div>
              <div className="flex flex-col items-left">
                <Image
                  className="dark:invert"
                  src="/star.svg"
                  alt="SpoonFit Logo"
                  width={28}
                  height={20}
                />
                <p className="text-sm text-gray-600">
                  Content for the third column goes here.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full max-w-lg mx-auto sm:w-3/4">
          <Image
            className="dark:invert"
            src="/spoonHome.svg"
            alt="Spoon Home"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-12 w-full sm:px-20">
        <div className="flex justify-center items-center">
          <Image
            src="/desktop.svg"
            alt="Example SVG"
            width={800}
            height={1000}
            className="object-contain"
          />
        </div>

        <div className="grid gap-8 text-center sm:text-left mx-12">
          <h2 className="text-sm font-semibold text-gray-600">FEATURES</h2>
          <h1 className="text-3xl font-bold text-[#5FD4B9]">App Features</h1>

          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <Image
              src="/star-05.svg"
              alt="Easy Planning Icon"
              width={28}
              height={40}
              className="object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Easy Planning
              </h3>
              <p className="text-base text-gray-600">
                Simplify your day with intuitive planning tools designed to reduce complexity and optimize your energy. Our app makes it easy to schedule tasks, avoid overload, and strike the perfect balance between work and rest.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <Image
              src="/cube-02.svg"
              alt="Simple Interface Icon"
              width={28}
              height={40}
              className="object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Simple Interface
              </h3>
              <p className="text-base text-gray-600">
                Enjoy a clean, user-friendly interface tailored for effortless navigation. No complex menus or clutter—just straightforward functionality to help you stay organized and productive every day.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <Image
              src="/cube-04.svg"
              alt="ML-Driven Insights Icon"
              width={28}
              height={40}
              className="object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                ML-Driven Insights
              </h3>
              <p className="text-base text-gray-600">
                Harness the power of machine learning to uncover patterns and trends in your daily activities. SpoonFul analyzes your behavior to provide actionable insights that guide you towards smarter decision-making and improved energy management.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-3">
              <Image
                src="/spoonfitLogo.svg"
                alt="SpoonFit Logo"
                width={40}
                height={40}
                className="dark:invert"
              />
              <span className="text-2xl font-bold">SpoonFul</span>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Your partner in planning, tracking, and managing your energy.
            </p>
          </div>

          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Subscribe to Our Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                Get the latest updates and tips directly in your inbox.
              </p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="text-gray-900"
                />
                <Button className="bg-[#5FD4B9] text-white hover:bg-[#4dbb9d]">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm text-gray-400 mt-2">
              Have questions? We’re here to help.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Email: <a href="mailto:contact@spoonful.com" className="text-[#5FD4B9]">contact@spoonful.com</a>
            </p>
            <p className="text-sm text-gray-400 mt-2">Phone: +1 234 567 890</p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
          © 2025 SpoonFul. All rights reserved.
        </div>
      </footer>
    </>
  );
}
