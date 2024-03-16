const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const loadRegister = async (req, res) => {
  try {
    res.render("registration");
  } catch (error) {
    console.log(error.message);
  }
};

const insertUser = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const user = new User({
      name: req.body.name,
      Email: req.body.Email,
      mobile: req.body.mobile,
      //  image:req.file.filename,
      password: spassword,
      is_admin: 0,
    });

    const userData = await user.save();

    if (userData) {
      res.render("registration", {
        message: "your registration has been successfully completed",
      });
    } else {
      res.render("registration", {
        message: "your registration has been failed",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//login user methods started

const loginload = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ Email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        //   if(userData.is_verified==0){
        //       res.render('login',{message:'Please verified your mail.'});
        //    }else{
        req.session.user_id = userData._id;
        res.redirect("/home");
        // }
      } else {
        res.render("login", { message: "Email and password is incorrect" });
      }
    } else {
      res.render("login", { message: "email and password is incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    const userData = await User.findById({ _id: req.session.user_id });
    res.render("home", { user: userData });
  } catch (error) {
    console.log(error.message);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

//user profile edit and update

const editLoad = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const userData = await User.findById({ _id: id });

    if (userData) {
     return res.render("edit", { user: userData });
    } else {
      re.redirect("/home");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    //console.log(req.body);
      const userData = await User.findByIdAndUpdate(
        { _id: req.body.user_id },
        {
          $set: {
            name: req.body.name,
            Email: req.body.email,
            mobile: req.body.mobile,
          },
        }
      );
  if(userData){
  //  console.log(userData);
    res.redirect("/home");
  }
  
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadRegister,
  insertUser,
  loginload,
  verifyLogin,
  loadHome,
  userLogout,
  editLoad,
  updateProfile,
};
