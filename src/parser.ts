export interface ProgramData {
  registers: number[];
  memory: number[];
  counter: number;
  time: number;
  out: number[];
}

const reset = () => ({
  registers: Array(2 ** 4).fill(0),
  memory: Array(2 ** 8).fill(0),
  counter: 0,
  time: 0,
  out: [],
});
export let programData: ProgramData = reset();

const INSTRUCTIONS = {
  mov1: 'mov1', // RF[rn] <= mem[direct]
  mov2: 'mov2', // mem[direct] <= RF[rn]
  save: 'mov3', // mem[RF[rn]] <= RF[rm]
  set: 'mov4', // RF[rn] <= imm
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
  programData.registers[r1] = programData.memory[direct];
};

const mov2 = (r1: number, direct: number) => {
  programData.memory[direct] = programData.registers[r1];
};

const save = (r1: number, r2: number) => {
  programData.memory[programData.registers[r1]] = programData.registers[r2];
};

const set = (r1: number, imm: number) => {
  programData.registers[r1] = imm;
};

const add = (r1: number, r2: number, r3: number) => {
  programData.registers[r1] = programData.registers[r2] + programData.registers[r3];
};

const subt = (r1: number, r2: number, r3: number) => {
  programData.registers[r1] = programData.registers[r2] - programData.registers[r3];
};

const jz = (r1: number, imm: number) => {
  if (programData.registers[r1] === 0) {
    programData.counter = imm;
  }
};

const halt = () => {
  return true;
};

const mul = (r1: number, r2: number, r3: number) => {
  programData.registers[r1] = programData.registers[r2] * programData.registers[r3];
};

const load = (r1: number, r2: number) => {
  programData.registers[r1] = programData.memory[programData.registers[r2]];
};

const readm = (imm: number) => {
  programData.out[programData.time] = imm;
};

const PATTERNS: { [key in keyof typeof INSTRUCTIONS]: [ParsingData, InstructionEval] } = {
  mov1: [{ registers: 1, immediate: true }, mov1],
  mov2: [{ registers: 1, immediate: true }, mov2],
  save: [{ registers: 2 }, save],
  set: [{ registers: 1, immediate: true }, set],
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
  save: 2,
  set: 3,
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


interface Variables { [name: string]: string; }

/**
 * Parse the instruction. An error will be thrown for any detected errors in the line.
 *
 * @param line The line of text to parse.
 * @returns The parsed instruction or null if the line is empty.
 */
export const parseLine = (line: string, variables: Variables = {}): Instruction | null => {
  line = line.trim();

  // Check for a #define statement first
  const defineMatch = line.match(DEFINE);
  if (defineMatch) {
    variables[defineMatch[1]] = defineMatch[2];
    return null;
  }

  // Ignore comments and trip all whitespace
  // Make sure to trim after splitting
  line = line.split('#')[0].trim();
  if (!line) {
    return null;
  }

  for (const k of Object.keys(variables)) {
    // FYI \\b matches word boundary (but doesn't actually match any characters)
    line = line.replace(new RegExp(`\\b${k}\\b`, 'g'), variables[k]);
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
  const variables = {};

  text.split('\n').map((line) => parseLine(line, variables)).forEach((line, i) => {
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
  // RESET the attributes or programData
  Object.assign(programData, reset());

  while (true) {
    yield;

    if (programData.counter >= instructions.length) {
      break;
    }


    const instruction = instructions[programData.counter];
    programData.time++;
    programData.counter++;

    const { evaluate, args } = instruction;

    const done = evaluate(...args);
    if (done) {
      break;
    }
  }
}
