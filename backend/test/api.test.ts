import mongoose from "mongoose";
import randomstring from "randomstring";
import app from '../src/app';
import { UserTest } from "../src/interfaces/user";
import { deleteUser, getUserById, getUserList, loginUser, postUser, putUser } from "./userFunctions";
import LoginMessageResponse from "../src/interfaces/LoginMessageResponse";


describe('Testing api', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DATABASE_URL as string);
    });
    
    afterAll(async () => {
        await mongoose.connection.close();
    });
    let userData: LoginMessageResponse;
    let userData2: LoginMessageResponse;

    const testUser: UserTest = {
        username: 'Tester ' + randomstring.generate(5),
        email: randomstring.generate(7) + '@tester.fi',
        password: 'testpassword',
    };
    const testUser2: UserTest = {
        username: 'Second Tester ' + randomstring.generate(7),
        email: randomstring.generate(9) + '@user.fi',
        password: 'testpassword',
    };

    /* USER FUNCTIONS */

    it('should create a new user', async () => {
        await postUser(app, testUser);
    });
    it('should create a new user', async () => {
        await postUser(app, testUser2);
    });
    
    it('should login user', async () => {
        userData = await loginUser(app, testUser);
    });

    it('should login second user', async () => {
        userData2 = await loginUser(app, testUser2);
    });

    it('should return array of users', async () => {
        await getUserList(app);
    });
    
    it('should return single user', async () => {
        await getUserById(app, userData.user.id!);
    });

    it('should update user', async () => {
        await putUser(app, userData.token!);
    });

    it('should delete current user', async () => {
        await deleteUser(app, userData.token!);
    });
/*
      // test brute force protectiom
  test('Brute force attack simulation', async () => {
    const maxAttempts = 20;
    const mockUser: UserTest = {
      username: 'Test User ' + randomstring.generate(7),
      email: randomstring.generate(9) + '@user.fi',
      password: 'notthepassword',
    };

    try {
      // Call the mock login function until the maximum number of attempts is reached
      for (let i = 0; i < maxAttempts; i++) {
        const result = await loginBrute(app, mockUser);
        if (result) throw new Error('Brute force attack unsuccessful');
      }

      // If the while loop completes successfully, the test fails
      throw new Error('Brute force attack succeeded');
    } catch (error) {
      console.log(error);
      // If the login function throws an error, the test passes
      expect((error as Error).message).toBe('Brute force attack unsuccessful');
    }
  }, 15000);
*/
    /* Song functions */
});


