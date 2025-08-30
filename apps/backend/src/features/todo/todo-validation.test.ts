import { describe, expect, it } from 'bun:test';
import {
  createTodoSchema,
  idParamSchema,
  updateTodoSchema,
} from './todo.validation';

describe('Todo バリデーションテスト', () => {
  describe('createTodoSchema バリデーション', () => {
    it('有効な Todo 作成入力を受け入れる', () => {
      const validInput = {
        title: 'テスト Todo',
        description: 'テスト説明',
      };

      const result = createTodoSchema.parse(validInput);

      expect(result.title).toBe('テスト Todo');
      expect(result.description).toBe('テスト説明');
    });

    it('説明なしの Todo 作成入力を受け入れる', () => {
      const validInput = {
        title: 'テスト Todo',
      };

      const result = createTodoSchema.parse(validInput);

      expect(result.title).toBe('テスト Todo');
      expect(result.description).toBeUndefined();
    });

    it('空のタイトルを拒否する', () => {
      const invalidInput = {
        title: '',
        description: 'テスト説明',
      };

      expect(() => createTodoSchema.parse(invalidInput)).toThrow(
        'Title is required'
      );
    });
  });

  describe('updateTodoSchema バリデーション', () => {
    it('完了状態のみの部分更新入力を受け入れる', () => {
      const validInput = {
        completed: true,
      };

      const result = updateTodoSchema.parse(validInput);

      expect(result.completed).toBe(true);
    });

    it('更新用の空のオブジェクトを受け入れる', () => {
      const emptyInput = {};

      const result = updateTodoSchema.parse(emptyInput);

      expect(result).toEqual({});
    });
  });

  describe('idParamSchema バリデーション', () => {
    it('有効な数値文字列 ID を受け入れる', () => {
      const validInput = { id: '123' };

      const result = idParamSchema.parse(validInput);

      expect(result.id).toBe(123);
    });

    it('非数値文字列 ID を拒否する', () => {
      const invalidInput = { id: 'abc' };

      expect(() => idParamSchema.parse(invalidInput)).toThrow(
        'Invalid ID format'
      );
    });

    it('ゼロの ID を拒否する', () => {
      const invalidInput = { id: '0' };

      expect(() => idParamSchema.parse(invalidInput)).toThrow(
        'Invalid ID format'
      );
    });

    it('負の ID を拒否する', () => {
      const invalidInput = { id: '-5' };

      expect(() => idParamSchema.parse(invalidInput)).toThrow(
        'Invalid ID format'
      );
    });

    it('小数点 ID を拒否する', () => {
      const invalidInput = { id: '12.5' };

      expect(() => idParamSchema.parse(invalidInput)).toThrow(
        'Invalid ID format'
      );
    });
  });
});
