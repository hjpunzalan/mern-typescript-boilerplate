"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var crypto_1 = __importDefault(require("crypto"));
var validator_1 = __importDefault(require("validator"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
// import generator from 'generator'
// use save to run validators again because find and update wont
var userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "User must have a first name"]
    },
    lastName: {
        type: String,
        required: [true, "User must have a last name"]
    },
    email: {
        type: String,
        required: [true, "User must have an email"],
        unique: true,
        lowercase: true,
        validator: [validator_1.default.isEmail, "Must be a valid email address"]
    },
    photo: String,
    password: {
        type: String,
        select: false,
        minlength: 6,
        required: [true, "User must have a password"]
        // default: generator.generate({
        // 	length: 6,
        // 	numbers: true
        // })
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    lastEdited: Date,
    passwordChangedAt: {
        type: Date,
        select: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date
});
// Middleware
userSchema.pre(/^find/, function (next) {
    // 'this' points to the current query before executing the event /^find/
    if (this instanceof mongoose_1.default.Query)
        this.find({ active: { $ne: false } }).select("-__v");
    next();
});
// update changedPasswordAt when resetting password
// Skips if password is NOT modified or NEW.
userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew)
        return next();
    this.passwordChangedAt = Date.now() - 1000; // subtracting 1 second takes into account delay in saving into database so that its before the token is generated
    next();
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var saltRounds, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Only run this function if password was actually modified
                    // Changing password or password creation eg. new password
                    if (!this.isModified("password"))
                        return [2 /*return*/, next()];
                    saltRounds = 12;
                    _a = this;
                    return [4 /*yield*/, bcryptjs_1.default.hash(this.password, saltRounds)];
                case 1:
                    _a.password = _b.sent();
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
userSchema.methods.checkPassword = function (password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcryptjs_1.default.compare(password, hashedPassword)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
userSchema.methods.changedPasswordAfter = function (timestamp) {
    //Assuming timestamp is given in seconds
    if (this.passwordChangedAt) {
        //getTime() is a Date function
        var changedTimeStamp = parseInt(this.passwordChangedAt.getTime(), 10) / 1000;
        return changedTimeStamp > timestamp;
    }
    return false;
};
userSchema.methods.createPasswordResetToken = function () {
    var resetToken = crypto_1.default.randomBytes(32).toString("hex");
    // crypto module that doesn't require much processor
    // Only use bcrypt for passwords
    this.passwordResetToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken; // returns unhashed token
};
var Users = mongoose_1.default.model("Users", userSchema);
module.exports = Users;
