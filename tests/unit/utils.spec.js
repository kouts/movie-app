import { clone, isEmptyObject, getYearFromIsoDate } from '@/common/utils';

describe('clone', () => {
  it('returns a clone of the input object', () => {
    const obj = {
      foo: 'fooVal',
      bar: 'barVal'
    };
    const objClone = clone(obj);
    expect(objClone).toMatchObject(obj);
  });
  it('deep clones the input object', () => {
    const obj = {
      foo: 'fooVal',
      bar: 'barVal'
    };
    const objClone = clone(obj);
    objClone.foo = 'newFooVal';
    expect(obj.foo).toBe('fooVal');
  });
});

describe('getYearFromIsoDate', () => {
  it('returns the correct year when passed an iso date', () => {
    const year = getYearFromIsoDate('2020-07-17');
    expect(year).toBe('2020');
  });
});

describe('isEmptyObject', () => {
  it('correctly checks if the object is empty', () => {
    const isEmpty = isEmptyObject({});
    const isNotEmpty = isEmptyObject({
      foo: 'fooVal'
    });
    expect(isEmpty).toBe(true);
    expect(isNotEmpty).toBe(false);
  });
});
