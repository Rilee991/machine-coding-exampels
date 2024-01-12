import { useRef } from "react";

class LRUCache {
    constructor(size) {
        this.size = size;
        this.head = null;
        this.tail = null;
        this.cache = {};
    }

    get(key) {
        console.log("Before getting:", this.cache);
        if(this.cache[key]) {
            this.moveToFront(key);
            return this.cache[key].value;
        }
        console.log("After getting:", this.cache);

        return null;
    }

    put(key, value) {
        console.log("Before putting:", key, value);
        if(this.cache[key]) {
            this.cache[key].value = value;
            this.moveToFront(key);
        } else {
            const currSize = Object.keys(this.cache).length;
            if(currSize == this.size) {
                this.removeLast();
            }
            this.addToFront(key, value);
        }
        console.log("After putting:", this.cache);
    }

    moveToFront(key) {
        console.log("movin");
        if(!this.head || this.head == this.tail || this.head.key == key)  return;

        const currNode = this.cache[key];
        currNode.prev.next = currNode.next;
        if(currNode.next) {
            currNode.next.prev = currNode.prev;
        }

        currNode.next = this.head;
        this.head.prev = currNode;
        this.head = currNode;
    }

    addToFront(key, value) {
        console.log("adding");
        const newNode = { key, value, next: null, prev: null };
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.cache[key] = newNode;
    }

    removeLast() {
        console.log("removing");
        if(!this.head)  return;
        delete this.cache[this.tail.key];

        if(this.head == this.tail) {
            this.head = this.tail = null;
            return;
        }

        const prev = this.tail.prev;
        prev.next = null;
        delete this.tail;
        this.tail = prev;
    }
}

const useLruCache = (size) => {
    const lruCache = useRef(new LRUCache(size));
    const get = (key) => lruCache.current.get(key);
    const put = (key, value) => lruCache.current.put(key, value);
    return { get, put };
}

export default useLruCache;
