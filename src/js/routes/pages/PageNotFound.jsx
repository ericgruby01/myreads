import { Illustration404 } from "../../components/Illustrations/Illustration404";
export function PageNotFound() {
  return (
    <>
      <h1 className="text-center text-4xl mt-8 mb-4 font-bold text-slate-600 dark:text-slate-300">404 Page Not Found</h1>
      <h2 className="text-center text-2xl mb-8 text-slate-600 dark:text-slate-400">You tried to land on a page that does not exist and crashed. Try using the menu.</h2>
      <Illustration404 className="w-full max-w-md mx-auto" />
    </>
  );
}
