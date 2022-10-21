import { EventEmitter } from './EventEmitter';

/*
1) В методе subscribe подпишитесь на событие click с помощью EventEmitter.on(eventName, callback).
В обработчике нужно увеличивать значение поля count на 1
2)В методе unsubscribe отпишитесь от события click с помощью EventEmitter.off(eventName, callback).
В качестве callback нужно передавать тот же самый обработчик, который был передан при подписке.
 */
function increase() {
    this.count++;
}

export const obj = {
    count: 0,
    func: () => increase.call(obj),
    subscribe() {
        EventEmitter.on('click', this.func);
    },
    unsubscribe() {
        EventEmitter.off('click', this.func);
    },
};

/*
Сделайте так, чтобы метод first вызывал метод second со своими аргументами, но в обратном порядке:

obj1.first(1, 2, 3);
// Внутренний вызов должен быть равносилен obj1.second(3, 2, 1)
 */
export const obj1 = {
    first(...args) {
        let arr = [];
        for (let i = 0; i < arguments.length; i++) {
            arr.push(arguments[i]);
        }
        arr.reverse();
        this.second(...arr);
    },
    second() {
        // здесь ничего писать не нужно
    },
};
