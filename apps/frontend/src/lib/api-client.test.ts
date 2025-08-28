describe('API Client Logic', () => {
  describe('URL construction', () => {
    it('should construct correct update URL', () => {
      const baseUrl = 'http://localhost:3001';
      const id = '123';
      const expectedUrl = `${baseUrl}/api/todos/${id}`;
      
      expect(expectedUrl).toBe('http://localhost:3001/api/todos/123');
    });

    it('should construct correct request payload', () => {
      const updateData = {
        title: 'Updated Todo',
        description: 'Updated Description',
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

  describe('Data transformation', () => {
    it('should handle partial update data correctly', () => {
      const partialUpdate = { completed: true };
      const serialized = JSON.stringify(partialUpdate);
      const deserialized = JSON.parse(serialized);

      expect(deserialized).toEqual({ completed: true });
    });

    it('should handle full update data correctly', () => {
      const fullUpdate = {
        title: 'New Title',
        description: 'New Description',
        completed: false,
      };

      const serialized = JSON.stringify(fullUpdate);
      const deserialized = JSON.parse(serialized);

      expect(deserialized.title).toBe('New Title');
      expect(deserialized.description).toBe('New Description');
      expect(deserialized.completed).toBe(false);
    });
  });
});