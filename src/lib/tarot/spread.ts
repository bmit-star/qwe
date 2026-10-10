// Tarot spread definitions - card layouts and position meanings

export type SpreadType = 'single' | 'three-card' | 'five-card' | 'seven-card';

export interface CardPosition {
  index: number;
  name: string;
  description: string;
}

export interface SpreadDefinition {
  type: SpreadType;
  name: string;
  description: string;
  positions: CardPosition[];
}

// Single card spread
const singleCardSpread: SpreadDefinition = {
  type: 'single',
  name: 'Нэг карт',
  description: 'Ерөнхий чиглэл, өдрийн зөвлөгөө',
  positions: [
    {
      index: 0,
      name: 'Ерөнхий чиглэл',
      description: 'Одоогийн нөхцөл байдлын ерөнхий утга'
    }
  ]
};

// Three card spread
const threeCardSpread: SpreadDefinition = {
  type: 'three-card',
  name: 'Гурван карт',
  description: 'Өнгөрсөн, одоо, ирээдүй',
  positions: [
    {
      index: 0,
      name: 'Өнгөрсөн',
      description: 'Нөлөөлсөн өнгөрсөн үйл явдал'
    },
    {
      index: 1,
      name: 'Одоо',
      description: 'Одоогийн нөхцөл байдал'
    },
    {
      index: 2,
      name: 'Ирээдүй',
      description: 'Боломжит ирээдүйн чиг хандлага'
    }
  ]
};

// Five card spread
const fiveCardSpread: SpreadDefinition = {
  type: 'five-card',
  name: 'Таван карт',
  description: 'Дэлгэрэнгүй шинжилгээ',
  positions: [
    {
      index: 0,
      name: 'Нөхцөл',
      description: 'Одоогийн үндсэн нөхцөл байдал'
    },
    {
      index: 1,
      name: 'Саад',
      description: 'Тулгарч буй саад бэрхшээл'
    },
    {
      index: 2,
      name: 'Боломж',
      description: 'Ашиглаж болох боломж'
    },
    {
      index: 3,
      name: 'Зөвлөмж',
      description: 'Хэрэгжүүлэх зөвлөмж'
    },
    {
      index: 4,
      name: 'Үр дүн',
      description: 'Боломжит үр дүн'
    }
  ]
};

// Seven card spread
const sevenCardSpread: SpreadDefinition = {
  type: 'seven-card',
  name: 'Долоон карт',
  description: 'Бүрэн дэлгэрэнгүй шинжилгээ',
  positions: [
    {
      index: 0,
      name: 'Нөхцөл',
      description: 'Одоогийн үндсэн нөхцөл байдал'
    },
    {
      index: 1,
      name: 'Нөлөөлөл',
      description: 'Гадаад нөлөөлөл'
    },
    {
      index: 2,
      name: 'Саад',
      description: 'Дотоод болон гадаад саад'
    },
    {
      index: 3,
      name: 'Нөөц боломж',
      description: 'Дотоод нөөц боломж'
    },
    {
      index: 4,
      name: 'Зөвлөмж',
      description: 'Хэрэгжүүлэх зөвлөмж'
    },
    {
      index: 5,
      name: 'Үйл ажиллагаа',
      description: 'Авах арга хэмжээ'
    },
    {
      index: 6,
      name: 'Үр дүн',
      description: 'Боломжит үр дүн'
    }
  ]
};

export const SPREADS: Record<SpreadType, SpreadDefinition> = {
  'single': singleCardSpread,
  'three-card': threeCardSpread,
  'five-card': fiveCardSpread,
  'seven-card': sevenCardSpread
};

export function getSpread(type: SpreadType): SpreadDefinition {
  return SPREADS[type];
}

export function getCardCount(type: SpreadType): number {
  return SPREADS[type].positions.length;
}
