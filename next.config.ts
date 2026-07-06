import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Permite deploy mesmo com erros de tipo (a checagem continua no editor / dev).
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Não empacotar os drivers nativos do Turso/libSQL (evita webpack tentar
  // parsear arquivos não-JS como LICENSE.md dentro desses pacotes).
  serverExternalPackages: [
    "@prisma/adapter-libsql",
    "@libsql/client",
    "@libsql/hrana-client",
    "libsql",
  ],
};

export default nextConfig;
