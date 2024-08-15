
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Home</h1>
      <button className="w-80">
        <a href="/form" className="">Formulario</a>
      </button>
      <br />
      <button className="w-80">
        <a href="/table" className="no-underline text-white" >Tablas</a>
      </button>
    </div>
  );
}
