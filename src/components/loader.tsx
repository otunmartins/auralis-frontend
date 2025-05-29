export default function Loader({ fixed }: { fixed: boolean }) {
  return (
    <div
      className={` top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white ${
        fixed ? "fixed" : "static"
      }`}
    >
      <div className="w-24 h-24 border-[6px] rounded-full border-t-transparent border-primary-950 animate-spin"></div>
    </div>
  );
}
