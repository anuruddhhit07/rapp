"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ti_buffer = void 0;
class ti_buffer {
    constructor(size) {
        this.size = size;
        this.pushes = 0;
        this.index = 0;
        this.sum = 0;
        // this.vals = new Array(size)
        this.vals = [];
    }
    static new(size) {
        return new ti_buffer(size);
    }
    // static free(buffer: ti_buffer): void {
    //     buffer = null
    // }
    push(val) {
        if (this.pushes >= this.size) {
            this.sum -= this.vals[this.index];
        }
        this.sum += val;
        this.vals[this.index] = val;
        this.pushes += 1;
        this.index = (this.index + 1) % this.size;
    }
    qpush(val) {
        this.vals[this.index] = val;
        this.index = (this.index + 1) % this.size;
    }
    get(val) {
        return this.vals[(this.index + this.size - 1 + val) % this.size];
    }
}
exports.ti_buffer = ti_buffer;
