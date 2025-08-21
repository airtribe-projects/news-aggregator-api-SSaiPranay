const bcrypt = require('bcryptjs');
const { users } = require('./db');

class User {
  static async create(userData) {
    const { email, password } = userData;
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    users.push(user);
    return { id: user.id, email: user.email };
  }
  
  static async findByEmail(email) {
    return users.find(user => user.email === email);
  }
  
  static async findById(id) {
    return users.find(user => user.id === id);
  }
  
  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;