import { parseLine, parse, Instruction } from '@/parser';
import in1 from '@/assets/in.1';
import out from '@/assets/out';
import in2 from '@/assets/in.2';
import in3 from './assets/in.3';

const ex = (o: { hex: string } | null) => {
  return expect(o ? o.hex : null);
};

const exInstructions = (o: { instructions: Instruction[] }) => {
  return expect(o.instructions.map(({ hex }) => hex).join('\n'));
};

describe('parser', () => {
  describe('parseLine', () => {
    it('renders props.msg when passed', () => {
      ex(parseLine('halt')).toEqual('F000');
    });

    it('add', () => {
      ex(parseLine('add R1 R1 R2')).toEqual('4112');
    });

    it('subt', () => {
      ex(parseLine('subt R1 R1 R2')).toEqual('5112');
    });

    it('mul', () => {
      ex(parseLine('mul R1 R1 R2')).toEqual('8112');
    });

    it('mov1', () => {
      ex(parseLine('mov1 R1 5')).toEqual('0105');
    });

    it('mov2', () => {
      ex(parseLine('mov2 R1 5')).toEqual('1105');
    });

    it('mov3', () => {
      ex(parseLine('save R1 R2')).toEqual('2120');
    });

    it('mov4', () => {
      ex(parseLine('set R1 5')).toEqual('3105');
    });

    it('jz', () => {
      ex(parseLine('jz R9 8')).toEqual('6908');
    });

    it('load', () => {
      ex(parseLine('load R9 R8')).toEqual('A980');
    });

    it('readm', () => {
      ex(parseLine('readm 80')).toEqual('7050');
    });

    it('comments', () => {
      expect(parseLine('add R1 R1 R1#klsdfj')).toEqual(parseLine('add R1 R1 R1'));
      ex(parseLine('# sdfklj')).toEqual(parseLine(''));
    });

    it('correctly interprets #define', () => {
      const variables = {};
      parseLine(' #define AAA R1', variables);
      expect(variables).toEqual({ AAA: 'R1' });
    });

    it('correctly replaces variables', () => {
      expect(parseLine('add AA AA AAAA', { AA: 'R1', AAAA: 'R2' })).toEqual(parseLine('add R1 R1 R2'));
    });
  });

  describe('parse', () => {
    it('parses program correctly', () => {
      exInstructions(parse(in1)).toEqual(out.trim());
    });

    it('parses same program correctly with variables', () => {
      exInstructions(parse(in2)).toEqual(out.trim());
    });

    it('parses another same program correctly with variables', () => {
      exInstructions(parse(in3)).toEqual(out.trim());
    });
  });
});
