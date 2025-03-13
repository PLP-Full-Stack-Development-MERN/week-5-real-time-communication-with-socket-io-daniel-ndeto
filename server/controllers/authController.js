const User = require('../models/User');

// Rgistering new users
exports.registerUser = async (req, res, next) => {

  try {
    const { username, email, password } = req.body;

    // Validating that all fields are provided.
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Checking if a user already exists with the given username or email.
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {

      return res.status(400).json({ message: 'Username or email already taken.' });
    }

    // Creating a new user
    const newUser = new User({
      username,
      email,
      password,
      connected: false,
    });
    await newUser.save();

    return res.status(201).json({

      message: 'User registered successfully.',
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN: Accepts { username, password } and logs the user in.
exports.loginUser = async (req, res, next) => {

  try {
    const { username, password } = req.body;
    
    // Validating creditials
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    // Looking user by username.
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    
    // Marking user as connected.
    user.connected = true;
    await user.save();
    
    return res.status(200).json({
      message: 'Login successful.',
      user: {
        _id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};
