const bcrypt = require('bcrypt');

describe('authService', () => {
  beforeEach(() => jest.resetModules());

  test('createUser - creates user when phone not exists', async () => {
    const saveMock = jest.fn().mockResolvedValue(true);
    const UserMock = function (data) {
      this._id = 'mockid';
      Object.assign(this, data);
      this.save = saveMock;
    };
    UserMock.findOne = jest.fn().mockResolvedValue(null);

    jest.doMock('../../src/models/user', () => UserMock);
    const { createUser } = require('../../src/services/authService');

    const user = await createUser({
      phone_number: '+10000000000',
      password: 'secret12',
    });
    expect(UserMock.findOne).toHaveBeenCalled();
    expect(saveMock).toHaveBeenCalled();
    expect(user).toBeDefined();
  });

  test('verifyCredentials - returns user when password matches', async () => {
    const hashed = await bcrypt.hash('secret12', 10);
    const userObj = {
      _id: 'u1',
      phone_number: '+100',
      password_hash: hashed,
      save: jest.fn().mockResolvedValue(true),
    };
    const UserMock = function () {};
    UserMock.findOne = jest.fn().mockResolvedValue(userObj);
    jest.doMock('../../src/models/user', () => UserMock);

    const { verifyCredentials } = require('../../src/services/authService');
    const user = await verifyCredentials({
      phone_number: '+100',
      password: 'secret12',
    });
    expect(user).not.toBeNull();
    expect(user._id).toBe('u1');
  });
});
