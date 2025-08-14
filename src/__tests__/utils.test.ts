import { describe, it, expect } from 'vitest'
import { cn } from '../lib/utils'

describe('cn utility', () => {
	it('merges class names and removes duplicates', () => {
		const result = cn('p-2', 'text-sm', 'p-2', undefined, null, false, 'bg-red-500')
		expect(result).toBe('p-2 text-sm bg-red-500')
	})

	it('resolves conflicting Tailwind classes', () => {
		const result = cn('p-2', 'p-4')
		// tailwind-merge should keep the last contradictory utility
		expect(result).toBe('p-4')
	})
})


