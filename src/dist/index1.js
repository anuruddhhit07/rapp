export const isEven = (number) => {
    if (isNaN(number)) {
        throw new TypeError("The first argument must be a number");
    }
    return number % 2 === 0;
};
export const isOdd = (number) => !isEven(number);
export { sayHello, sayGoodbye } from './hello-world';
