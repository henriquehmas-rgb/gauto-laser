#!/usr/bin/env node
/**
 * Verifica se o site está pronto para receber tráfego.
 *
 *   npm run check:launch
 *
 * Sai com 0 quando não há pendência (pode publicar e anunciar) e com 1 quando
 * ainda há dado de negócio faltando. Enquanto sair 1, o site se serve com
 * noindex/robots bloqueado automaticamente — ver src/config/readiness.ts.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const PLACEHOLDER = /\{\{[^}]{2,60}\}\}/g;

/** Varre .ts/.tsx em src/ procurando placeholders que chegariam à tela. */
function scanSource() {
  const hits = [];
  const skipDirs = new Set(["node_modules", ".next", ".git", "scripts"]);

  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (!skipDirs.has(entry)) walk(full);
        continue;
      }
      if (!/\.(ts|tsx)$/.test(entry)) continue;
      // readiness.ts contém a regex de detecção; não é conteúdo exibido
      if (entry === "readiness.ts") continue;

      const text = readFileSync(full, "utf-8");
      text.split("\n").forEach((line, i) => {
        const found = line.match(PLACEHOLDER);
        if (found) {
          hits.push({ file: relative(ROOT, full), line: i + 1, values: found });
        }
      });
    }
  }

  walk(join(ROOT, "src"));
  return hits;
}

const hits = scanSource();

if (hits.length === 0) {
  console.log("✓ Nenhum placeholder pendente. Site liberado para indexação e tráfego.");
  process.exit(0);
}

console.log("");
console.log("PENDÊNCIAS DE LANÇAMENTO — o site está servindo com noindex até serem resolvidas.");
console.log("");

for (const hit of hits) {
  console.log(`  ${hit.file}:${hit.line}`);
  for (const v of new Set(hit.values)) console.log(`      ${v}`);
}

console.log("");
console.log(`${hits.length} local(is) com dado de negócio pendente. Detalhes em docs/PENDENCIAS.md.`);
console.log("Não anuncie nem invista em tráfego enquanto isso não estiver zerado.");
console.log("");
process.exit(1);
