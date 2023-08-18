import userModel from "./models/user.models.js";

class SessionDao {
  addUser = async (body) => {
    const newUser = await userModel.create(body);
    return newUser;
  };

  findUser = async ({ email }) => {
    const user = await userModel.findOne({ email });
    return user;
  };

  updateUser = async (userId, newPswHashed) => {
    const updateUser = await userModel.findByIdAndUpdate(userId, {
      password: newPswHashed,
    });
    return updateUser;
  };
}

export const sessionDao = new SessionDao();
