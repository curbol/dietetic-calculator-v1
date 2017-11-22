import { GroupByPipe } from './pipe';

describe('GroupByPipe', () => {
  it('create an instance', () => {
    const pipe = new GroupByPipe();
    expect(pipe).toBeTruthy();
  });
});
