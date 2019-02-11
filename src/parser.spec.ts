import { parseLine } from '@/parser';

describe.only('parser', () => {
  it('renders props.msg when passed', () => {
    expect(parseLine('halt')).toEqual('F000');
  });

  it('add', () => {
    expect(parseLine('add R1 R1 R2')).toEqual('4112');
  });

  it('sub', () => {
    expect(parseLine('sub R1 R1 R2')).toEqual('5112');
  });

  it('mul', () => {
    expect(parseLine('mul R1 R1 R2')).toEqual('8112');
  });

  it('mov1', () => {
    expect(parseLine('mov1 R1 5')).toEqual('0105');
  });

  it('mov2', () => {
    expect(parseLine('mov2 R1 5')).toEqual('1105');
  });

  it('mov3', () => {
    expect(parseLine('mov3 R1 R2')).toEqual('2120');
  });

  it('mov4', () => {
    expect(parseLine('mov4 R1 5')).toEqual('3105');
  });

  it('jz', () => {
    expect(parseLine('jz R9 8')).toEqual('6908');
  });
});
