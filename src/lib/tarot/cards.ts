// 78 Tarot Cards - Major Arcana (22) + Minor Arcana (56)

export interface TarotCard {
  id: string;
  number: number;
  nameEn: string;
  nameMn: string;
  arcana: "major" | "minor";
  suit?: "wands" | "cups" | "swords" | "pentacles";
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  loveMeaning: string;
  careerMeaning: string;
  financeMeaning: string;
  challengeMeaning: string;
  advice: string[];
}

// Major Arcana (0-21)
const majorArcana: TarotCard[] = [
  {
    id: "major-0",
    number: 0,
    nameEn: "The Fool",
    nameMn: "Тэнэг хүн",
    arcana: "major",
    keywords: ["шинэ эхлэл", "эрх чөлөө", "адил явдал"],
    uprightMeaning: "Шинэ эхлэл, эрх чөлөө, итгэл үнэмшил. Адал явдалд бэлэн.",
    reversedMeaning: "Түргэн шуурхай, болгоомжгүй, эрсдэлтэй шийдвэр.",
    loveMeaning: "Шинэ хайр, гэнэтийн романтик учрал.",
    careerMeaning: "Шинэ карьер, бизнесийн эхлэл.",
    financeMeaning: "Санхүүгийн эрсдэл, шинэ хөрөнгө оруулалт.",
    challengeMeaning: "Хэт их эрсдэл, төлөвлөгөөгүй алхам.",
    advice: ["Итгэлтэй алхам хий", "Гэхдээ болгоомжтой бай"]
  },
  {
    id: "major-1",
    number: 1,
    nameEn: "The Magician",
    nameMn: "Ид шидтэн",
    arcana: "major",
    keywords: ["бүтээлч хүч", "авьяас", "ур чадвар"],
    uprightMeaning: "Бүтээлч хүч, авьяас чадвар, ур чадвар. Боломжоо ашигла.",
    reversedMeaning: "Хуурамч, залилан, авьяасаа үр ашиггүй ашиглах.",
    loveMeaning: "Хайрын ид шид, хүчтэй таталцал.",
    careerMeaning: "Мэргэжлийн ур чадвар, амжилт.",
    financeMeaning: "Санхүүгийн ур чадвар, мөнгө олох арга.",
    challengeMeaning: "Хэт их өөртөө итгэх, бардамнал.",
    advice: ["Боломжоо ашигла", "Ур чадвараа хөгжүүл"]
  },
  {
    id: "major-2",
    number: 2,
    nameEn: "The High Priestess",
    nameMn: "Лам хатан",
    arcana: "major",
    keywords: ["зөн совин", "нууц мэдлэг", "мэдрэмж"],
    uprightMeaning: "Зөн совин, нууц мэдлэг, дотоод мэдрэмж. Өөрийн直觉-д итгэ.",
    reversedMeaning: "Нууц мэдээлэл, худал хуурмаг, мэдрэмжгүй байдал.",
    loveMeaning: "Гүнзгий хайр, сүнсний холбоо.",
    careerMeaning: "Зөвлөгч, багш, эмч.",
    financeMeaning: "Санхүүгийн зөн совин.",
    challengeMeaning: "Хэт их нууцлах, бусдад итгэхгүй байх.",
    advice: ["Дотоод дуу хоолойгоо сонс", "Тэвчээртэй бай"]
  },
  {
    id: "major-3",
    number: 3,
    nameEn: "The Empress",
    nameMn: "Эзэгтэй",
    arcana: "major",
    keywords: ["элбэг дэлбэг", "бүтээлч", "эх хүн"],
    uprightMeaning: "Элбэг дэлбэг, бүтээлч байдал, эх хүний энерги. Өсөлт, хөгжил.",
    reversedMeaning: "Бүтээлч бус, хамааралтай, хэт халамжлах.",
    loveMeaning: "Хайр халамж, гэр бүлийн аз жаргал.",
    careerMeaning: "Бүтээлч мэргэжил, урлаг.",
    financeMeaning: "Элбэг дэлбэг, санхүүгийн өсөлт.",
    challengeMeaning: "Хэт их халамжлах, бие даах чадваргүй.",
    advice: ["Бүтээлч байдлаа илэрхийл", "Хайраа хуваалц"]
  },
  {
    id: "major-4",
    number: 4,
    nameEn: "The Emperor",
    nameMn: "Эзэн хаан",
    arcana: "major",
    keywords: ["зохион байгуулалт", "манлайлал", "тогтвортой байдал"],
    uprightMeaning: "Зохион байгуулалт, манлайлал, тогтвортой байдал. Хүчирхэг удирдагч.",
    reversedMeaning: "Хэт хатуу чанд, дарангуйлал, уян хатан бус.",
    loveMeaning: "Тогтвортой харилцаа, хамгаалалт.",
    careerMeaning: "Манлайлал, удирдах албан тушаал.",
    financeMeaning: "Санхүүгийн тогтвортой байдал.",
    challengeMeaning: "Хэт их хяналт, бусдыг дарамтлах.",
    advice: ["Зохион байгуулалттай бай", "Хариуцлагатай бай"]
  },
  {
    id: "major-5",
    number: 5,
    nameEn: "The Hierophant",
    nameMn: "Лам багш",
    arcana: "major",
    keywords: ["уламжлал", "итгэл үнэмшил", "сурган хүмүүжүүлэх"],
    uprightMeaning: "Уламжлал, итгэл үнэмшил, сурган хүмүүжүүлэх. Мэдлэг, туршлага.",
    reversedMeaning: "Хэт консерватив, шинэчлэлээс зайлсхийх.",
    loveMeaning: "Уламжлалт хайр, гэрлэлт.",
    careerMeaning: "Багш, зөвлөх, лам.",
    financeMeaning: "Уламжлалт хөрөнгө оруулалт.",
    challengeMeaning: "Хэт их хатуу бодлого, шинэчлэлээс айх.",
    advice: ["Уламжлалыг хүндэл", "Мэдлэгээ хуваалц"]
  },
  {
    id: "major-6",
    number: 6,
    nameEn: "The Lovers",
    nameMn: "Хосууд",
    arcana: "major",
    keywords: ["хайр", "сонголт", "хамтын ажиллагаа"],
    uprightMeaning: "Хайр дурлал, сонголт, хамтын ажиллагаа. Зөв шийдвэр.",
    reversedMeaning: "Зөрчил, буруу сонголт, харилцааны асуудал.",
    loveMeaning: "Хайр дурлал, сүнсний хань.",
    careerMeaning: "Хамтын ажиллагаа, түншлэл.",
    financeMeaning: "Хамтын санхүү, хуваалцах.",
    challengeMeaning: "Сонголтын зөрчил, хоёр замын хооронд.",
    advice: ["Зүрх сэтгэлээ сонс", "Зөв сонголт хий"]
  },
  {
    id: "major-7",
    number: 7,
    nameEn: "The Chariot",
    nameMn: "Тэрэг",
    arcana: "major",
    keywords: ["ялалт", "зориг", "хүч чадал"],
    uprightMeaning: "Ялалт, зориг, хүч чадал. Зорилгодоо хүрэх.",
    reversedMeaning: "Ялагдах, хяналт алдах, чиглэлгүй.",
    loveMeaning: "Хайрын төлөө тэмцэл, ялалт.",
    careerMeaning: "Карьерийн өсөлт, амжилт.",
    financeMeaning: "Санхүүгийн ялалт.",
    challengeMeaning: "Хэт их түргэн, болгоомжгүй.",
    advice: ["Зоригтой бай", "Зорилгодоо хүр"]
  },
  {
    id: "major-8",
    number: 8,
    nameEn: "Strength",
    nameMn: "Хүч чадал",
    arcana: "major",
    keywords: ["дотоод хүч", "тэвчээр", "зориг"],
    uprightMeaning: "Дотоод хүч, тэвчээр, зориг. Зөөлөн хүч.",
    reversedMeaning: "Сул дорой, итгэлгүй, тэвчээргүй.",
    loveMeaning: "Хүчтэй хайр, тэвчээртэй харилцаа.",
    careerMeaning: "Мэргэжлийн тэвчээр.",
    financeMeaning: "Санхүүгийн тэвчээр.",
    challengeMeaning: "Дотоод сул тал, итгэлгүй байдал.",
    advice: ["Тэвчээртэй бай", "Дотоод хүчээ мэдр"]
  },
  {
    id: "major-9",
    number: 9,
    nameEn: "The Hermit",
    nameMn: "Ганцаардсан хүн",
    arcana: "major",
    keywords: ["дотоод хайгуул", "бясалгал", "мэдлэг"],
    uprightMeaning: "Дотоод хайгуул, бясалгал, мэдлэг. Ганцаардлын хүч.",
    reversedMeaning: "Хэт тусгаарлалт, бусдаас холдох.",
    loveMeaning: "Ганцаардлын хайр, дотоод хайгуул.",
    careerMeaning: "Мэргэжилтэн, судлаач.",
    financeMeaning: "Санхүүгийн бясалгал.",
    challengeMeaning: "Хэт их ганцаардал, бусдаас тусгаарлах.",
    advice: ["Дотогшоо хар", "Бясалгал хий"]
  },
  {
    id: "major-10",
    number: 10,
    nameEn: "Wheel of Fortune",
    nameMn: "Хүрд",
    arcana: "major",
    keywords: ["хувь заяа", "эргэлт", "аз жаргал"],
    uprightMeaning: "Хувь заяа, эргэлт, аз жаргал. Амьдралын эргэлт.",
    reversedMeaning: "Муу аз, саад, хувь заяаны эсрэг.",
    loveMeaning: "Хайрын эргэлт, аз жаргал.",
    careerMeaning: "Карьерийн эргэлт.",
    financeMeaning: "Санхүүгийн эргэлт.",
    challengeMeaning: "Хувь заяаны эсрэг тэмцэл.",
    advice: ["Хувь заяаг хүлээн зөвшөөр", "Эргэлтийг мэдр"]
  },
  {
    id: "major-11",
    number: 11,
    nameEn: "Justice",
    nameMn: "Шударга ёс",
    arcana: "major",
    keywords: ["тэнцвэр", "шударга байдал", "хариуцлага"],
    uprightMeaning: "Тэнцвэр, шударга байдал, хариуцлага. Үнэн зөв.",
    reversedMeaning: "Шударга бус, зөрчил, хариуцлагагүй.",
    loveMeaning: "Шударга хайр, тэнцвэртэй харилцаа.",
    careerMeaning: "Хууль, шударга ёс.",
    financeMeaning: "Санхүүгийн шударга байдал.",
    challengeMeaning: "Шударга бус байдал, зөрчил.",
    advice: ["Шударга бай", "Хариуцлагатай бай"]
  },
  {
    id: "major-12",
    number: 12,
    nameEn: "The Hanged Man",
    nameMn: "Өлгөөтэй хүн",
    arcana: "major",
    keywords: ["шинэ өнцөг", "тэвчээр", "унамсар"],
    uprightMeaning: "Шинэ өнцөг, тэвчээр, унамсар. Зогсож, бодох.",
    reversedMeaning: "Тэвчээргүй, түргэн шийдвэр, ухамсаргүй.",
    loveMeaning: "Хайрын тэвчээр, шинэ өнцөг.",
    careerMeaning: "Карьерийн зогсолт, бясалгал.",
    financeMeaning: "Санхүүгийн тэвчээр.",
    challengeMeaning: "Хэт их зогсолт, урагшлахгүй байх.",
    advice: ["Зогсож бод", "Шинэ өнцгөөс хар"]
  },
  {
    id: "major-13",
    number: 13,
    nameEn: "Death",
    nameMn: "Өөрчлөлт",
    arcana: "major",
    keywords: ["өөрчлөлт", "шинэчлэл", "дуусгавар"],
    uprightMeaning: "Өөрчлөлт, шинэчлэл, дуусгавар. Хуучнаасаа салах.",
    reversedMeaning: "Өөрчлөлтөөс айх, хуучиндаа гацах.",
    loveMeaning: "Хайрын өөрчлөлт, шинэ эхлэл.",
    careerMeaning: "Карьерийн өөрчлөлт.",
    financeMeaning: "Санхүүгийн өөрчлөлт.",
    challengeMeaning: "Өөрчлөлтөөс айх, хуучиндаа гацах.",
    advice: ["Өөрчлөлтийг хүлээн зөвшөөр", "Шинэ эхлэлд бэлд"]
  },
  {
    id: "major-14",
    number: 14,
    nameEn: "Temperance",
    nameMn: "Тэсвэр тэвчээр",
    arcana: "major",
    keywords: ["тэнцвэр", "дунд зэрэг", "нэгдэл"],
    uprightMeaning: "Тэнцвэр, дунд зэрэг, нэгдэл. Зөөлөн хүч.",
    reversedMeaning: "Тэнцвэргүй, хэт их, хэт бага.",
    loveMeaning: "Тэнцвэртэй хайр, дунд зэрэг.",
    careerMeaning: "Тэнцвэртэй карьер.",
    financeMeaning: "Санхүүгийн тэнцвэр.",
    challengeMeaning: "Тэнцвэргүй байдал, хэт их.",
    advice: ["Тэнцвэртэй бай", "Дунд зэргийг ол"]
  },
  {
    id: "major-15",
    number: 15,
    nameEn: "The Devil",
    nameMn: "Сорилт",
    arcana: "major",
    keywords: ["сорилт", "эрх чөлөө", "материаллаг"],
    uprightMeaning: "Сорилт, эрх чөлөө, материаллаг зүйл. Хүчинд автахгүй байх.",
    reversedMeaning: "Эрх чөлөө, хүчинд автах, шунал.",
    loveMeaning: "Хүчтэй таталцал, сорилт.",
    careerMeaning: "Материаллаг амжилт.",
    financeMeaning: "Мөнгөний сорилт.",
    challengeMeaning: "Хүчинд автах, шунал.",
    advice: ["Эрх чөлөөтэй бай", "Шуналд автахгүй бай"]
  },
  {
    id: "major-16",
    number: 16,
    nameEn: "The Tower",
    nameMn: "Цамхаг",
    arcana: "major",
    keywords: ["гэнэтийн өөрчлөлт", "сэрэл", "шинэчлэл"],
    uprightMeaning: "Гэнэтийн өөрчлөлт, сэрэл, шинэчлэл. Хуучин нурах.",
    reversedMeaning: "Өөрчлөлтөөс зайлсхийх, хуучиндаа гацах.",
    loveMeaning: "Гэнэтийн хайрын өөрчлөлт.",
    careerMeaning: "Карьерийн гэнэтийн өөрчлөлт.",
    financeMeaning: "Санхүүгийн гэнэтийн өөрчлөлт.",
    challengeMeaning: "Гэнэтийн асуудал, сэрэл.",
    advice: ["Өөрчлөлтийг хүлээн зөвшөөр", "Шинэчлэлд бэлд"]
  },
  {
    id: "major-17",
    number: 17,
    nameEn: "The Star",
    nameMn: "Од",
    arcana: "major",
    keywords: ["итгэл найдвар", "сүнсний удирдамж", "тайван байдал"],
    uprightMeaning: "Итгэл найдвар, сүнсний удирдамж, тайван байдал. Од гэрэлтэй.",
    reversedMeaning: "Итгэл найдваргүй, сүнсний холбоогүй.",
    loveMeaning: "Итгэл найдвартай хайр.",
    careerMeaning: "Итгэл найдвартай карьер.",
    financeMeaning: "Итгэл найдвартай санхүү.",
    challengeMeaning: "Итгэл найдвараа алдах.",
    advice: ["Итгэл найдвараа хадгал", "Одоо гэрэлтэй"]
  },
  {
    id: "major-18",
    number: 18,
    nameEn: "The Moon",
    nameMn: "Сар",
    arcana: "major",
    keywords: ["зөн совин", "төөрөгдөл", "дотоод аялал"],
    uprightMeaning: "Зөн совин, төөрөгдөл, дотоод аялал. Сарны гэрэл.",
    reversedMeaning: "Төөрөгдөл, худал хуурмаг, зөн совингүй.",
    loveMeaning: "Зөн совинтой хайр, төөрөгдөл.",
    careerMeaning: "Зөн совинтой карьер.",
    financeMeaning: "Зөн совинтой санхүү.",
    challengeMeaning: "Төөрөгдөл, тодорхой бус.",
    advice: ["Зөн совиндоо итгэ", "Төөрөгдлийг даван туул"]
  },
  {
    id: "major-19",
    number: 19,
    nameEn: "The Sun",
    nameMn: "Нар",
    arcana: "major",
    keywords: ["амжилт", "баяр баясгалан", "эрч хүч"],
    uprightMeaning: "Амжилт, баяр баясгалан, эрч хүч. Нар мандлаа.",
    reversedMeaning: "Амжилтгүй, уйтгартай, эрч хүчгүй.",
    loveMeaning: "Аз жаргалтай хайр.",
    careerMeaning: "Амжилттай карьер.",
    financeMeaning: "Амжилттай санхүү.",
    challengeMeaning: "Амжилтгүй байдал.",
    advice: ["Нар мандлаа", "Амжилтыг мэдр"]
  },
  {
    id: "major-20",
    number: 20,
    nameEn: "Judgement",
    nameMn: "Шүүлт",
    arcana: "major",
    keywords: ["сэргэлт", "ухамсар", "шинэ эхлэл"],
    uprightMeaning: "Сэргэлт, ухамсар, шинэ эхлэл. Шинэ амьдрал.",
    reversedMeaning: "Сэргэлтгүй, ухамсаргүй, хуучиндаа гацах.",
    loveMeaning: "Хайрын сэргэлт.",
    careerMeaning: "Карьерийн сэргэлт.",
    financeMeaning: "Санхүүгийн сэргэлт.",
    challengeMeaning: "Сэргэлтгүй байдал.",
    advice: ["Сэргэ", "Шинэ эхлэл хий"]
  },
  {
    id: "major-21",
    number: 21,
    nameEn: "The World",
    nameMn: "Дэлхий",
    arcana: "major",
    keywords: ["гүйцэтгэл", "бүрэн бүтэн байдал", "амжилт"],
    uprightMeaning: "Гүйцэтгэл, бүрэн бүтэн байдал, амжилт. Мөчлөг дууслаа.",
    reversedMeaning: "Гүйцэтгэлгүй, дутуу, амжилтгүй.",
    loveMeaning: "Бүрэн хайр, амжилт.",
    careerMeaning: "Бүрэн амжилт.",
    financeMeaning: "Бүрэн санхүү.",
    challengeMeaning: "Дутуу байдал, гүйцэтгэлгүй.",
    advice: ["Мөчлөг дууслаа", "Амжилтыг тэмдэглэ"]
  }
];

// Minor Arcana - Wands (14 cards)
const wandsCards: TarotCard[] = Array.from({ length: 14 }, (_, i) => ({
  id: `wands-${i + 1}`,
  number: i + 1,
  nameEn: `${i + 1} of Wands`,
  nameMn: `Лууйн ${i + 1}`,
  arcana: "minor" as const,
  suit: "wands" as const,
  keywords: ["бүтээлч", "эрч хүч", "ур чадвар"],
  uprightMeaning: `Бүтээлч эрч хүч, ур чадвар. Лууйн ${i + 1}-ийн хүч.`,
  reversedMeaning: `Бүтээлч бус, эрч хүчгүй.`,
  loveMeaning: "Бүтээлч хайр.",
  careerMeaning: "Бүтээлч карьер.",
  financeMeaning: "Бүтээлч санхүү.",
  challengeMeaning: "Бүтээлч бус байдал.",
  advice: ["Бүтээлч бай", "Эрч хүчтэй бай"]
}));

// Minor Arcana - Cups (14 cards)
const cupsCards: TarotCard[] = Array.from({ length: 14 }, (_, i) => ({
  id: `cups-${i + 1}`,
  number: i + 1,
  nameEn: `${i + 1} of Cups`,
  nameMn: "Аяганы " + (i + 1),
  arcana: "minor" as const,
  suit: "cups" as const,
  keywords: ["хайр", "мэдрэмж", "харилцаа"],
  uprightMeaning: `Хайр, мэдрэмж, харилцаа. Аяганы ${i + 1}-ийн хүч.`,
  reversedMeaning: `Хайргүй, мэдрэмжгүй.`,
  loveMeaning: "Хүчтэй хайр.",
  careerMeaning: "Хайртай карьер.",
  financeMeaning: "Хайртай санхүү.",
  challengeMeaning: "Хайргүй байдал.",
  advice: ["Хайрла", "Мэдрэмжтэй бай"]
}));

// Minor Arcana - Swords (14 cards)
const swordsCards: TarotCard[] = Array.from({ length: 14 }, (_, i) => ({
  id: `swords-${i + 1}`,
  number: i + 1,
  nameEn: `${i + 1} of Swords`,
  nameMn: "Илдний " + (i + 1),
  arcana: "minor" as const,
  suit: "swords" as const,
  keywords: ["сэтгэлгээ", "шинжилгээ", "шийдвэр"],
  uprightMeaning: `Сэтгэлгээ, шинжилгээ, шийдвэр. Илдний ${i + 1}-ийн хүч.`,
  reversedMeaning: `Сэтгэлгээгүй, шийдвэргүй.`,
  loveMeaning: "Сэтгэлгээтэй хайр.",
  careerMeaning: "Сэтгэлгээтэй карьер.",
  financeMeaning: "Сэтгэлгээтэй санхүү.",
  challengeMeaning: "Сэтгэлгээгүй байдал.",
  advice: ["Бод", "Шинжл"]
}));

// Minor Arcana - Pentacles (14 cards)
const pentaclesCards: TarotCard[] = Array.from({ length: 14 }, (_, i) => ({
  id: `pentacles-${i + 1}`,
  number: i + 1,
  nameEn: `${i + 1} of Pentacles`,
  nameMn: "Мөнгөний " + (i + 1),
  arcana: "minor" as const,
  suit: "pentacles" as const,
  keywords: ["материаллаг", "санхүү", "амжилт"],
  uprightMeaning: `Материаллаг, санхүү, амжилт. Мөнгөний ${i + 1}-ийн хүч.`,
  reversedMeaning: `Материаллаг бус, санхүүгүй.`,
  loveMeaning: "Материаллаг хайр.",
  careerMeaning: "Материаллаг карьер.",
  financeMeaning: "Материаллаг санхүү.",
  challengeMeaning: "Материаллаг бус байдал.",
  advice: ["Материаллаг бай", "Амжилтыг эрмэлз"]
}));

// Combine all cards
export const TAROT_CARDS: TarotCard[] = [
  ...majorArcana,
  ...wandsCards,
  ...cupsCards,
  ...swordsCards,
  ...pentaclesCards
];

export function getCardById(id: string): TarotCard | undefined {
  return TAROT_CARDS.find(card => card.id === id);
}

export function getMajorArcana(): TarotCard[] {
  return TAROT_CARDS.filter(card => card.arcana === "major");
}

export function getMinorArcana(): TarotCard[] {
  return TAROT_CARDS.filter(card => card.arcana === "minor");
}

export function getCardsBySuit(suit: "wands" | "cups" | "swords" | "pentacles"): TarotCard[] {
  return TAROT_CARDS.filter(card => card.suit === suit);
}
