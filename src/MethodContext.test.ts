import { obj, obj1 } from './MethodContext';
import { EventEmitter } from './EventEmitter';

describe('Контекст выполнения', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('Обработчики событий', () => {
        beforeEach(() => {
            EventEmitter.handlers.clear();
        });

        it('При подписке и отписке передаётся одна и та же функция', () => {
            const onSpy = jest.spyOn(EventEmitter, 'on');
            const offSpy = jest.spyOn(EventEmitter, 'off');

            obj.subscribe();
            obj.unsubscribe();

            expect(onSpy.mock.calls[0]).toStrictEqual(offSpy.mock.calls[0]);
        });

        it('При подписке передаётся корректный обработчик', () => {
            obj.subscribe();

            expect(obj.count).toBe(0);

            EventEmitter.emit('click');

            expect(obj.count).toBe(1);

            EventEmitter.emit('click');

            expect(obj.count).toBe(2);
        });
    });

    describe('Прокидывание аргументов', () => {
        it('first вызывает second с развёрнутыми параметрами', () => {
            const spy = jest.spyOn(obj1, 'second');

            obj1.first(1, 2, 3);
            obj1.first(3, 2, 1);
            obj1.first(5, 32, 9);

            expect(spy.mock.calls[0]).toEqual([3, 2, 1]);
            expect(spy.mock.calls[1]).toEqual([1, 2, 3]);
            expect(spy.mock.calls[2]).toEqual([9, 32, 5]);
        });
    });
});
