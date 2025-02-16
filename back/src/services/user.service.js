const path = require("path");
const userModel = require("../models/users.model");
const bcrypt = require('../../node_modules/bcrypt');

class UserService {
  constructor() {
    this.userModel = userModel;
  }

  async getUserByID(id) {
    return this.userModel.findById(id);
  }

  async getUserByEmail(email) {
    return this.userModel.findOne({ email: email });
  }

  async updateUserById(id, updateData) {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUserById(id) {
    return this.userModel.findByIdAndDelete(id);
  }


  async createUser(body) {
    let user;
    let userData = structuredClone(body); //Pour éviter de modifier le body
    try {
      let hash = await bcrypt.hash(userData.password, 10);
      userData.password = hash;
      user = await this.userModel.create(userData);
    } catch (error) {
      throw error;
    }
    return user;
  }

  async verifyPassword(inputPassword, userPasswordHash) {
    return await bcrypt.compare(inputPassword, userPasswordHash);
  }
}

module.exports = UserService;
