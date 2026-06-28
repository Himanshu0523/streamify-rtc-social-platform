import FriendRequest from '../model/FriendRequest.js';
import User from '../model/User.js';

export async function getRecommendedUsers(req, res) {
  try {
    // console.log("Current user:", req.user._id);

    const allUsers = await User.find();
    // console.log("All users:", allUsers);

    const onboardedUsers = await User.find({ isOnboarded: true });
    // console.log("Onboarded users:", onboardedUsers);

    const users = await User.find({
      _id: { $ne: req.user._id },
      isOnboarded: true,
    });

    // console.log("Recommended:", users);

    res.json({
      recommendedUsers: users,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function getMyFriends (req, res) {
  try {
    const user = await User.findById (req.user.id).populate (
      'friends',
      'fullName profilePic nativeLanguage learningLanguage'
    );

    res.status (200).json (user.friends);
  } catch (error) {
    res.status (500).json ({message: 'Internal Server Error'});
  }
}

export async function sendFriendRequest (req, res) {
  try {
    const myId = req.user.id;
    const {id: recipientId} = req.params;

    if (myId === recipientId) {
      return res
        .status (400)
        .json ({message: 'Cannot send request to yourself'});
    }

    const recipient = await User.findById (recipientId);
    if (!recipient) {
      return res.status (404).json ({message: 'Recipient not found'});
    }

    if (recipient.friends.some (friendId => friendId.toString () === myId)) {
      return res.status (400).json ({
        message: 'Already friends',
      });
    }

    const existingRequest = await FriendRequest.findOne ({
      $or: [
        {sender: myId, recipient: recipientId},
        {sender: recipientId, recipient: myId},
      ],
    });

    if (existingRequest) {
      return res.status (400).json ({message: 'Request already exists'});
    }

    const request = await FriendRequest.create ({
      sender: myId,
      recipient: recipientId,
      status: 'pending',
    });

    res.status (201).json (request);
  } catch (error) {
    // console.log (error.message);
    res.status (500).json ({message: 'Server error'});
  }
}

export async function acceptFriendRequest (req, res) {
  try {
    const {id: requestId} = req.params;

    const request = await FriendRequest.findById (requestId);

    if (!request) {
      return res.status (404).json ({message: 'Friend request not found'});
    }

    if (request.recipient.toString () !== req.user.id) {
      return res.status (403).json ({message: 'Not authorized'});
    }

    request.status = 'accepted';
    await request.save ();

    await User.findByIdAndUpdate (request.sender, {
      $addToSet: {friends: request.recipient},
    });

    await User.findByIdAndUpdate (request.recipient, {
      $addToSet: {friends: request.sender},
    });

    res.status (200).json ({message: 'Friend request accepted'});
  } catch (error) {
    res.status (500).json ({message: 'Server error'});
  }
}

export async function getFriendRequests (req, res) {
  try {
    const incomingReqs = await FriendRequest.find ({
      recipient: req.user.id,
      status: 'pending',
    }).populate (
      'sender',
      'fullName profilePic nativeLanguage learningLanguage'
    );

    const acceptedReqs = await FriendRequest.find ({
      sender: req.user.id,
      status: 'accepted',
    }).populate (
      'recipient',
      'fullName profilePic nativeLanguage learningLanguage'
    );

    res.status (200).json ({incomingReqs, acceptedReqs});
  } catch (error) {
    // console.log (error.message);
    res.status (500).json ({message: 'Server Error'});
  }
}
export async function getOutgoingFriendReqs(req, res) {
  try {
    // console.log("Outgoing request endpoint hit");

    const outgoingFriendReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    // console.log(outgoingFriendReqs);

    return res.status(200).json({
      outgoingFriendReqs,
    });
  } catch (err) {
    // console.error("Outgoing Error:", err);
    return res.status(500).json({
      message: err.message,
    });
  }
}