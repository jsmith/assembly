export const REG: number[] = Array(2 ** 4).fill(0);
export const MEM: number[] = Array(2 ** 8).fill(0);
export const OUT: number[] = [];
export const TIME = 0;
let COUNTER = 0;

const INSTRUCTIONS = {
  mov1: 'mov1', // RF[rn] <= mem[direct]
  mov2: 'mov2', // mem[direct] <= RF[rn]
  mov3: 'mov3', // mem[RF[rn]] <= RF[rm]
  mov4: 'mov4', // RF[rn] <= imm
  add: 'add', // RF[rn] <= RF[rn] + RF[rm]
  sub: 'subt', // RF[rn] <= RF[rn] - RF[rm]
  jz: 'jz', // jz if R[rn] = 0
  halt: 'halt',
  readm: 'readm', // read memory
  mul: 'mul', // RF[rn] <= RF[rn] * RF[rm]
  load: 'load',
  // addi: 'addi',
};

type ParseReturn = Array<[string, number]>;
type InstructionArgs = number[];
type InstructionEval = (...args: InstructionArgs) => boolean | void;
interface Instruction {
  args: InstructionArgs;
  evaluate: InstructionEval;
}
type PatternType<T> = {
  [key in keyof T]: [RegExp, (match: RegExpMatchArray) => ParseReturn, InstructionEval]
};

const RG = 'R([0-9])+';
const SP = ' +';
const NM = '([0-9]+)';
const NUM = new RegExp(`^${NM}$`);
const THREE = new RegExp(`^${RG}${SP}${RG}${SP}${RG}$`);
const TWO = new RegExp(`^${RG}${SP}${RG}$`);
const ONE_NUMBER = new RegExp(`^${RG}${SP}${NM}$`);
const COMMAND = /^([0-9a-zA-Z]+)(.*?)$/;
const EMPTY_STRING = /^$/;

const NU = (match: RegExpMatchArray): ParseReturn => {
  return [[match[1], 3]];
};

const ONE_NUM = (match: RegExpMatchArray): ParseReturn => {
  return [[match[1], 1], [match[2], 2]];
};

const TW = (match: RegExpMatchArray): ParseReturn => {
  return [[match[1], 1], [match[2], 1]];
};

const THR = (match: RegExpMatchArray): ParseReturn => {
  return [[match[1], 1], [match[2], 1], [match[3], 1]];
};

const mov1 = (r1: number, direct: number) => {
  REG[r1] = MEM[direct];
};

const mov2 = (r1: number, direct: number) => {
  MEM[direct] = REG[r1];
};

const mov3 = (r1: number, r2: number) => {
  MEM[REG[r1]] = REG[r2];
};

const mov4 = (r1: number, imm: number) => {
  MEM[r1] = imm;
};

const add = (r1: number, r2: number, r3: number) => {
  REG[r1] = REG[r2] + REG[r3];
};

const sub = (r1: number, r2: number, r3: number) => {
  REG[r1] = REG[r2] - REG[r3];
};

const jz = (r1: number, imm: number) => {
  if (REG[r1] !== 0) {
    COUNTER = imm;
  }
};

const halt = () => {
  return true;
};

const mul = (r1: number, r2: number, r3: number) => {
  REG[r1] = REG[r2] * REG[r3];
};

const load = (r1: number, r2: number) => {
  REG[r1] = MEM[REG[r2]];
};

const readm = (imm: number) => {
  OUT[TIME] = imm;
};

const PATTERNS: PatternType<typeof INSTRUCTIONS> = {
  mov1: [ONE_NUMBER, ONE_NUM, mov1],
  mov2: [ONE_NUMBER, ONE_NUM, mov2],
  mov3: [TWO, TW, mov3],
  mov4: [ONE_NUMBER, ONE_NUM, mov4],
  add: [THREE, THR, add],
  sub: [THREE, THR, sub],
  jz: [ONE_NUMBER, ONE_NUM, jz],
  halt: [EMPTY_STRING, () => [], halt],
  mul: [THREE, THR, mul],
  load: [TWO, TW, load],
  readm: [NUM, NU, readm],
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
  readm: 7,
};

export const parseLine = (line: string) => {
  line = line.split('#')[0].trim();

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

  const [reg, convert, evaluate] = patterns;
  match = line.match(reg);

  if (match === null) {
    throw Error(`Unable to parse arguments for "${instruction}": "${line}"`);
  }

  const result = convert(match).map(([value, length]) => [parseInt(value, 10), length]) as Array<[number, number]>;
  const args = result.map(([value]) => value);

  if (args.length !== evaluate.arguments.length) {
    throw Error(`Error during evaluation. Invalid args length: ${args.length} vs ${evaluate.arguments.length}`);
  }

  result.forEach(([value, length]) => {
    let num = value.toString(16);
    while (num.length !== length) {
      num = '0' + num;
    }

    hex += num;
  });

  while (hex.length < 4) {
    hex += '0';
  }

  if (hex.length > 4) {
    throw Error('Bad parser');
  }

  return [hex.toUpperCase(), { evaluate, args }];
};

export const parse = (text: string) => {
  return text.split('\n').map(parseLine).filter((line) => line).join('\n');
};
