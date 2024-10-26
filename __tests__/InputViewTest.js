import InputView from '../src/View/InputView';
import { mockQuestions } from './ApplicationTest';

describe('InputView', () => {
  test('자동차 이름을 입력받아 배열로 반환한다', async () => {
    // given
    const input = ['pobi,woni'];
    const output = ['pobi', 'woni'];

    mockQuestions(input);

    // when
    const inputView = new InputView();
    const carNames = await inputView.readCarNames();

    // then
    expect(carNames).toEqual(output);
  });

  test('자동차 이름 입력에서 공백 제거', async () => {
    // given
    const input = ['  pobi , woni  '];
    const output = ['pobi', 'woni'];

    mockQuestions(input);

    // when
    const inputView = new InputView();
    const carNames = await inputView.readCarNames();

    // then
    expect(carNames).toEqual(output);
  });

  test('시도할 횟수를 입력받아 숫자로 변환하여 반환한다', async () => {
    // given
    const input = ['2'];
    const output = 2;

    mockQuestions(input);

    // when
    const inputView = new InputView();
    const attemptCount = await inputView.readAttemptCount();

    // then
    expect(attemptCount).toBe(output);
  });

  test('예외 테스트 : 자동차 이름은 이름은 5자 이하만 가능하다', async () => {
    const inputs = ['pobi,javaji'];
    mockQuestions(inputs);

    const inputView = new InputView();

    await expect(inputView.readCarNames()).rejects.toThrow(
      '[ERROR] 자동차 이름은 이름은 5자 이하만 가능합니다.'
    );
  });

  test('예외 테스트 : 자동차 이름은 중복되지 않아야 한다', async () => {
    const inputs = ['pobi,pobi'];
    mockQuestions(inputs);

    const inputView = new InputView();

    await expect(inputView.readCarNames()).rejects.toThrow(
      '[ERROR] 자동차 이름은 중복되지 않아야 합니다.'
    );
  });
});
