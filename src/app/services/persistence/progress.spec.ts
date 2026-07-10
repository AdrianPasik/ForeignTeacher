import { TestBed } from '@angular/core/testing';

import { Progress, ProgressItem, ProgressLoader } from './progress';

describe('Progress', () => {
  let service: ProgressLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should serialize on simple data', () => {
    const items = [
      new ProgressItem("test", ["1", "0", "1"], new Date(2022,0,1,1,1)),
      new ProgressItem("secondTest", ["0", "1", "0"], new Date(2022,11,12,23,12))
    ]
    const sut:Progress = new Progress("de",  items);
    const jsonString = sut.toJSON();
    expect(jsonString).not.toBeNull();
    const json = JSON.parse(jsonString);
    expect(json[0]).toBe("test|1|0|1|202201010101");
    expect(json[1]).toBe("secondTest|0|1|0|202212122312");
  });

  it('should deserialize on simple data', () => {
    const jsonString = '["test|1|0|1|202201010101","secondTest|0|1|0|202212122312"]';
    const sut:Progress = Progress.fromJSON("dePL", jsonString);
    expect(sut).not.toBeNull();
    expect(sut.key).toBe("dePL");
    expect(sut.items.length).toBe(2);
    expect(sut.items[0].attempts.length).toBe(3);
    expect(sut.items[0].attempts[0]).toBe("1");
    expect(sut.items[1].attempts[0]).toBe("0");
    expect(sut.items[0].lastAttempt.getMonth()).toBe(0);
    expect(sut.items[1].lastAttempt.getMonth()).toBe(11);
    expect(sut.items[0].lastAttempt.getDate()).toBe(1);
    expect(sut.items[1].lastAttempt.getDate()).toBe(12);
    expect(sut.items[0].lastAttempt.getMinutes()).toBe(1);
    expect(sut.items[1].lastAttempt.getMinutes()).toBe(12);
  });
});
