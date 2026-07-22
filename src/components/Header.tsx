import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[#DDF4FF]">
      <div className="flex justify-center py-3">
        <Image
          src="/logo-header.png"
          alt="Chou Chéri"
          width={400}
          height={100}
          priority
          unoptimized
          className="h-20 w-auto"
        />
      </div>
    </header>
  );
}