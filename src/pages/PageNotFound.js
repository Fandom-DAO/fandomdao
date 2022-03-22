import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex justify-center m-10 text-white">
      <div>
        <div className="text-5xl mt-10 font-black ">Opps...!!</div>
        <div className="mt-5 text-4xl">We couldn't find your page.</div>
        <div className="mt-10 text-xl">
          May be try getting back to the home page
        </div>

        <div className="mt-5 mb-20">
          <Link
            to="/"
            className="rounded text-center max-w-10 p-2 shadow-md shadow-indigo-500/40 sm:w-1/2 text-white text-lg font-semibold bg-gradient-to-r from-bluecolor via-purple-500 to-pinktext"
          >
            Return to home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
