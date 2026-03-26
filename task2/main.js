function deepCopy(obj, visited = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (visited.has(obj)) {
    return visited.get(obj);
  }

  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  
  if (obj instanceof Set) {
    const copy = new Set();
    visited.set(obj, copy);
    obj.forEach(val => copy.add(deepCopy(val, visited)));
    return copy;
  }
  
  if (obj instanceof Map) {
    const copy = new Map();
    visited.set(obj, copy);
    obj.forEach((val, key) => copy.set(deepCopy(key, visited), deepCopy(val, visited)));
    return copy;
  }

  const copy = Array.isArray(obj) 
    ? [] 
    : Object.create(Object.getPrototypeOf(obj));

  visited.set(obj, copy);

  const allKeys = Reflect.ownKeys(obj);
  
  for (const key of allKeys) {
    const value = obj[key];
    copy[key] = deepCopy(value, visited);
  }

  return copy;
}

const a = { x: 1 };
a.self = a;
const b = deepCopy(a);
console.log(b.self === b);


const key = { id: 1 };
const map = new Map([[key, 'val']]);
const mapCopy = deepCopy(map);
key.id = 999;
console.log(mapCopy.get({ id: 1 })); 


const original = { arr: [1, { nested: 2 }] };
const copied = deepCopy(original);
copied.arr[1].nested = 999;
console.log(original.arr[1].nested); 