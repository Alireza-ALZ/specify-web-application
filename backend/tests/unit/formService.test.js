describe('formService', () => {
  beforeEach(() => jest.resetModules());

  test('submitForm - saves submission and updates user', async () => {
    const saveMock = jest.fn().mockResolvedValue(true);
    const FormMock = function (data) {
      this._id = 'fs1';
      Object.assign(this, data);
      this.save = saveMock;
    };
    const findByIdAndUpdateMock = jest.fn().mockResolvedValue(true);
    FormMock.prototype = {};

    jest.doMock('../../src/models/formSubmission', () => FormMock);
    jest.doMock('../../src/models/user', () => ({
      findByIdAndUpdate: findByIdAndUpdateMock,
    }));

    const { submitForm } = require('../../src/services/formService');
    const res = await submitForm({
      userId: 'u1',
      firstname: 'A',
      lastname: 'B',
    });
    expect(saveMock).toHaveBeenCalled();
    expect(findByIdAndUpdateMock).toHaveBeenCalled();
    expect(res._id).toBe('fs1');
  });
});
