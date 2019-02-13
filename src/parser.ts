export const REG: number[] = Array(2 ** 4).fill(0);
export const MEM: number[] = Array(2 ** 8).fill(0);
export const OUT: number[] = [];
export let TIME = 0;
export let COUNTER = 0;

const INSTRUCTIONS = {
  mov1: 'mov1', // RF[rn] <= mem[direct]
  mov2: 'mov2', // mem[direct] <= RF[rn]
  mov3: 'mov3', // mem[RF[rn]] <= RF[rm]
  mov4: 'mov4', // RF[rn] <= imm
  add: 'add', // RF[rn] <= RF[rn] + RF[rm]
  subt: 'subt', // RF[rn] <= RF[rn] - RF[rm]
  jz: 'jz', // jz if R[rn] = 0
  halt: 'halt',
  readm: 'readm', // read memory
  mul: 'mul', // RF[rn] <= RF[rn] * RF[rm]
  load: 'load',
  // addi: 'addi',
};

type InstructionArgs = number[];
export interface SourceMap { [k: number]: number; }
type InstructionEval = (...args: InstructionArgs) => boolean | void;
export interface Instruction {
  args: InstructionArgs;
  evaluate: InstructionEval;
  hex: string;
}

interface ParsingData {
  registers?: number;
  immediate?: boolean;
}

const COMMAND = /^([0-9a-zA-Z]+)(.*?)$/;

const range = (n: number): number[] => {
  return [...Array(n).keys()];
};

const VAR = '([a-zA-Z0-9_]+)';
const DEFINE  = `^#define +${VAR} +${VAR}$`;

const makeRegex = (data: ParsingData) => {
  const regex: string[] = [];
  range(data.registers || 0).forEach(() => {
    regex.push('R([0-9]+)');
  });

  if (data.immediate) {
    regex.push('([0-9]+)');
  }

  return new RegExp(`^${regex.join(' +')}$`);
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
  REG[r1] = imm;
};

const add = (r1: number, r2: number, r3: number) => {
  REG[r1] = REG[r2] + REG[r3];
};

const subt = (r1: number, r2: number, r3: number) => {
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

const PATTERNS: { [key in keyof typeof INSTRUCTIONS]: [ParsingData, InstructionEval] } = {
  mov1: [{ registers: 1, immediate: true }, mov1],
  mov2: [{ registers: 1, immediate: true }, mov2],
  mov3: [{ registers: 2 }, mov3],
  mov4: [{ registers: 1, immediate: true }, mov4],
  add: [{ registers: 3 }, add],
  subt: [{ registers: 3 }, subt],
  jz: [{ registers: 1, immediate: true }, jz],
  halt: [{}, halt],
  mul: [{ registers: 3 }, mul],
  load: [{ registers: 2 }, load],
  readm: [{ immediate: true }, readm],
};

const INSTRUCTION_NUMBERS: { [key in keyof typeof INSTRUCTIONS]: number } = {
  mov1: 0,
  mov2: 1,
  mov3: 2,
  mov4: 3,
  add: 4,
  subt: 5,
  jz: 6,
  halt: 15,
  mul: 8,
  load: 10,
  readm: 7,
};

const toHex = (decimal: number, length: number) => {
  if (decimal >= 16 ** length) {
    throw Error(`Unable to convert ${decimal} to HEX as it is too big`);
  }

  let hex = decimal.toString(16);
  while (hex.length < length) {
    hex = '0' + hex;
  }

  return hex;
};

const VARIABLES: { [name: string]: string } = {};

/**
 * Parse the instruction. An error will be thrown for any detected errors in the line.
 *
 * @param line The line of text to parse.
 * @returns The parsed instruction or null if the line is empty.
 */
export const parseLine = (line: string): Instruction | null => {
  line = line.trim();

  // Check for a #define statement first
  const defineMatch = line.match(DEFINE);
  if (defineMatch) {
    VARIABLES[defineMatch[1]] = defineMatch[2];
    return null;
  }

  // Ignore comments and trip all whitespace
  // Make sure to trim after splitting
  line = line.split('#')[0].trim();
  if (!line) {
    return null;
  }

  for (const k of Object.keys(VARIABLES)) {
    // Replace all instances of k with VARIABLES[k]
    line = line.split(k).join(VARIABLES[k]);
  }

  let match = line.match(COMMAND);
  if (!match) {
    throw Error(`Unable to parse instruction name for line: ${line}`);
  }

  const instruction = match[1];
  line = match[2].trim();

  if (!(instruction in PATTERNS)) {
    throw Error(`Unknown instruction: ${instruction}`);
  }

  // Grab the key and cast since TS isn't that smart
  const key = instruction as keyof typeof PATTERNS;
  const instructionNumber = INSTRUCTION_NUMBERS[key];
  if (instructionNumber > 15) {
    throw Error(`Invalid instruction number: ${instructionNumber}`);
  }

  // shift to most significant 4 bits
  let decimal = INSTRUCTION_NUMBERS[key] << 12;

  const patterns = PATTERNS[key];

  const [parsingData, evaluate] = patterns;
  const { registers = 0, immediate = false } = parsingData;
  const reg = makeRegex(parsingData);

  match = line.match(reg);

  if (match === null) {
    throw Error(`Unable to parse arguments for "${instruction}": "${line}"`);
  }

  // The first index is the whole regex match, which we don't want
  const numbers = match.slice(1).map((value) => parseInt(value, 10));

  for (const i of range(registers)) {
    // Each register is 4 bits (that's why we use 4)
    // We want the ->
    // 1st register to go in bits 11, 10, 9, 8
    // 2nd register to go in bits 7, 6, 5, 4
    // 3rd register to go in bits 3, 2, 1, 0
    decimal += numbers[i] << (4 * (2 - i));
  }

  if (immediate) {
    // Stick the immediate value in the least significant bits
    decimal += numbers[numbers.length - 1];
  }

  // const result = convert().map(([value, length]) => [parseInt(value, 10), length]) as Array<[number, number]>;
  // if (args.length !== evaluate.arguments.length) {
  //   throw Error(`Error during evaluation. Invalid args length: ${args.length} vs ${evaluate.arguments.length}`);
  // }

  const hex = toHex(decimal, 4).toUpperCase();
  return {
    evaluate,
    args: numbers,
    hex,
  };
};

export const parse = (text: string) => {
  const instructions: Instruction[] = [];
  const sourceMap: SourceMap = {};
  text.split('\n').map(parseLine).forEach((line, i) => {
    if (line) {
      sourceMap[instructions.length] = i;
      instructions.push(line);
    }
  });

  return {
    instructions,
    sourceMap,
  };
};

export function* debug(instructions: Instruction[]) {
  COUNTER = 0;
  while (true) {
    if (COUNTER >= instructions.length) {
      break;
    }


    const instruction = instructions[COUNTER];

    const { evaluate, args } = instruction;
    COUNTER++;

    const done = evaluate(...args);
    if (done) {
      break;
    }

    yield;
    TIME++;
  }
}
