import User from "./model";
import {
  success,
  ExistsError,
  AuthenticationError,
  encodeJwt,
  decodeJwt,
  successMessage,
  NotFoundError,
} from "iyasunday";
import bcrypt from "bcrypt";
import { USERTYPE } from "../../utils/constant";
const CLIENT_URL = "https://ishot-it.com";

async function setAuth(userObj) {
  const id = userObj._id;
  userObj.id = id;
  userObj.token = await encodeJwt({
    data: { id, createdAt: new Date() },
    secreteKey: process.env.APP_KEY,
    duration: process.env.JWT_TOKEN_VALIDITY,
  });
  const userToken = await User.findByIdAndUpdate(
    userObj._id,
    { token: userObj.token },
    { returnOriginal: false }
  );
  return userToken;
}

export async function signup(body) {
  try {
    
    const isExist = await User.findOne({ email: body.email });
    if (isExist) {
      throw new ExistsError(`${body.email} already Exist`);
    }
    
    let newUser = new User();
    newUser.firstname = body.firstname;
    newUser.lastname = body.lastname;
    newUser.username = body.username;
    newUser.email = body.email.trim();
    newUser.password = body.password;
    newUser.photo = body.photo;
    newUser.userType = body.userType;
    newUser.permissions = USERTYPE[body.userType.toUpperCase()];
    await newUser.save();
    return {
      success,
      message: `You have successfully created your account, kindly check your email inbox or spam folder to get verification link.`,
      data: await setAuth(newUser),
    };
  } catch (err) {
    throw err;
  }
}

export async function login(body) {
  try {
    const { email, password } = body;
    const exist = await User.findOne({ email }).select("+password");
    if (!exist) {
      throw new AuthenticationError(` Invalid Credentials`);
    }
    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch) {
      throw new AuthenticationError(` Invalid Credentials`);
    }
    return {
      success,
      data: await setAuth(exist),
    };
  } catch (err) {
    throw err;
  }
}

export async function update(user, body) {
  try {
    const updateUser = await User.findByIdAndUpdate({ _id: user.id }, body, {
      new: true,
    });
    if (!updateUser) {
      throw new NotFoundError("User not found");
    }
    return {
      success,
      data: updateUser,
      message: `profile successfully updated`,
    };
  } catch (err) {
    throw err;
  }
}

export async function getUser(user) {
  try {
    const getUser = await User.findById({ _id: user.id });
    if (!getUser) throw new NotFoundError("User not found");
    return {
      success,
      data: getUser,
      message: `Record Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}

export async function getUsers() {
  try {
    const getUsers = await User.find();
    if (!getUsers) throw new NotFoundError("No Record Found");
    return {
      success,
      data: getUsers,
      message: `Records Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}

export async function changePassword(user, body) {
  try {
    const checkUser = await User.findOne({ _id: user.id }).select("+password");

    const { oldPassword, newPassword, confirmPassword } = body;
    const checkPassword = await bcrypt.compare(oldPassword, checkUser.password);
    if (!checkPassword)
      throw new AuthenticationError("Old password not correct");
    else if (newPassword !== confirmPassword)
      throw new AuthenticationError("Confirm password mismatched");
    const hashPassword = await bcrypt.hash(newPassword, 12);
    const updatedPassword = await User.findOneAndUpdate(
      { _id: user.id },
      { password: hashPassword }
    );
    return {
      data: await setAuth(checkUser),
      message: "Password changed successfully",
      success,
    };
  } catch (err) {
    throw err;
  }
}

export async function sendEmailVerification(body) {
  try {
    const user = await User.findOne({ email: body.email });
    if (!user)
      throw new NotFoundError(
        `${body.email} is not associated to any user account`
      );

    const url = `${CLIENT_URL}/email-verification/${await encodeJwt({
      data: { _id: user.id, email: user.email },
      secreteKey: process.env.APP_KEY,
      duration: "60m",
    })}`;

    await sendMail({
      to: user.email,
      subject: `${process.env.APP_NAME} email verification`,
      template: "accountverification-2022-06-29.152649",
      variables: {
        name: body.firstname,
        url,
      },
    });
    return successMessage("Kindly check your email for verification link");
  } catch (err) {
    throw err;
  }
}

export async function verifyEmail(params) {
  try {
    const { _id, email } = await decodeJwt(params.token, process.env.APP_KEY);

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User not found");
    if (user.status === "ACTIVE")
      throw new ExistsError("Email already verified");

    await user.findOneAndUpdate({ status: "ACTIVE" });
    return successMessage("Email address verified");
  } catch (err) {
    throw err;
  }
}

export async function updateAccountStatus(user, body) {
  try {
    const updateStatus = await User.findById({ _id: user.id });
   
    if (!updateStatus) throw new NotFoundError("User account not found");
    else if (updateStatus.status === body.status)
      throw new ExistsError("Account status is already " + body.status);

      const update = await User.findByIdAndUpdate({ _id: user.id }, body, {
        new: true,
      });

    return successMessage("Account Status Changed To " + body.status);
  } catch (err) {
    throw err;
  }
}
