/*
Не стоит пытаться использовать такой EventEmitter в реальных проектах,
он существует только для учебных целей и обладает сильно ограниченным функционалом.
 */
export const EventEmitter = {
    handlers: new Map(),
    on(eventName, callback) {
        const existingHandlers = this.handlers.get(eventName);
        if (existingHandlers) {
            existingHandlers.push(callback);
        } else {
            this.handlers.set(eventName, [callback]);
        }
    },
    off(eventName, callback) {
        const existingHandlers = this.handlers.get(eventName);
        if (existingHandlers) {
            const handlerIndex = existingHandlers.find(
                (handler) => handler === callback,
            );
            if (handlerIndex !== -1) {
                existingHandlers.splice(handlerIndex, 1);
            }
            if (existingHandlers.length === 0) {
                this.handlers.delete(eventName);
            }
        }
    },
    emit(eventName) {
        const existingHandlers = this.handlers.get(eventName);
        if (existingHandlers) {
            existingHandlers.forEach((callback) => {
                callback();
            });
        }
    },
};
