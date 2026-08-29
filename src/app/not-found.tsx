import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gauto-champagne px-4 text-center">
      <Image
        src="/brand/gauto-submark-gold.png"
        alt=""
        aria-hidden="true"
        width={232}
        height={116}
        className="h-10 w-auto"
      />
      <h1 className="type-display mt-6 text-3xl text-gauto-graphite">Página não encontrada</h1>
      <p className="mt-3 text-sm text-gauto-graphite/75">
        O endereço que você buscou não existe ou mudou de lugar.
      </p>
      <Link href="/" className="btn-gold mt-8 inline-flex min-h-11 items-center px-6 py-3 text-sm">
        Voltar ao início
      </Link>
    </main>
  );
}
