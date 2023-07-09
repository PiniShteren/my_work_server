require('dotenv').config()
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
require("./B2Bucket/bucket");
// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Setup express session
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true
}));
// Import routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login/login');
const signRouter = require('./routes/login/sign_up');

const getUserBySession = require("./routes/user/getUserBySession");

const assignRoleToUser = require("./routes/departemnts/assignRoleToUser");
const getAllUsers = require("./routes/users/getAllUsers");
const addOrEditUser = require("./routes/users/addOrEditUser");

const getRolesList = require("./routes/departemnts/getRolesList");
const getDepartmentList = require("./routes/departemnts/getDepartmentList");
const getSubDepartmentList = require("./routes/departemnts/getSubDepartmentList");

const addOrEditRole = require("./routes/departemnts/addOrEditRole");
const addOrEditDepartment = require("./routes/departemnts/addOrEditDepratment");
const addOrEditSubDepartment = require("./routes/departemnts/addOrEditSubDepartments");

// Setup routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/sign_up', signRouter);

app.use("/getAllUsers", getAllUsers);
app.use("/addOrEditUser", addOrEditUser);
app.use("/getUserBySesstion", getUserBySession);


app.use("/addOrEditRole", addOrEditRole);
app.use("/addOrEditDepartment", addOrEditDepartment);
app.use("/addOrEditSubDepartment", addOrEditSubDepartment);

app.use("/getRolesList", getRolesList);
app.use("/getDepartmentList", getDepartmentList);
app.use("/getSubDepartmentList", getSubDepartmentList);

app.use("/assignRoleToUser", assignRoleToUser);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
