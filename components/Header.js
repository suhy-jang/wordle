export default function Header() {
  const repeat = () => {
    window.location.reload();
  };

  return (
    <header className="text-center relative h-[52px] py-2 text-3xl border-b border-b-slate-600 shadow font-bold">
      <h1>Wordle</h1>
      <i
        onClick={repeat}
        className="absolute top-3 right-5 fa fa-repeat text-sm"
      />
    </header>
  );
}
