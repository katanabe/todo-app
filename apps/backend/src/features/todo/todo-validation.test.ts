import { describe, it, expect } from 'bun:test';
import { 
  createTodoSchema, 
  updateTodoSchema, 
  idParamSchema 
} from './todo.validation';

describe('Simple Test Suite', () => {
  describe('createTodoSchema validation', () => {
    it('should validate valid create todo input', () => {
      const validInput = {
        title: 'Test Todo',
        description: 'Test description'
      };

      const result = createTodoSchema.parse(validInput);
      
      expect(result.title).toBe('Test Todo');
      expect(result.description).toBe('Test description');
    });

    it('should validate create todo input without description', () => {
      const validInput = {
        title: 'Test Todo'
      };

      const result = createTodoSchema.parse(validInput);
      
      expect(result.title).toBe('Test Todo');
      expect(result.description).toBeUndefined();
    });

    it('should reject empty title', () => {
      const invalidInput = {
        title: '',
        description: 'Test description'
      };

      expect(() => createTodoSchema.parse(invalidInput)).toThrow('Title is required');
    });
  });

  describe('updateTodoSchema validation', () => {
    it('should validate partial update input with completed only', () => {
      const validInput = {
        completed: true
      };

      const result = updateTodoSchema.parse(validInput);
      
      expect(result.completed).toBe(true);
    });

    it('should accept empty object for updates', () => {
      const emptyInput = {};

      const result = updateTodoSchema.parse(emptyInput);
      
      expect(result).toEqual({});
    });
  });

  describe('idParamSchema validation', () => {
    it('should validate valid numeric string id', () => {
      const validInput = { id: '123' };

      const result = idParamSchema.parse(validInput);
      
      expect(result.id).toBe(123);
    });

    it('should reject non-numeric string id', () => {
      const invalidInput = { id: 'abc' };

      expect(() => idParamSchema.parse(invalidInput)).toThrow('Invalid ID format');
    });

    it('should reject zero id', () => {
      const invalidInput = { id: '0' };

      expect(() => idParamSchema.parse(invalidInput)).toThrow('Invalid ID format');
    });

    it('should reject negative id', () => {
      const invalidInput = { id: '-5' };

      expect(() => idParamSchema.parse(invalidInput)).toThrow('Invalid ID format');
    });

    it('should reject floating point id', () => {
      const invalidInput = { id: '12.5' };

      expect(() => idParamSchema.parse(invalidInput)).toThrow('Invalid ID format');
    });
  });
});