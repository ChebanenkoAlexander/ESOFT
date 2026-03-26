function isValid(s) {
  if (s.length === 0) return true;
  if (s.length % 2 !== 0) return false;

  const stack = [];
  const brackets = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (let i = 0; i < s.length; i++) {
    const current = s[i];

    if (brackets[current]) {
      const lastOpen = stack.pop();
      if (lastOpen !== brackets[current]) {
        return false;
      }
    } else {
      stack.push(current);
    }
  }

  return stack.length === 0;
}

console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("([)]"));
console.log(isValid("{[]}"));
console.log(isValid(""));
console.log(isValid("(("));
console.log(isValid("))"));
console.log(isValid("{[()]}"));