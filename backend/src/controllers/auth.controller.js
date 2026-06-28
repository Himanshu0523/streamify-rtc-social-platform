import {upsertStreamUser} from '../lib/stream.js';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';

export async function signup (req, res) {
  const {email, password, fullName} = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status (400).json ({message: 'All fields are required'});
    }

    if (password.length < 6) {
      return res
        .status (400)
        .json ({message: 'Password must be at least 6 characters'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test (email)) {
      return res.status (400).json ({message: 'Invalid email format'});
    }

    const existingUser = await User.findOne ({email});
    if (existingUser) {
      return res.status (400).json ({message: 'User already exists'});
    }

    const newUser = await User.create ({
      email,
      fullName,
      password,
      profilePic: `https://api.dicebear.com/9.x/adventurer/png?seed=${encodeURIComponent (fullName)}`,
    });

    try {
      await upsertStreamUser ({
        id: newUser._id.toString (),
        name: newUser.fullName,
        images: newUser.profilePic || '',
      });
    //   console.log (`Stream user created for ${newUser.fullName}`);
    } catch (error) {
    //   console.error (`Stream user error for ${error}`);
    }

    // create the user to stream
    const token = jwt.sign ({userId: newUser._id}, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    // return res.status(201).json({ message: "User created successfully", user: newUser, token });

    res.cookie ('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict', // prevenT CSRF attacks
      httpOnly: true, // Prevent XSS attacks
      secure: process.env.NODE_ENV === 'production',
    });

    res.status (201).json ({
      success: true,
      message: 'User created successfully',
      user: newUser,
      token,
    });
  } catch (error) {
    // console.error ('Signup error:', error);
    return res.status (500).json ({message: 'Internal server error'});
  }
}

export async function login (req, res) {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status (400).json ({message: 'ALL fields are required'});
    }
    const existingUser = await User.findOne ({email});
    if (!existingUser)
      return res.status (401).json ({message: 'Invalid email or password '});

    const isPasswordCorrect = await existingUser.matchPassword (password);
    if (!isPasswordCorrect)
      return res.status (401).json ({message: 'Invalid email or password'});
    const token = jwt.sign (
      {userId: existingUser._id},
      process.env.JWT_SECRET,
      {expiresIn: '7d'}
    );
    res.cookie ('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict', // prevenT CSRF attacks
      httpOnly: true, // Prevent XSS attacks
      secure: process.env.NODE_ENV === 'production',
    });

    res.status (200).json ({success: true, user: existingUser, token});
  } catch (error) {
    return res.status (500).json ({message: 'Internal server error'});
  }
}

export function logout (req, res) {
  res.clearCookie ('jwt');
  res.status (200).json ({success: true, message: 'Logout successful'});
}

export async function onboard (req, res) {
  try {
    const userId = req.user._id;
    const {
      fullName,
      bio,
      nativeLanguage,
      learningLanguage,
      location,
    } = req.body;
    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      location === undefined
    ) {
      return res.status (400).json ({
        message: 'All Fields are required',
        missingFields: [
          !fullName && 'fullName',
          !bio && 'bio',
          !nativeLanguage && 'nativeLanguage',
          !learningLanguage && 'learningLanguage',
          location === undefined && 'location',
        ].filter (Boolean),
      });
    }
    const updatedUser = await User.findByIdAndUpdate (
      userId,
      {
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        isOnboarded: true,
      },
      {new: true}
    ).select ('-password');
    if (!updatedUser)
      return res.status (404).json ({message: 'user not found'});

    try {
      await upsertStreamUser ({
        id: updatedUser._id.toString (),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || '',
      });
    //   console.log (
    //     `Stream user updated after onBoarding for ${updatedUser.fullName}`
    //   );
    } catch (streamError) {
    //   console.log (
    //     'Strean updating Stream user during onboarding:',
    //     streamError.message
    //   );
    }
    // ToDo : UPDATE THE USER INFO IN STREAM
    res.status (200).json ({success: true, user: updatedUser});
  } catch (error) {
    // console.error ('Onboarding error: ', error);
    res.status (500).json ({message: 'Internal Server error'});
  }
}
