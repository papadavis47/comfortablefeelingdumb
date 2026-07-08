// GENERIC FUNCTION: Using generics makes this function type-safe for any function signature
// Instead of using 'any[]' which loses all type information, we use generic type parameters
// This preserves the exact parameter types and return type of the original function

export function debounce<TArgs extends readonly unknown[]>(
  // GENERIC CONSTRAINT: TArgs extends readonly unknown[] means the function can accept any parameter list
  // but TypeScript will remember the exact types when you use the function
  func: (...args: TArgs) => void,
  wait: number,
  immediate = false
  // PROPER RETURN TYPE: The returned function has the same signature as the input function
): (...args: TArgs) => void {
  let timeout: NodeJS.Timeout | null = null // EXPLICIT INITIALIZATION: Better than undefined
  
  // SIMPLIFIED CONTEXT: Remove 'this' complexity since it's not needed in modern React
  return function (...args: TArgs): void {
    const later = function (): void {
      timeout = null
      if (!immediate) func(...args)
    }
    
    const callNow = immediate && !timeout
    
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(later, wait)
    
    if (callNow) {
      func(...args)
    }
  }
}

/* 
EXPLANATION: Why this is better than the original version:

1. GENERICS: <TArgs extends readonly unknown[]> preserves the exact parameter types
   - Before: func(...args: any[]) - TypeScript forgets what the parameters should be
   - After: func(...args: TArgs) - TypeScript remembers the exact parameter types

2. TYPE SAFETY: When you use this function:
   - Before: debounce((name: string, age: number) => {}) - parameters lose their types
   - After: debounce((name: string, age: number) => {}) - TypeScript knows you must pass string and number

3. BETTER IDE SUPPORT: 
   - Autocomplete works correctly
   - Parameter validation at compile time
   - Refactoring tools work properly

4. NO MORE 'any': Eliminated all uses of 'any' type which was hiding potential bugs
*/
