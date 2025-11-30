// add-search-placeholder.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesPath = path.resolve(__dirname, "src", "locales");

if (!fs.existsSync(localesPath)) {
  console.error("پوشه src/locales پیدا نشد!");
  process.exit(1);
}

console.log("در حال اضافه کردن search.placeholder به ۴۵ زبان...\n");

const searchTranslations = {
  fa: { search: { placeholder: "جستجوی شهر…" } },
  en: { search: { placeholder: "Search city…" } },
  ar: { search: { placeholder: "ابحث عن مدينة…" } },
  de: { search: { placeholder: "Stadt suchen…" } },
  fr: { search: { placeholder: "Rechercher une ville…" } },
  es: { search: { placeholder: "Buscar ciudad…" } },
  it: { search: { placeholder: "Cerca città…" } },
  pt: { search: { placeholder: "Buscar cidade…" } },
  ru: { search: { placeholder: "Поиск города…" } },
  zh: { search: { placeholder: "搜索城市…" } },
  ja: { search: { placeholder: "都市を検索…" } },
  ko: { search: { placeholder: "도시 검색…" } },
  hi: { search: { placeholder: "शहर खोजें…" } },
  ur: { search: { placeholder: "شہر تلاش کریں…" } },
  id: { search: { placeholder: "Cari kota…" } },
  tr: { search: { placeholder: "Şehir ara…" } },
  nl: { search: { placeholder: "Zoek stad…" } },
  pl: { search: { placeholder: "Szukaj miasta…" } },
  sv: { search: { placeholder: "Sök stad…" } },
  th: { search: { placeholder: "ค้นหาเมือง…" } },
  vi: { search: { placeholder: "Tìm kiếm thành phố…" } },

  sq: { search: { placeholder: "Kërko qytet…" } },
  af: { search: { placeholder: "Soek stad…" } },
  az: { search: { placeholder: "Şəhər axtar…" } },
  be: { search: { placeholder: "Пошук горада…" } },
  bg: { search: { placeholder: "Търсене на град…" } },
  ca: { search: { placeholder: "Cerca ciutat…" } },
  hr: { search: { placeholder: "Pretraži grad…" } },
  da: { search: { placeholder: "Søg by…" } },
  et: { search: { placeholder: "Otsi linna…" } },
  fi: { search: { placeholder: "Hae kaupunki…" } },
  gl: { search: { placeholder: "Buscar cidade…" } },
  el: { search: { placeholder: "Αναζήτηση πόλης…" } },
  he: { search: { placeholder: "חפש עיר…" } },
  hu: { search: { placeholder: "Város keresése…" } },
  is: { search: { placeholder: "Leita að borg…" } },
  ku: { search: { placeholder: "Bajar bigere…" } },
  lv: { search: { placeholder: "Meklēt pilsētu…" } },
  lt: { search: { placeholder: "Ieškoti miesto…" } },
  mk: { search: { placeholder: "Пребарај град…" } },
  no: { search: { placeholder: "Søk by…" } },
  ro: { search: { placeholder: "Caută oraș…" } },
  sr: { search: { placeholder: "Претражи град…" } },
  sk: { search: { placeholder: "Hľadať mesto…" } },
  sl: { search: { placeholder: "Išči mesto…" } },
  uk: { search: { placeholder: "Пошук міста…" } },
};

let count = 0;

fs.readdirSync(localesPath)
  .filter((file) => file.endsWith(".json"))
  .forEach((file) => {
    const langCode = file.replace(".json", "");
    const filePath = path.join(localesPath, file);

    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (e) {
      console.log(`خطا در خواندن ${file}`);
      return;
    }

    // اضافه کردن search با placeholder
    const trans = searchTranslations[langCode] || searchTranslations.en;
    data.search = trans.search; // فقط search رو جایگزین یا اضافه می‌کنه

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
    console.log(`Updated → ${file}`);
    count++;
  });

console.log(`\nتمام شد! search.placeholder به ${count} زبان اضافه شد`);
console.log("حالا می‌تونی توی کامپوننت جستجو بنویسی:");
console.log(`placeholder={t("search.placeholder")}`);
console.log("و همه زبان‌ها کاملاً حرفه‌ای و یکدست نمایش داده میشن!");
