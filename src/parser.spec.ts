import { parseLine } from '@/parser';

const ex = (o: { hex: string } | null) => {
  return expect(o ? o.hex : null);
};

describe('parser', () => {
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
    ex(parseLine('mov3 R1 R2')).toEqual('2120');
  });

  it('mov4', () => {
    ex(parseLine('mov4 R1 5')).toEqual('3105');
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
});
