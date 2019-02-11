const INSTRUCTIONS = {
  mov1: 'mov1', // RF[rn] <= mem[direct]
  mov2: 'mov2', // mem[direct] <= RF[rn]
  mov3: 'mov3', // mem[RF[rn]] <= RF[rm]
  mov4: 'mov4', // RF[rn] <= imm
  add: 'add', // RF[rn] <= RF[rn] + RF[rm]
  sub: 'subt', // RF[rn] <= RF[rn] - RF[rm]
  jz: 'jz', // jz if R[rn] = 0
  halt: 'halt',
  // readm: 'readm', // read memory
  mul: 'mul', // RF[rn] <= RF[rn] * RF[rm]
  load: 'load',
  // addi: 'addi',
};

type ParseReturn = Array<[string, number]>;
type PatternType<T> = { [key in keyof T]: [RegExp, (match: RegExpMatchArray) => Array<[string, number]>] };

const RG = 'R([0-9])+';
const SP = ' +';
const NM = '([0-9]+)';
const THREE = new RegExp(`^${RG}${SP}${RG}${SP}${RG}$`);
const TWO = new RegExp(`^${RG}${SP}${RG}$`);
const ONE_NUMBER = new RegExp(`^${RG}${SP}${NM}$`);
const COMMAND = /^([0-9a-zA-Z]+)(.*?)$/;
const EMPTY_STRING = /^$/;

const ONE_NUM = (match: RegExpMatchArray): ParseReturn => {
  return [[match[1], 1], [match[2], 2]];
};

const TW = (match: RegExpMatchArray): ParseReturn => {
  return [[match[1], 1], [match[2], 1]];
};

const THR = (match: RegExpMatchArray): ParseReturn => {
  return [[match[1], 1], [match[2], 1], [match[3], 1]];
};

const PATTERNS: PatternType<typeof INSTRUCTIONS> = {
  mov1: [ONE_NUMBER, ONE_NUM],
  mov2: [ONE_NUMBER, ONE_NUM],
  mov3: [TWO, TW],
  mov4: [ONE_NUMBER, ONE_NUM],
  add: [THREE, THR],
  sub: [THREE, THR],
  jz: [ONE_NUMBER, ONE_NUM],
  halt: [EMPTY_STRING, () => []],
  mul: [THREE, THR],
  load: [TWO, TW],
};

const INSTRUCTION_NUMBERS: { [key in keyof typeof INSTRUCTIONS]: number } = {
  mov1: 0,
  mov2: 1,
  mov3: 2,
  mov4: 3,
  add: 4,
  sub: 5,
  jz: 6,
  halt: 15,
  mul: 8,
  load: 10,
};

export const parseLine = (line: string) => {
  line = line.trim();
  if (!line) {
    return '';
  }

  let match = line.match(COMMAND);

  if (!match) {
    throw Error('Unable to parse line');
  }

  const instruction = match[1];
  line = match[2].trim();

  if (!(instruction in PATTERNS)) {
    throw Error(`Unknown instruction: ${instruction}`);
  }

  // Grab the key and cast
  const key = instruction as keyof typeof PATTERNS;
  let hex = INSTRUCTION_NUMBERS[key].toString(16);

  const patterns = PATTERNS[key];
  if (patterns !== null) {
    const [reg, handler] = patterns;
    match = line.match(reg);

    if (match === null) {
      throw Error(`Unable to parse arguments for "${instruction}": "${line}"`);
    }

    handler(match).forEach(([value, length]) => {
      let num = parseInt(value, 10).toString(16);
      while (num.length !== length) {
        num = '0' + num;
      }

      hex += num;
    });
  }

  while (hex.length < 4) {
    hex += '0';
  }

  if (hex.length > 4) {
    throw Error('Bad parser');
  }

  return hex.toUpperCase();
};

export const parse = (text: string) => {
  return text.split('\n').map(parseLine).join('\n');
};
