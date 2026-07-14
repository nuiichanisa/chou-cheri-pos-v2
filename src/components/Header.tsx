import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 p-4">
        <Image
          src="/logo.png"
          alt="Chou Chéri"
          width={64}
          height={64}
          priority
        />

        <div>
          <h1 className="text-2xl font-bold text-teal-600">
            Chou Chéri POS
          </h1>

          <p className="text-sm text-gray-500">
            Bakery Point of Sale
          </p>
        </div>
      </div>
    </header>
  );
}