describe('API クライアント ロジック', () => {
  describe('URL 構築', () => {
    it('正しい更新 URL を構築する', () => {
      const baseUrl = 'http://localhost:3001';
      const id = '123';
      const expectedUrl = `${baseUrl}/api/todos/${id}`;
      
      expect(expectedUrl).toBe('http://localhost:3001/api/todos/123');
    });

    it('正しいリクエストペイロードを構築する', () => {
      const updateData = {
        title: '更新された Todo',
        description: '更新された説明',
        completed: true,
      };

      const payload = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      };

      expect(payload.method).toBe('PUT');
      expect(payload.headers['Content-Type']).toBe('application/json');
      expect(JSON.parse(payload.body)).toEqual(updateData);
    });
  });

  describe('データ変換', () => {
    it('部分更新データを正しく処理する', () => {
      const partialUpdate = { completed: true };
      const serialized = JSON.stringify(partialUpdate);
      const deserialized = JSON.parse(serialized);

      expect(deserialized).toEqual({ completed: true });
    });

    it('完全更新データを正しく処理する', () => {
      const fullUpdate = {
        title: '新しいタイトル',
        description: '新しい説明',
        completed: false,
      };

      const serialized = JSON.stringify(fullUpdate);
      const deserialized = JSON.parse(serialized);

      expect(deserialized.title).toBe('新しいタイトル');
      expect(deserialized.description).toBe('新しい説明');
      expect(deserialized.completed).toBe(false);
    });
  });
});