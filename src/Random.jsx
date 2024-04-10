export default function Random(props) {
  const { text, number } = props.fact;
  return (
    <div className="border-8px; flex items-center gap-2 rounded-sm bg-sky-300 p-1">
      <div className="text-md border:450px  gap-2 p-1 italic text-slate-50">
        {text}
      </div>
      <div className=" text-1xl animate-spin rounded-sm bg-red-500 p-2  text-2xl shadow-red-100 ring-offset-green-600 drop-shadow-sm duration-1000">
        {number}
      </div>
    </div>
  );
}
